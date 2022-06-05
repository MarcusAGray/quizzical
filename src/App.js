import './App.css';
import Start from './Start'
import Quiz from './Quiz'
import React, { useState, useEffect } from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [trivia, setTrivia] = useState([])
  const [quizOn, setQuizOn] = useState(false)
  const [sessionToken, setSessionToken] = useState(null)


  //get session token to avoid repeated question
  useEffect(() => {
    fetch("https://opentdb.com/api_token.php?command=request")
    .then(res => res.json())
    .then(res => {
      setSessionToken(res.token)
    })
  }, [])

  return(

    <Router>
      <div className='container'>
          <Routes>
            <Route path="/" element={<Start setTrivia={setTrivia} 
                                            quizOn={quizOn}
                                            setQuizOn={setQuizOn}
                                            sessionToken={sessionToken}
                                            />} 
            />
            <Route path="/quiz" element={<Quiz 
                                              trivia={trivia}
                                              quizOn={quizOn}
                                              setQuizOn={setQuizOn}
                                        />} 
            />
            {/* <Route path="/results" element={<Results/>} /> */}

          </Routes>
      </div>
    </Router>
  )
}

export default App;
