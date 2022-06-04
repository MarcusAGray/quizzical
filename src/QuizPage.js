import React from "react"

function QuizPage(props) {
  return (
    <div>
      <h5>Quiz Page</h5>
      <p>{props.questionSet}</p>
    </div>
  )
}

export default QuizPage;