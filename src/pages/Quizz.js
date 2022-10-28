import React, { useEffect, useState } from "react";
import { AnswerSection } from "../components/AnswerSection";
import { QuestionSection } from "../components/QuestionSection";
import "../style/Quizz.css";

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

  return (
    <>
      <div className="app">
        <QuestionSection
          score={score}
          currentQuestion={currentQuestion}
          question={question}
        />
        <AnswerSection
          options={options}
          setCurrentQuestion={setCurrentQuestion}
          setScore={setScore}
          setClicked={setClicked}
          currentQuestion={currentQuestion}
          score={score}
          CurrectAnswer={CurrectAnswer}
          clicked={clicked}
        />
      </div>
    </>
  );
};

export default Quizz;
