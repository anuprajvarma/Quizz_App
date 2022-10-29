import React, { useContext } from "react";
import dataContext from "../contexts/dataContex";

export const Actions = () => {
  const {
    setCurrentQuestion,
    setScore,
    score,
    currentQuestion,
    setClicked,
    clicked,
  } = useContext(dataContext);

  const handlePrevOptions = () => {
    setCurrentQuestion(1);
    setClicked(false);
    setScore(0);
  };

  const handleNextOptions = () => {
    setClicked(false);
    const nextQuestion = currentQuestion + 1;
    if (currentQuestion < 10) {
      setCurrentQuestion(nextQuestion);
    }
  };

  return (
    <div className="actions">
      <button onClick={handlePrevOptions}>Restart</button>
      <button disabled={!clicked} onClick={handleNextOptions}>
        NEXT
      </button>
    </div>
  );
};
