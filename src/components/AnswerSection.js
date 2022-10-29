import React, { useContext, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Actions } from "./Actions";
import dataContext from "../contexts/dataContex";

export const AnswerSection = () => {
  const { options, CurrectAnswer, score, setScore, clicked, setClicked } =
    useContext(dataContext);

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
      {CurrectAnswer ? (
        <div className="option-section">
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
        </div>
      ) : (
        <div style={{ width: 60, height: 60, marginLeft: 50 }}>
          <CircularProgressbar />
        </div>
      )}
      <Actions />
    </div>
  );
};
