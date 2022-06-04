import React, { useState } from "react"
import Answer from "./Answer"


function Question({id, category, question, correctAnswer, answers, allAnswers, setAllAnswers}) {


  // const [activeAnswer, setActiveAnswer] = useState(false)
  const [selectedAnsIndex, setSelectedAnsIndex] = useState(null)

  function handleClick(answerIndex) {
    let newActiveAnswer = answers[answerIndex]
    // setActiveAnswer(newActiveAnswer)
  
    const obj = allAnswers

    obj[id] = (newActiveAnswer == correctAnswer) ? true : false

    setAllAnswers(obj)
    setSelectedAnsIndex(answerIndex)
  }

  return (
    <div>
      <h6>Question Component</h6>
      <p>{question}</p>
      <ul>
        {answers.map((ans, index) => {
            return (
              <Answer 
                key={`a${index}`}
                id={`a${index}`}
                answer={ans}
                action={() => handleClick(index)}
                style={selectedAnsIndex == index ? 'selected' : 'unselected'}
              />
            )
        })}
      </ul>
    </div>
  )
}

export default Question