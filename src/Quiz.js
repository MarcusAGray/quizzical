import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Page from "./Page"
import "./Quiz.css"

function Quiz({trivia, quizOn, setQuizOn}) {


  const [allAnswersData, setAllAnswersData] = useState(setUpAllAnswersData())
  
  const [pageNumber, setPageNumber] = useState(0)

  let navigate = useNavigate()

  function setUpAllAnswersData() {
    let triviaFlat = trivia.flat()
    let data = triviaFlat.map((ques, index) => {
      let ans = {
              id: ques.id, 
              qNum: index,
              correctAnswer: ques.correct_answer,
              selectedAnswer: null,
              selAnsIdx: null
              }
      return ans
    })

    return data
  }


  function calcScore() {
    let score = 0
    allAnswersData.forEach(obj => {
      if(obj.correctAnswer == obj.selectedAnswer) score +=1
    })
    return `${score}/${trivia.flat().length}`

  }

  function endQuiz() {
    setQuizOn(false)
  }

  function prev() {
    if(pageNumber == 0) return
    setPageNumber(pageNumber - 1)
    window.scrollTo(0, 0);
  }

  function next() {
    if(pageNumber == (pages.length - 1)) return
    setPageNumber(pageNumber + 1)
    window.scrollTo(0, 0);
  }

  const pages = trivia.map((page, index) => {
                    let id = `p${index}`
                    return (
                      <Page 
                        key={id}
                        pageQuestions={page}
                        pageNumber={pageNumber}
                        quizOn={quizOn}
                        allAnswersData={allAnswersData}
                        setAllAnswersData={setAllAnswersData}
                      />
                    )
  })

  function newQuiz() {
    navigate("/")
  }
                  

  return (
    <div className="quiz-container">
      {pages[pageNumber]}
      <div className='page-nav'>
        <button onClick={prev} className="nav-btn">Prev</button>
        {quizOn && <button onClick={endQuiz} className="check-ans-btn">Check Answers</button>}
        {!quizOn && <div class="end-game">
          <p className="score">You scored {calcScore()} correct answers</p>
          <button onClick={newQuiz} className="play-again-btn">Play again</button>
        </div>}
        <button onClick={next} className="nav-btn">Next</button>
      </div>
    </div>
  )
}

export default Quiz;