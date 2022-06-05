import React, { useState } from "react"
import Question from "./Question"


function Page({pageQuestions, pageNumber, quizOn, allAnswersData, setAllAnswersData}) {


  return (
    <div className="page">
      {pageQuestions.map((triviaQ, index) => {
        let id = `q${index + (pageNumber * 5)}`
        return  <Question 
        key={id}
        questionId={id}
        quizOn={quizOn}
        pageNumber={pageNumber}
        question={triviaQ.question}
        correctAnswer={triviaQ.correct_answer}
        QAnswers={triviaQ.QAnswers}
        allAnswersData={allAnswersData}
        setAllAnswersData={setAllAnswersData}
        />
      })
    }


      <h4 className="page-number">Page {pageNumber + 1}</h4>
    </div>
  )
}

export default Page