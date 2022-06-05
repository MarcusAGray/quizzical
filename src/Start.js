import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Start({setTrivia, quizOn, setQuizOn, sessionToken}) {

  const [isLoading, setIsLoading] = useState(false)

  const [amount, setAmount] = useState(10)
  const [categoryId, setCategoryId] = useState(null)
  const [difficulty, setDifficulty] = useState('all')
  const [topicDisplay, setTopicDisplay] = useState('All Topics')

  let url = setUpURL()


  function setUpURL() {
    if(categoryId == null && difficulty == 'all') {
      return `https://opentdb.com/api.php?amount=${amount}&url3986&token=${sessionToken}`
    }
    if(categoryId == null) {
      return `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&url3986&token=${sessionToken}`
    }
    if(difficulty == 'all') {
      return `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&url3986&token=${sessionToken}`

    }
    return `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${categoryId}&url3986&token=${sessionToken}`
  }

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
      let QAnswers = [...questionObj.incorrect_answers]
      QAnswers.push(questionObj.correct_answer)
      QAnswers.sort(() => Math.random() - 0.5);
      questionObj.QAnswers = QAnswers
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

function giveIds(trivia){
  let updatedTrivia = [...trivia]
  updatedTrivia.forEach((questionObj, index) => {
    questionObj.id = `q${index}`
  })
  return updatedTrivia
}

function checkError(res) {
  if (res.response_code != 0 ) {
    return res.json();
  } else {
    throw Error("API Call Error")
  }
}

//Add function to index questions

  useEffect(() => {
    if(!quizOn) return
    setIsLoading(true)
    fetch(url)
    // .then(response => response.json())
    .then(res => checkError(res))
    .then(res => {
      const resultsArr = res.results
      let decodedTrivia = decodeTriviaUrl(resultsArr)
      let updatedTrivia = processTriviaAnswers(decodedTrivia)
      let idTrivia = giveIds(updatedTrivia)
      const triviaArray = convertToArraysofArraysOf(5, idTrivia)
      setTrivia(triviaArray)
    })
    .then(() => {
      navigate("/quiz")
      setIsLoading(false)
    }).catch(error => { })
  }, [quizOn])

  if(isLoading) return <p className='loading'>Loading...</p>

  const categoryIds = {
    'History' : '23',
    'Geography' : '22',
    'General Knowledge' : '9',
    'Entertainment: Film' : '11',
    'Entertainment: Music' : '12',
    'Science & Nature' : '17'
  }

  function handleChange(event) {
    setDifficulty(event.target.value)
  }

  function handleCategoryClick(topic) {
    
    if (topic == null) {
      setCategoryId(null)
      setTopicDisplay("All topics")
      return
    }
    setCategoryId(categoryIds[topic])
    if(topic == "Entertainment: Film") topic = "Film"
    if(topic == "Entertainment: Music") topic = "Music"
    setTopicDisplay(topic)
  }

  return (
    <div className="start-container">
      <div className="title-container">
        <h1>Quizzical</h1>
        <p>A Trivia Playing Game</p>
      </div>

      <div className="choose-topic-container">
        <h3>Choose Topic</h3>
        <h2 id="topic-display">{topicDisplay}</h2>

        <div className="select-topics">
          <button onClick={() => handleCategoryClick(null)}>All Topics</button>
          <button onClick={() => handleCategoryClick('History')}>History</button>
          <button onClick={() => handleCategoryClick('Geography')}>Geography</button>
          <button onClick={() => handleCategoryClick('General Knowledge')}>General Knowledge</button>
          <button onClick={() => handleCategoryClick('Entertainment: Film')}>Film</button>
          <button onClick={() => handleCategoryClick('Entertainment: Music')}>Music</button>
          <button onClick={() => handleCategoryClick('Science & Nature')}>Science & Nature</button>
        </div>
      </div>

      <div className="choose-difficulty-container">
        <h3>Choose Difficulty</h3>
        <div className="custom-select">
          <select className="select" value={difficulty} onChange={handleChange}>  
              <option className="opt" value="all">Mixed Difficulties</option>    
              <option className="opt" value="easy">Easy</option>
              <option className="opt" value="medium">Medium</option>
              <option className="opt" value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="start-btn-container">
        <button onClick={startQuiz} id="start-btn">Start Quiz</button>
      </div>
    </div>
  )
}

export default Start;