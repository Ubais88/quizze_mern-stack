import React, { useEffect, useState } from "react";
import styles from "./QuestionAnalysis.module.css";
import { useAuth } from "../../store/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const QuestionAnalysis = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { authorizationToken, BASE_URL } = useAuth();
  const [quizAnalysis, setQuizAnalysis] = useState();

  const fetchAnalysisData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/quiz/analysis/${id}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      console.log("question wise analysis response: ", response);

      if (response.status === 200) {
        // Successful fetch analysis data
        setQuizAnalysis(response.data.quiz);
        setLoading(false);
      } else {
        // Failed analysis
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
  // console.log("question.options", quizAnalysis.questions[0].options)
  return (
    <div className={styles.questionAnalysisContainer}>
      {loading ? (
        <div class="spinner"></div>
      ) : (
        <>
          <div className={styles.quizInfo}>
            <p className={styles.quizTitle}>Quiz 2 Question Analysis</p>
            <div className={styles.quizDetails}>
              <span className={styles.createdOn}>
                Created on: {quizAnalysis.createdOn}
              </span>
              <span className={styles.impressions}>
                Impressions: {quizAnalysis.impressions}
              </span>
            </div>
          </div>

          <div className={styles.analysisSection}>
            {quizAnalysis.questions.map((question, index) => (
              <div key={index} className={styles.questionAnalysis}>
                <p className={styles.questionText}>{question.questionText}</p>
                {quizAnalysis.quizType !== "Poll" ? (
                  <div className={styles.attemptDetails}>
                    <div className={styles.attemptItem}>
                      <p className={styles.attemptValue}>
                        {question.totalAnswers}
                      </p>
                      <span className={styles.attemptLabel}>
                        people attempted the question
                      </span>
                    </div>
                    <div className={styles.attemptItem}>
                      <p className={styles.attemptValue}>
                        {question.correctAnswers}
                      </p>
                      <span className={styles.attemptLabel}>
                        people answered correctly
                      </span>
                    </div>
                    <div className={styles.attemptItem}>
                      <p className={styles.attemptValue}>
                        {question.wrongAnswers}
                      </p>
                      <span className={styles.attemptLabel}>
                        people answered incorrectly
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.pollAttemptDetails}>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className={styles.pollAttemptItem}>
                        <p className={styles.attemptValue}>
                          {option.selectedCount}
                        </p>
                        <span className={styles.attemptLabel}>
                          Option {optionIndex + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className={styles.divider}></div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionAnalysis;
