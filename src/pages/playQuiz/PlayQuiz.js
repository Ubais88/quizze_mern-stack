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
  const { authorizationToken, BASE_URL } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLimit, setTimeLimit] = useState();
  const [quizType, setQuizType] = useState();
  const [timeRemaining, setTimeRemaining] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [finalSubmit, setFinalSubmit] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [lastSelectedOption, setLastSelectedOption] = useState();


  const fetchAnalysisData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/quiz/play/${id}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      console.log("play quiz response: ", response);

      if (response.status === 200) {
        // Successful fetch play quiz data
        setQuestions(response.data.savedQuiz.questions);
        setTimeLimit(response.data.savedQuiz.timeLimit);
        setQuizType(response.data.savedQuiz.quizType);
        setLoading(false);
      } else {
        // Failed play quiz
        const message = response.data.message;
        toast.error(message);
        console.log("Invalid credential");
      }
    } catch (error) {
      // Log any errors
      console.error("stats  error:", error);
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchAnalysisData();
  }, []);


  const handleOptionClick = (index) => {
    // Update selected option immediately when an option is clicked
    setSelectedOption(index);
    setLastSelectedOption(index);

    // Check if the selected option is correct immediately
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion && currentQuestion.options[index]) {
      const isCorrect = currentQuestion.options[index].correct;
      if (isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setIncorrectAnswers(incorrectAnswers + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    // Check correctness of the last selected option before moving to the next question
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion && lastSelectedOption !== undefined) {
      const isCorrect = currentQuestion.options[lastSelectedOption].correct;
      if (isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setIncorrectAnswers(incorrectAnswers + 1);
      }
    }

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeRemaining(timeLimit);
      // Reset selected option to undefined for the new question
      setSelectedOption(undefined);
      setLastSelectedOption(undefined);
    } else {
      setFinalSubmit(true);
    }
  };
  

  useEffect(() => {
    setTimeRemaining(timeLimit);
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining === 1) {
          handleNextQuestion();
          clearInterval(intervalId);
          console.log("clear interval");
        }
        return prevTimeRemaining - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLimit, currentQuestionIndex]);

  return (
    <div className={styles.playQuizContainer}>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className={styles.playQuizModal}>
          <div className={styles.quizHeader}>
            <p className={styles.quizProgress}>{`${currentQuestionIndex + 1}/${
              questions.length
            }`}</p>
            {timeLimit > 0 && (
              <p className={styles.quizTimer}>{`00:${timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}s`}</p>
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
                    src={option.imageUrl}
                    alt="Option Image"
                    className={styles.optionImage}
                  />
                ) : (
                  <div className={styles.textImageoption}>
                    <p className={styles.optionImageText}>{option.optionText}</p>
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

          <button className={styles.nextButton} onClick={handleNextQuestion}>
            {currentQuestionIndex + 1 === questions.length ? "Submit" : "NEXT"}
          </button>
          {finalSubmit && (
            <Congrats
              quizType={quizType}
              totalQuestions={questions.length}
              correctAnswers={correctAnswers}
              incorrectAnswers={incorrectAnswers}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PlayQuiz;
