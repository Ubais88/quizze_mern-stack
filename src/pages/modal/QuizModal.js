import React, { useState } from "react";
import styles from "./QuizModal.module.css";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { HiTrash } from "react-icons/hi";
import toast from "react-hot-toast";
import { useAuth } from "../../store/auth";
import { createQuizData } from "../../utils/quizUtils";
import axios from "axios";
import ShareQuiz from "../sharePage/ShareQuiz";

const QuizModal = () => {
  const { setModalOpen, BASE_URL, authorizationToken,updateQuizId, quizData, quizInfo } =
    useAuth();

  const defaultQuestion = {
    id: 1,
    questionText: "",
    options: [
      { id: 1, optionText: "", imageUrl: "", correct: false },
      { id: 2, optionText: "", imageUrl: "", correct: false },
    ],
  };

  console.log("quizData in modal", quizData);
  const [circleCount, setCircleCount] = useState(
    (quizData && quizData.questions.length) || 1
  );
  console.log("circleCount", circleCount);
  const [selectedTime, setSelectedTime] = useState(
    (quizData && quizData.timeLimit) || 0
  );

  const [selectedCount, setSelectedCount] = useState(0);
  console.log("selectedCount:", selectedCount);
  const [optionType, setOptionType] = useState(
    (quizData && quizData.questions[0].options[0].type) || "text"
  );
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareQuizId, setShareQuizId] = useState("");
  // console.log(quizData.questions)

  const [questions, setQuestions] = useState(
    (quizData && quizData.questions) || [defaultQuestion]
  );

  console.log("qustions: ", questions);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    questions.length > 1 &&
      toast.success("Time Limit updated for all questions", {
        position: "top-right",
      });
  };

  const handleCountClick = (index) => {
    setSelectedCount(index);
    // console.log("selectedOptions[index]", selectedOptions[index]);
    // setSelectedOption(selectedOptions[index]);
  };

  const handleOptionTypeChange = (type) => {
    setOptionType(type);
    questions.length > 1 &&
      toast.success("Option type updated for all questions");
  };

  const handleAddClick = () => {
    if (circleCount < 5) {
      setCircleCount((prevCount) => prevCount + 1);
      setSelectedCount(circleCount);
      // setSelectedOption(selectedOptions[circleCount]);
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          id: circleCount + 1,
          questionText: "",
          options: [
            { id: 1, optionText: "", imageUrl: "", correct: false },
            { id: 2, optionText: "", imageUrl: "", correct: false },
          ],
        },
      ]);
    }
  };

  const handleCrossClick = (index) => {
    if (circleCount > 1) {
      setCircleCount((prevCount) => prevCount - 1);
      setSelectedCount(0);

      setQuestions((prevQuestions) =>
        prevQuestions
          .filter((question) => question.id !== index + 1)
          .map((question, newIndex) => ({ ...question, id: newIndex + 1 }))
      );

      // Update selectedOptions to remove the entry for the removed question
      //   setSelectedOptions((prevSelectedOptions) => {
      //     const updatedOptions = [...prevSelectedOptions];
      //     updatedOptions.splice(index, 1);
      //     return updatedOptions;
      //   });
    }
  };

  const handleQuestionTextChange = (index, text) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === index + 1
          ? { ...question, questionText: text }
          : question
      )
    );
  };

  const handleOptionTextChange = (
    questionIndex,
    optionIndex,
    text,
    isImageUrl = false
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, qIndex) =>
        qIndex === questionIndex
          ? {
              ...question,
              options: question.options.map((option, oIndex) =>
                oIndex === optionIndex
                  ? {
                      ...option,
                      [isImageUrl ? "imageUrl" : "optionText"]: text,
                    }
                  : option
              ),
            }
          : question
      )
    );
  };

  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    // setSelectedOption(optionIndex);
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, qIndex) =>
        qIndex === questionIndex
          ? {
              ...question,
              options: question.options.map((option, oIndex) =>
                oIndex === optionIndex
                  ? { ...option, correct: true }
                  : { ...option, correct: false }
              ),
            }
          : question
      )
    );
    // // Update selectedOptions with the correct option index
    // setSelectedOptions((prevSelectedOptions) => {
    //   const updatedOptions = [...prevSelectedOptions];
    //   updatedOptions[questionIndex] = optionIndex;
    //   return updatedOptions;
    // });
  };

  const handleAddOption = (e, questionIndex) => {
    e.preventDefault();
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, qIndex) =>
        qIndex === questionIndex
          ? {
              ...question,
              options: [
                ...question.options,
                {
                  id: question.options.length + 1,
                  optionText: "",
                  imageUrl: optionType === "Text & ImageURL" ? "" : undefined,
                  correct: false,
                },
              ],
            }
          : question
      )
    );
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, qIndex) =>
        qIndex === questionIndex
          ? {
              ...question,
              options: question.options
                .filter((option) => option.id !== optionIndex + 1)
                .map((option, newOptionIndex) => ({
                  ...option,
                  id: newOptionIndex + 1,
                })),
            }
          : question
      )
    );
  };

  const handleCreateQuiz = async () => {
    // Prepare the final quiz data
    const quizData = createQuizData(
      quizInfo,
      selectedTime,
      questions,
      optionType
    );
    if (quizData) {
      console.log("quizData", quizData);
      try {
        const method = updateQuizId ? "PUT" :"POST"; 
        // Construct the URL based on the method and pathPrefix
        const url = `${BASE_URL}/quiz/${
          method === "PUT" ? `updatequiz/${updateQuizId}` : "/create"
        }`;

        const response = await axios({
          method: method,
          url: url,
          data: quizData,
          headers: {
            Authorization: authorizationToken,
          },
        });

        // const response = await axios.post(`${BASE_URL}/quiz/create`, quizData, {
        //   headers: {
        //     Authorization: authorizationToken,
        //   },
        // });
        console.log("response.data", response.data)
        if (response.status === 201 || response.status === 200) {
          const quizId = response.data.quizId;
          setShareQuizId(quizId);
          setShareModalOpen(true);
          toast.success(`Quiz ${updateQuizId ? "Updated" : "created"} successfully`);
        } else {
          const message = response.data.message;
          toast.error(message);
          console.log("Failed to create quiz");
        }
      } catch (error) {
        // Log any errors
        console.error("Create quiz error:", error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
    return;
  };

  return (
    <div className={styles.quizModalContainer}>
      {!shareModalOpen ? (
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
              value={questions[selectedCount]?.questionText || ""}
              onChange={(e) =>
                handleQuestionTextChange(selectedCount, e.target.value)
              }
            />
          </div>

          <div className={styles.optionType}>
            <p className={styles.optionTypePara}>Option Type </p>
            {["text", "imageURL", "Text & ImageURL"].map((type) => (
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
            <form className={styles.optionsContainer}>
              {questions[selectedCount]?.options.map((option, optionIndex) => (
                <div key={option.id} className={styles.optionContainer}>
                  {quizInfo.quizType !== "Poll" && (
                    <input
                      type="radio"
                      name={`option_${selectedCount}`}
                      className={styles.optionRadio}
                      checked={option.correct}
                      onChange={() =>
                        handleCorrectOptionChange(selectedCount, optionIndex)
                      }
                    />
                  )}

                  <input
                    type="text"
                    placeholder={optionType.split(" ")[0]}
                    className={`${styles.optionText} ${
                      option.correct && styles.selectedOption
                    }`}
                    value={option.optionText}
                    onChange={(e) =>
                      handleOptionTextChange(
                        selectedCount,
                        optionIndex,
                        e.target.value,
                        false
                      )
                    }
                  />
                  {optionType === "Text & ImageURL" && (
                    <input
                      type="text"
                      placeholder={optionType.split(" ")[2]}
                      className={`${styles.optionText} ${
                        option.correct && styles.selectedOption
                      }`}
                      value={option.imageUrl}
                      onChange={(e) =>
                        handleOptionTextChange(
                          selectedCount,
                          optionIndex,
                          e.target.value,
                          true
                        )
                      }
                    />
                  )}
                  {option.id > 2 && (
                    <HiTrash
                      color="#D60000"
                      className={styles.trash}
                      onClick={() =>
                        handleRemoveOption(selectedCount, optionIndex)
                      }
                    />
                  )}
                </div>
              ))}
              {questions[selectedCount]?.options.length < 4 && (
                <div className={styles.optionContainer}>
                  <button
                    className={styles.addOption}
                    onClick={(e) => handleAddOption(e, selectedCount)}
                  >
                    Add option
                  </button>
                </div>
              )}
            </form>
            {quizInfo.quizType !== "Poll" && (
              <div className={styles.timerContainer}>
                <p className={styles.timerText}>Timer</p>
                {[0, 5, 10].map((time) => (
                  <div
                    key={time}
                    className={`${styles.time} ${
                      selectedTime === time && styles.selectedTime
                    }`}
                    onClick={() => handleTimeClick(time)}
                  >
                    {time === 0 ? "OFF" : `${time} sec`}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.cancelButton}
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className={styles.createQuizButton}
              onClick={handleCreateQuiz}
            >
              {updateQuizId ? "Update" : "create"} Quiz
            </button>
          </div>
        </div>
      ) : (
        <ShareQuiz
          setShareModalOpen={setShareModalOpen}
          shareQuizId={shareQuizId}
        />
      )}
    </div>
  );
};

export default QuizModal;
