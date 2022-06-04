import './App.css';
import Start from './Start'
import Quiz from './Quiz'
import Results from './Results'
import React, { useState } from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [trivia, setTrivia] = useState([])
  const [quizOn, setQuizOn] = useState(false)
  const [numOfQs, setNumOfQs] = useState(10)


  // function upDateTrivia(triviaQ) {
  //   let upDatedTrivia = trivia
  //   trivia.forEach(group => {
  //     group.forEach(questionObj => {
  //       let answers = [...questionObj.incorrect_answers]
  //       answers.push(questionObj.correct_answer)
  //       answers.sort(() => Math.random() - 0.5);
  //       questionObj.answers = answers
  //     })
  //   })
  //   setTrivia(questionObj)
    
  // }

  return(

    <Router>
      <div className='container'>
          <Routes>
            <Route path="/" element={<Start setTrivia={setTrivia} 
                                            quizOn={quizOn}
                                            setQuizOn={setQuizOn}
                                            numOfQs={numOfQs}
                                            />} 
            />
            <Route path="/quiz" element={<Quiz trivia={trivia}
                                              quizOn={quizOn}
                                              setQuizOn={setQuizOn}
                                              numOfQs={numOfQs}
                                        />} 
            />
            <Route path="/results" element={<Results/>} />

          </Routes>
      </div>
    </Router>
  )
}

export default App;
