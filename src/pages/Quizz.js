import React, { useEffect, useState } from "react";

import "../style/Quizz.css";
import dataContext from "../contexts/dataContex";
import { AnswerSection } from "../components/AnswerSection";
import { QuestionSection } from "../components/QuestionSection";

const Quizz = () => {
  const [question, setquestion] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [CurrectAnswer, setCurrectAnswer] = useState();
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);

  const value = {
    question,
    currentQuestion,
    CurrectAnswer,
    score,
    options,
    setCurrentQuestion,
    setScore,
  };

  const fetchdata = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.results);
      setquestion(data.results[currentQuestion].question);
      setCurrectAnswer(data.results[currentQuestion].correct_answer);
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

  // useEffect(() => {

  // }, [currentQuestion]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <dataContext.Provider value={value}>
      <div className="app">
        <QuestionSection />
        <AnswerSection />
      </div>
    </dataContext.Provider>
  );
};

export default Quizz;
