import React from "react";
import { Actions } from "./Actions";

export const AnswerSection = ({
  options,
  currentQuestion,
  clicked,
  CurrectAnswer,
  score,
  setCurrentQuestion,
  setClicked,
  setScore,
}) => {
  const handleSelect = (i) => {
    if (clicked === i && clicked === CurrectAnswer) return "correct";
    else if (clicked === i && clicked !== CurrectAnswer) return "Incorrect";
    else if (i === CurrectAnswer) return "correct";
  };

  const handleAnswer = (element) => {
    if (element === CurrectAnswer) {
      setScore(score + 5);
    } else {
      setScore(score - 1);
    }
    setClicked(true);
  };

  return (
    <div className="answer-section">
      {options.map((i) => {
        return (
          <button
            key={i}
            className={`button ${clicked && handleSelect(i)}`}
            onClick={() => handleAnswer(i)}
            disabled={clicked}
          >
            {i}
          </button>
        );
      })}
      <Actions
        setCurrentQuestion={setCurrentQuestion}
        setClicked={setClicked}
        currentQuestion={currentQuestion}
        clicked={clicked}
      />
    </div>
  );
};
