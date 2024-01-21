import React from "react";
import styles from "./QuestionAnalysis.module.css";

const QuestionAnalysis = () => {
  const quizType = "quiz Type";
  const data = [
    {
      question: "Q.1 Question placeholder for analysis?",
      totalAttempt: "60",
      correctAnswer: "40",
      incorrectAnswer: "20",
    },
    {
      question: "Q.2 Question placeholder for analysis?",
      totalAttempt: "60",
      correctAnswer: "40",
      incorrectAnswer: "20",
    },
    {
      question: "Q.3 Question placeholder for analysis?",
      totalAttempt: "60",
      correctAnswer: "40",
      incorrectAnswer: "20",
    },
    {
      question: "Q.4 Question placeholder for analysis?",
      totalAttempt: "61",
      correctAnswer: "41",
      incorrectAnswer: "30",
    },
  ];

  return (
    <div className={styles.questionAnalysisContainer}>
      <div className={styles.quizInfo}>
        <p className={styles.quizTitle}>Quiz 2 Question Analysis</p>
        <div className={styles.quizDetails}>
          <span className={styles.createdOn}>Created on: 04 Sep, 2023</span>
          <span className={styles.impressions}>Impressions: 667</span>
        </div>
      </div>

      <div className={styles.analysisSection}>
        {data.map((item, index) => (
          <div key={index} className={styles.questionAnalysis}>
            <p className={styles.questionText}>{item.question}</p>
            {quizType !== "Poll Type" ? (
              <div className={styles.attemptDetails}>
                <div className={styles.attemptItem}>
                  <p className={styles.attemptValue}>{item.totalAttempt}</p>
                  <span className={styles.attemptLabel}>
                    people attempted the question
                  </span>
                </div>
                <div className={styles.attemptItem}>
                  <p className={styles.attemptValue}>{item.correctAnswer}</p>
                  <span className={styles.attemptLabel}>
                    people answered correctly
                  </span>
                </div>
                <div className={styles.attemptItem}>
                  <p className={styles.attemptValue}>{item.incorrectAnswer}</p>
                  <span className={styles.attemptLabel}>
                    people answered incorrectly
                  </span>
                </div>
              </div>
            ) : (
              <div className={styles.pollAttemptDetails}>
                <div className={styles.pollAttemptItem}>
                  <p className={styles.attemptValue}>25</p>
                  <span className={styles.attemptLabel}>
                    option 1
                  </span>
                </div>
                <div className={styles.pollAttemptItem}>
                  <p className={styles.attemptValue}>23</p>
                  <span className={styles.attemptLabel}>
                    option 2
                  </span>
                </div>
                <div className={styles.pollAttemptItem}>
                  <p className={styles.attemptValue}>12</p>
                  <span className={styles.attemptLabel}>
                    option 3
                  </span>
                </div>
                <div className={styles.pollAttemptItem}>
                  <p className={styles.attemptValue}>23</p>
                  <span className={styles.attemptLabel}>
                    option 4
                  </span>
                </div>
              </div>
            )}
            <div className={styles.divider}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionAnalysis;
