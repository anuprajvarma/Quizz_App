import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Quizz.css";

const Quizz = () => {
  const [question, setquestion] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [CurrectAnswer, setCurrentAnswer] = useState();
  const [IncurrectAnswer, setIncurrentAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    axios.get(`https://opentdb.com/api.php?amount=10`).then(function (res) {
      setquestion(res.data.results[currentQuestion].question);
      setCurrentAnswer(res.data.results[currentQuestion].correct_answer);
      setIncurrentAnswer(res.data.results[currentQuestion].incorrect_answers);
      setOptions(
        res.data.results &&
          handleShuffle([
            res.data.results[currentQuestion]?.correct_answer,
            ...res.data.results[currentQuestion]?.incorrect_answers,
          ])
      );
    });
  }, [currentQuestion]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const handlePrevOptions = () => {
    const nextQuestion = currentQuestion - 1;
    if (currentQuestion > 1) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handleAnswer = (element) => {
    if (element == CurrectAnswer) {
      setScore(score + 5);
    } else {
      setScore(score - 1);
    }
    setClicked(true);
  };

  const handleNextOptions = () => {
    setClicked(false);
    const nextQuestion = currentQuestion + 1;
    if (currentQuestion < 10) {
      setCurrentQuestion(nextQuestion);
    } else {
    }
  };

  return (
    <>
      <div className="app">
        <div className="question-section">
          <h5>Score {score}</h5>
          <div className="question-count">
            <span>Question {currentQuestion} of 10</span>
          </div>
          <div className="question-text">{question}</div>
        </div>
        <div className="answer-section">
          {options.map((element, i) => {
            return (
              <button
                key={i}
                onClick={() => handleAnswer(element)}
                disabled={clicked}
              >
                {element}
              </button>
            );
          })}
          <div className="actions">
            <button onClick={handlePrevOptions}>PREV</button>
            <button disabled={!clicked} onClick={handleNextOptions}>
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quizz;
