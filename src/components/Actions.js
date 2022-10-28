import React from "react";

export const Actions = ({
  setCurrentQuestion,
  currentQuestion,
  setClicked,
  clicked,
}) => {
  const handlePrevOptions = () => {
    const nextQuestion = currentQuestion - 1;
    if (currentQuestion > 1) {
      setCurrentQuestion(nextQuestion);
    }
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
      <button onClick={handlePrevOptions}>PREV</button>
      <button disabled={!clicked} onClick={handleNextOptions}>
        NEXT
      </button>
    </div>
  );
};
