import React, { useEffect, useState } from "react";
import styles from "./PlayQuiz.module.css";
import Congrats from "../../components/congrat/Congrats";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";

const PlayQuiz = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { BASE_URL } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLimit, setTimeLimit] = useState();
  const [quizType, setQuizType] = useState();
  const [timeRemaining, setTimeRemaining] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [finalSubmit, setFinalSubmit] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [userResponses, setUserResponses] = useState([]);
  const fetchAnalysisData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/quiz/play/${id}`);

      if (response.status === 200) {
        setQuestions(response.data.savedQuiz.questions);
        setTimeLimit(response.data.savedQuiz.timeLimit);
        setQuizType(response.data.savedQuiz.quizType);
        setLoading(false);
      } else {
        const message = response.data.message;
        toast.error(message);
      }
    } catch (error) {
      console.error("stats  error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  const handleOptionClick = (index) => {
    const questionId = questions[currentQuestionIndex].id;

    //  already responded to the current question
    const existingResponseIndex = userResponses.findIndex(
      (response) => response.questionId === questionId
    );

    if (existingResponseIndex !== -1) {
      //  already responded, update the selected option
      setUserResponses((prevResponses) => {
        const updatedResponses = [...prevResponses];
        updatedResponses[existingResponseIndex] = {
          questionId,
          selectedOption: index,
        };
        return updatedResponses;
      });
    } else {
      // responding for the first time, store the response
      setUserResponses((prevResponses) => [
        ...prevResponses,
        { questionId, selectedOption: index },
      ]);
    }

    // Update the selected option
    setSelectedOption(index);
  };

  console.log("userResponse:", userResponses);

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 === questions.length) {
      handlefinalSubmit();
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(undefined);
    }
  };

  const handlefinalSubmit = async () => {
    setTimeLimit(0)
    try {
      const response = await axios.post(`${BASE_URL}/quiz/result`, {
        quizId: id,
        userResponses,
        quizType,
      });

      if (response.status === 200) {
        // Successful submission
        const { score, totalQuestions } = response.data;
        setTotalQuestions(totalQuestions);
        setCorrectAnswers(score);
        setFinalSubmit(true);
      } else {
        // Handle unsuccessful submission
        const message = response.data.message;
        toast.error(message);
      }
    } catch (error) {
      console.error("Error submitting responses:", error);
      toast.error("Failed to submit responses. Please try again.");
    }
  };

  useEffect(() => {
    setTimeRemaining(timeLimit);
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining === 1) {
          handleNextQuestion();
          clearInterval(intervalId);
        }
        return prevTimeRemaining - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLimit, currentQuestionIndex]);

  return (
    <div className={styles.playQuizContainer}>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className={styles.playQuizModal}>
          <div className={styles.quizHeader}>
            <p className={styles.quizProgress}>{`${currentQuestionIndex + 1}/${
              questions.length
            }`}</p>
            {timeLimit > 0 && (
              <p className={styles.quizTimer}>{`00:${
                timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining
              }s`}</p>
            )}
          </div>

          <div className={styles.questionTextContainer}>
            <p className={styles.questionText}>
              {questions[currentQuestionIndex].questionText}
            </p>
          </div>
          <div className={styles.optionsContainer}>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${
                  selectedOption === index && styles.selectedOption
                }`}
                onClick={() => handleOptionClick(index)}
              >
                {option.type === "text" ? (
                  <div className={styles.optionTextContainer}>
                    <p className={styles.optionText}>{option.optionText}</p>
                  </div>
                ) : option.type === "imageurl" ? (
                  <img
                    src={option.optionText}
                    alt="Option Image"
                    className={styles.optionImage}
                  />
                ) : (
                  <div className={styles.textImageoption}>
                    <p className={styles.optionImageText}>
                      {option.optionText}
                    </p>
                    <img
                      src={option.imageUrl}
                      alt="Option Image"
                      className={styles.optionTextImage}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            className={styles.nextButton}
            onClick={
              currentQuestionIndex + 1 === questions.length
                ? handlefinalSubmit 
                : handleNextQuestion
            }
          >
            {currentQuestionIndex + 1 === questions.length ? "Submit" : "NEXT"}
          </button>
          {finalSubmit && (
            <Congrats
              quizType={quizType}
              totalQuestions={totalQuestions}
              correctAnswers={correctAnswers}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PlayQuiz;
