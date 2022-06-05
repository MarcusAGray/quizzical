import React, { useState, useEffect } from "react"

function Answer({id, quizOn, index, answer, action, allAnswersData, setAllAnswersData, questionId}) {

  const [style, setStyle] = useState('unselected')

  function handleClick() {
    action(index, answer)
  }

  useEffect(() => {
    styling()
  },[allAnswersData, quizOn])

  function getAnswerObject() {
    return allAnswersData.find(ans => ans.id == questionId)
  }

  function styling() {
    if(quizOn){
      if(getAnswerObject().selAnsIdx == index) {
        setStyle('selected')
      } else {
        setStyle('unselected')
      }
    }
    if(!quizOn) {
      let answerObj = getAnswerObject()
      let correctAnswer = answerObj.correctAnswer
    
      //at quiz ends
      if(correctAnswer == answer) {
        if(correctAnswer == answerObj.selectedAnswer){
          setStyle('correctSelected')
        } else {
          setStyle('correctUnselected')
        }
      }
  
      else if(answerObj.selectedAnswer == answer){
        setStyle('incorrectSelected')
      } else {
        setStyle('unselected')
      }
    }
  }

  return (
    <div>
      <li>
        <button
          onClick={handleClick}
          className={style}
          >
          {answer}
        </button>
      </li>
    </div>
  )
}

export default Answer