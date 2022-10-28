import React, { useEffect, useState } from "react";
import QuestionCount from "./components/QuestionCount";
import Questions from "./components/Questions";
import { Actions } from "./components/Actions";
import Score from "./components/Score";
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

  const handlePrevOptions = () => {
    const nextQuestion = currentQuestion - 1;
    if (currentQuestion > 1) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handleAnswer = (element) => {
    if (element === CurrectAnswer) {
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
    }
  };

  return (
    <>
      <div className="app">
        <div className="question-section">
          <Score score={score} />
          <QuestionCount currentQuestion={currentQuestion} />
          <Questions question={question} />
        </div>
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
            handlePrevOptions={handlePrevOptions}
            handleNextOptions={handleNextOptions}
            clicked={clicked}
          />
        </div>
      </div>
    </>
  );
};

export default Quizz;
