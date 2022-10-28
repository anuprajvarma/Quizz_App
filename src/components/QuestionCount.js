import React from "react";

const QuestionCount = (props) => {
  return (
    <div className="question-count">
      <span>Question {props.currentQuestion} of 10</span>
    </div>
  );
};

export default QuestionCount;
