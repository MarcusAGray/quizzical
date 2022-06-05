import React, { useEffect, useState } from "react"
import Answer from './Answer'

function Question({questionId, quizOn, question, pageNumber, correctAnswer, QAnswers, allAnswersData, setAllAnswersData}) {


  function updateData(index, ans) {
    if(!quizOn) return
    const data = [...allAnswersData]
    const questionObj = data.find(obj => obj.id == questionId)
    questionObj.selAnsIdx = index
    questionObj.selectedAnswer = ans
    setAllAnswersData(data)
  }


  function getAnswerObject() {
    let a = allAnswersData.find(ans => ans.id == questionId)
    return a
  }

 
  function evaluateAns() {
    let answerObj = getAnswerObject()
    let correctAnswer = answerObj.correctAnswer
    let selectedAnswer = QAnswers[answerObj.selAnsIdx]
    if(selectedAnswer == null) return 'No answer selected'
    if(correctAnswer == selectedAnswer) return 'Correct'
    return 'Incorrect'
  }


 

  const answersArr = QAnswers.map((ans, index) => {
    let ans_id = `a${index + (pageNumber * 5)}`
    return (
        <Answer 
          key={ans_id}
          id={ans_id}
          quizOn={quizOn}
          answer={ans}
          action={updateData}
          allAnswersData={allAnswersData}
          setAllAnswersData={setAllAnswersData}
          questionId={questionId}
          index={index}
        />
    )
})

  return (
    <div className="question-container">
      <div className="ques-and-num-container">
        <p className="question-number">Q{(getAnswerObject().qNum) + 1}.</p>
        <p className="question"> {question}</p>
      </div>
      <ul className="answer-list">
        {answersArr}
      </ul>
      <p className="evaluation">{quizOn ? <br/> : evaluateAns()}</p>
      <hr className="line"/>
    </div>
  )
}

export default Question