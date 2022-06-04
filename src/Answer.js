import React, { useState } from "react"

function Answer({id, answer, action, style}) {

  return (
    <div>
      <li>
        <button 
          onClick={action}
          className={style}>
          {answer}
        </button>
      </li>
    </div>
  )
}

export default Answer