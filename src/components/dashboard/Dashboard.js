import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import EyeIcon from "../../assets/eye.png";
import { useAuth } from "../../store/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { authorizationToken, LogoutUser, BASE_URL } = useAuth();
  const [quizStats, setQuizStats] = useState();
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/quiz/getstats`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      // console.log("getstats response: ", response);

      if (response.status === 200) {
        // Successful getstats
        setQuizStats(response.data);
        setLoading(false);
      } else {
        // Failed getstats
        const message = response.data.message;
        toast.error(message);
        console.log("Invalid credential");
      }
    } catch (error) {
      // Log any errors
      console.error("stats  error:", error);
      // if the error is due to unauthorized access (status code 401)
      if (error.response && error.response.status === 401) {
        LogoutUser(); // Log out the user
      }
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <div className={styles.boxes}>
            <div className={`${styles.box} ${styles.colorBox1}`}>
              <h1 className={styles.boxTitle}>
                {quizStats.totalQuizzesCreated}
              </h1>
              <p className={styles.boxSubtitle}>Quiz</p>
              <p className={styles.boxSubtitle}> Created</p>
            </div>

            <div className={`${styles.box} ${styles.colorBox2}`}>
              <h1 className={styles.boxTitle}>{quizStats.totalQuestions}</h1>
              <p className={styles.boxSubtitle}>Questions </p>
              <p className={styles.boxSubtitle}> Created</p>
            </div>

            <div className={`${styles.box} ${styles.colorBox3}`}>
              <h1 className={styles.boxTitle}>{quizStats.totalImpressions}</h1>
              <p className={styles.boxSubtitle}>Total </p>
              <p className={styles.boxSubtitle}> Impressions</p>
            </div>
          </div>
          <div className={styles.trendingSection}>
            <p className={styles.trendingTitle}>Trending Quizzes</p>
            <div className={styles.trendingBoxes}>
              {quizStats.trendingQuizzes.length > 0 ? (
                quizStats.trendingQuizzes.map((quiz, index) => (
                  <div key={index} className={styles.trendingBox}>
                    <div className={styles.quizInfo}>
                      <h3 className={styles.quizName}>
                        {quiz.quizName.length > 8
                          ? `${quiz.quizName.slice(0, 6)}..`
                          : quiz.quizName}
                      </h3>
                      <p className={styles.impressionCount}>
                        {quiz.impressions}
                        <img src={EyeIcon} alt="impression" />
                      </p>
                    </div>
                    <div className={styles.quizDateInfo}>
                      <p className={styles.quizDate}>
                        Created on : {quiz.createdOn}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Quiz Found </h1>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
