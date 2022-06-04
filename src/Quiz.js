import React, { useEffect, useState } from "react"
import Question from "./Question"
import { Link } from "react-router-dom";

function Quiz({trivia, quizOn, setQuizOn, numOfQs}) {

  const [pageNumber, setPageNumber] = useState(1)
  const [page, setPage] = useState(trivia[pageNumber - 1])

  let ids = []
  const [allAnswers, setAllAnswers] = useState(setUpAllAnswers(ids))

  function setUpAllAnswers(ids) {
    for(let i = 0; i < numOfQs; i++) {
      ids.push(`q${i}`)
    }

    let answers = {}
    for(let i = 0; i < ids.length; i++) {
      answers[ids[i]] = false
      //answers[ids[i]] = {wasCorrect: false, category: trivia... }
    }
    return answers
  }

  function next() {
    console.log("Next clicked")
    console.log(trivia, trivia.length, pageNumber)
    if(pageNumber == (trivia.length)) return
    
    setPage(trivia[pageNumber])
    setPageNumber(pageNumber + 1)
    window.scrollTo(0, 0);
  }

  function prev() {
    if(pageNumber == 1) return
    setPage(trivia[pageNumber - 2])
    setPageNumber(pageNumber - 1)
    window.scrollTo(0, 0);
  }

  function calcScore() {
    const score = Object.values(allAnswers).filter(a => a == true).length
    return `${score}/${numOfQs}`

  }

  return (
    <div>
      <h2>Quiz title</h2>
      {page.map((triviaQ, index) => <Question 
                                    key={ids[index + ((pageNumber-1) * 5)]}
                                    id={ids[index + ((pageNumber-1) * 5)]}
                                    category={triviaQ.category}
                                    question={triviaQ.question}
                                    correctAnswer={triviaQ.correct_answer}
                                    answers={triviaQ.answers}

                                    // activeAns

                                    allAnswers={allAnswers}
                                    setAllAnswers={setAllAnswers}
                                  />)}
      <button onClick={() => console.log(allAnswers)}>DEBUG: Show Answers</button>

      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
      {pageNumber == (trivia.length) && <button onClick={() => setQuizOn(false)}>Finish Quiz</button>}
      {!quizOn && <p>{calcScore()}</p>}
    </div>
  )
}

export default Quiz;