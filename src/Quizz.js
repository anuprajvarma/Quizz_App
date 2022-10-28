import React, { useEffect, useState } from "react";
import { Actions } from "./components/Actions";
import { QuestionSection } from "./components/QuestionSection";
import "./Quizz.css";

const Quizz = () => {
  const [question, setquestion] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [CurrectAnswer, setCurrentAnswer] = useState();
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [clicked, setClicked] = useState(false);

  const fetchdata = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setquestion(data.results[currentQuestion].question);
      setCurrentAnswer(data.results[currentQuestion].correct_answer);
      setOptions(
        data.results &&
          handleShuffle([
            data.results[currentQuestion]?.correct_answer,
            ...data.results[currentQuestion]?.incorrect_answers,
          ])
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata(`https://opentdb.com/api.php?amount=10`);
  }, [currentQuestion]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

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
    <>
      <div className="app">
        <QuestionSection
          score={score}
          currentQuestion={currentQuestion}
          question={question}
        />
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
      </div>
    </>
  );
};

export default Quizz;
