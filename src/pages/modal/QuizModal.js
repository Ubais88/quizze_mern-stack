import React, { useState } from "react";
import styles from "./QuizModal.module.css";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import TextOptionForm from "../../components/optionText/TextOptionForm";
import toast from "react-hot-toast";

const QuizModal = ({ quizInfo }) => {
  const [circleCount, setCircleCount] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCount, setSelectedCount] = useState(0);
  const [optionType, setOptionType] = useState("Text"); // default to text
  const [questions, setQuestions] = useState([
    { id: 1, text: "", options: [], correctOption: "" },
  ]);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    {
      questions.length > 1 &&
        toast.success("Option Time updated for all questions", {
          position: "top-right",
        });
    }
  };

  const handleCountClick = (index) => {
    setSelectedCount(index);
  };

  const handleOptionTypeChange = (type) => {
    setOptionType(type);
    {
      questions.length > 1 &&
        toast.success("Option type updated for all questions", {
          position: "top-right",
        });
    }
  };

  const handleAddClick = () => {
    if (circleCount < 5) {
      setCircleCount((prevCount) => prevCount + 1);
      setSelectedCount(circleCount);
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        { id: circleCount + 1, text: "", options: [], correctOption: "" },
      ]);
    }
  };
  const handleCrossClick = (index) => {
    setCircleCount((prevCount) => prevCount - 1);
    setSelectedCount((prevCount) => Math.min(index, prevCount));
    setQuestions((prevQuestions) =>
      prevQuestions
        .filter((question) => question.id !== index + 1)
        .map((question, newIndex) => ({ ...question, id: newIndex + 1 }))
    );
  };

  const handleQuestionTextChange = (index, text) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === index + 1 ? { ...question, text } : question
      )
    );
  };

  const handleCreateQuiz = () => {
    console.log("questions", questions);
  };

  return (
    <div className={styles.quizModalContainer}>
      <div className={styles.quizModalContent}>
        <div className={styles.header}>
          <div className={styles.countContainer}>
            {questions.map((question, index) => (
              <div
                key={question.id}
                className={`${styles.count} ${
                  selectedCount === index && styles.selectedCount
                }`}
                onClick={() => handleCountClick(question.id - 1)}
              >
                <p>{question.id}</p>
                {question.id >= 2 && (
                  <RxCross2
                    className={styles.cross}
                    onClick={() => handleCrossClick(question.id - 1)}
                  />
                )}
              </div>
            ))}
            {circleCount < 5 && (
              <IoMdAdd
                size={23}
                className={styles.add}
                onClick={handleAddClick}
              />
            )}
          </div>
          <p className={styles.maxQuestions}>Max 5 questions</p>
        </div>

        <div className={styles.quizNameInput}>
          <input
            type="text"
            placeholder="Poll Question"
            className={styles.quizInput}
            value={questions[selectedCount]?.text || ""}
            onChange={(e) =>
              handleQuestionTextChange(selectedCount, e.target.value)
            }
          />
        </div>

        <div className={styles.optionType}>
          <p className={styles.optionTypePara}>Option Type </p>
          {["Text", "imageURL", "Text & ImageURL"].map((type) => (
            <div key={type} className={styles.radioText}>
              <input
                type="radio"
                name="optionType"
                value={type}
                checked={optionType === type}
                onChange={() => handleOptionTypeChange(type)}
              />
              {type}
            </div>
          ))}
        </div>
        <div className={styles.optionTypeForm}>
          <TextOptionForm
            optionType={optionType}
            questions={questions}
            setQuestions={setQuestions}
            selectedCount={selectedCount}
            formType={quizInfo.quizType}
          />

          {quizInfo.quizType !== "Poll Type" && (
            <div className={styles.timerContainer}>
              <p className={styles.timerText}>Timer</p>
              {[null, 5, 10].map((time) => (
                <div
                  key={time}
                  className={`${styles.time} ${
                    selectedTime === time && styles.selectedTime
                  }`}
                  onClick={() => handleTimeClick(time)}
                >
                  {time === null ? "OFF" : `${time} sec`}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.buttonsContainer}>
          <button className={styles.cancelButton}>Cancel</button>
          <button
            className={styles.createQuizButton}
            onClick={handleCreateQuiz}
          >
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
