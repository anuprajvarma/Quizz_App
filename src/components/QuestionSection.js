import React from "react";
import Score from "./Score";
import QuestionCount from "./QuestionCount";
import Questions from "./Questions";

export const QuestionSection = ({ score, currentQuestion, question }) => {
  return (
    <div className="question-section">
      <Score score={score} />
      <QuestionCount currentQuestion={currentQuestion} />
      <Questions question={question} />
    </div>
  );
};
