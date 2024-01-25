import React, { useState } from "react";
import styles from "./Createquiz.module.css";
import toast from "react-hot-toast";
import QuizModal from "../../pages/modal/QuizModal";
import { useAuth } from "../../store/auth";

const Createquiz = () => {
  const { setModalOpen , createQuiz, setCreateQuiz  ,quizInfo , setQuizInfo } = useAuth();
  const [selectedQuizType, setSelectedQuizType] = useState("");
  // const [quizInfo, setQuizInfo] = useState({
  //   quizName: "",
  //   quizType: "",
  // });
  const [errors, setErrors] = useState({});
  // const [createQuiz, setCreateQuiz] = useState(true);

  const changeHandler = (e) => {
    setErrors({});
    const { value } = e.target;
    setQuizInfo((prevData) => ({
      ...prevData,
      quizName: value,
    }));
  };

  const handleQuizTypeChange = (type) => {
    setErrors({});
    setSelectedQuizType(type);
    setQuizInfo((prevData) => ({
      ...prevData,
      quizType: type,
    }));
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  const isFormValid = () => {
    const newErrors = {};

    if (!quizInfo.quizName) {
      newErrors.title = "Enter Quiz Title";
    }

    if (!quizInfo.quizType) {
      newErrors.type = "Select Quiz Type";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else return true;
  };

  const handleContinueClick = () => {
    if (isFormValid()) {
      toast.success("Valid Quiz");
      setCreateQuiz(false);
    }
  };

  return (
    <div className={styles.modelContainer}>
      {createQuiz ? (
        <div className={`${styles.createQuizContainer}`}>
          <div className={styles.quizInfoContainer}>
            <div className={styles.quizNameInput}>
              <input
                type="text"
                placeholder="Quiz name"
                className={styles.quizInput}
                onChange={changeHandler}
              />
              <div className={styles.errorContainer}>
                <span className={styles.error}>{errors.title}</span>
              </div>
            </div>

            <div className={styles.quizTypeSection}>
              <div className={styles.quizTypeContainer}>
                <p className={styles.quizTypeLabel}>Quiz Type</p>
                <div
                  className={`${styles.quizTypeOption} ${
                    selectedQuizType === "Q&A" && styles.quizTypeSelected
                  }`}
                  onClick={() => handleQuizTypeChange("Q&A")}
                >
                  Q & A
                </div>
                <div
                  className={`${styles.quizTypeOption} ${
                    selectedQuizType === "Poll" && styles.quizTypeSelected
                  }`}
                  onClick={() => handleQuizTypeChange("Poll")}
                >
                  Poll Type
                </div>
              </div>
              <span
                className={styles.error}
                style={{ marginTop: "-10px", marginBottom: "10px" }}
              >
                {errors.type}
              </span>
            </div>
            <div className={styles.buttonsContainer}>
              <button
                className={styles.cancelButton}
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button
                className={styles.continueButton}
                onClick={handleContinueClick}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : (
        <QuizModal/>
      )}
    </div>
  );
};

export default Createquiz;
