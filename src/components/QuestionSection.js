import React, { useContext } from "react";
import Score from "./Score";
import QuestionCount from "./QuestionCount";
import Questions from "./Questions";
import dataContext from "../contexts/dataContex";

export const QuestionSection = () => {
  const { score, currentQuestion, question } = useContext(dataContext);
  return (
    <div className="question-section">
      <Score score={score} />
      <QuestionCount currentQuestion={currentQuestion} />
      <Questions question={question} />
    </div>
  );
};
