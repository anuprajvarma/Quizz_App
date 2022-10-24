import React from "react";
import "./Quizz.css";

const Quizz = () => {
  return (
    <>
      <div className="app">
        <div className="question-section">
          <h5>Score 5</h5>
          <div className="question-count">
            <span>Question 1 of 10</span>
          </div>
          <div className="question-text">aslkdflasfljas</div>
        </div>
        <div className="answer-section">
          <div className="actions">
            <button>PREV</button>
            <button>NEXT</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quizz;
