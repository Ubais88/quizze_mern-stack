import React, { useState } from "react";
import styles from "./Createquiz.module.css";

const Createquiz = () => {
  const [selectedQuizType, setSelectedQuizType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleQuizTypeChange = (type) => {
    setSelectedQuizType(type);
  };

  const handleCancelClick = () => {
    // Close the modal by setting isModalOpen to false
    setIsModalOpen(false);
  };

  return (
    <div className={`${styles.createQuizContainer} ${isModalOpen ? styles.modalOpen : styles.modalClosed}`}>
      {isModalOpen && (
        <div className={styles.quizInfoContainer}>
          <div className={styles.quizNameInput}>
            <input type="text" placeholder="Quiz name" className={styles.quizInput} />
          </div>
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
                selectedQuizType === "Poll Type" && styles.quizTypeSelected
              }`}
              onClick={() => handleQuizTypeChange("Poll Type")}
            >
              Poll Type
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <button className={styles.cancelButton} onClick={handleCancelClick}>
              Cancel
            </button>
            <button className={styles.continueButton}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Createquiz;
