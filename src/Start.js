import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Start({setTrivia, quizOn, setQuizOn, numOfQs}) {

  const [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate();

  function startQuiz() {
    setQuizOn(true)
  }

  function convertToArraysofArraysOf(subArrSize, arr) {
    if(arr.length == subArrSize) return [arr]
    const newArr = []
    for (let i = 0; i < arr.length; i += subArrSize) {
      newArr.push(arr.slice(i, i + subArrSize));
    }
    return newArr
  }

  function processTriviaAnswers(trivia) {
    let updatedTrivia = [...trivia]
    updatedTrivia.forEach(questionObj => {
      let answers = [...questionObj.incorrect_answers]
      answers.push(questionObj.correct_answer)
      answers.sort(() => Math.random() - 0.5);
      questionObj.answers = answers
    })
  
    return updatedTrivia
    
  }

  function decodeTriviaUrl(trivia) {
    let decodedTrivia = [...trivia]
    let textArea = document.createElement("textarea");

    decodedTrivia.forEach(questionObj => {
      textArea.innerHTML = questionObj.question;
      questionObj.question = textArea.value
      textArea.innerHTML = questionObj.correct_answer;
      questionObj.correct_answer = textArea.value

      let incorrectAnsArr = questionObj.incorrect_answers.map(wrongAnswer =>{
        textArea.innerHTML = wrongAnswer
        return textArea.value
      })
      
      questionObj.incorrect_answers = incorrectAnsArr
    })
    return decodedTrivia
}

  useEffect(() => {
    if(!quizOn) return
    setIsLoading(true)
    fetch(`https://opentdb.com/api.php?amount=${numOfQs}&url3986`)
    .then(response => response.json())
    .then(res => {
      const resultsArr = res.results
      let decodedTrivia = decodeTriviaUrl(resultsArr)
      let updatedTrivia = processTriviaAnswers(decodedTrivia)
      const triviaArray = convertToArraysofArraysOf(5, updatedTrivia)
      console.log("Trivia Array: ", triviaArray)
      setTrivia(triviaArray)
    })
    .then(() => {
      navigate("/quiz")
      setIsLoading(false)
    })
  }, [quizOn])

  if(isLoading) return <p>Loading...</p>


  return (
    <div>
      <p>Start Page</p>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  )
}

export default Start;