import React, { useContext } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
      {question ? (
        <Questions question={question} />
      ) : (
        <div style={{ width: 60, height: 60, marginLeft: 50 }}>
          <CircularProgressbar />
        </div>
      )}
    </div>
  );
};
