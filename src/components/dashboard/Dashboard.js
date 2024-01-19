import React from "react";
import styles from "./Dashboard.module.css";
import EyeIcon from "../../assets/eye.png";

const Dashboard = () => {
  const data = [
    {
      id: 1,
      name: "Quiz 1",
      impressions: "20",
      createdAt: "Created on: 04 Sep, 2023",
    },
    {
      id: 2,
      name: "Quiz 2",
      impressions: "210",
      createdAt: "Created on: 24 Sep, 2023",
    },
    {
      id: 3,
      name: "Quiz 3",
      impressions: "212",
      createdAt: "Created on: 04 Sep, 2024",
    },
    {
      id: 4,
      name: "Quiz 1",
      impressions: "2320",
      createdAt: "Created on: 24 Sep, 2023",
    },
    {
      id: 5,
      name: "Quiz 5",
      impressions: "4560",
      createdAt: "Created on: 12 Aug, 2022",
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.boxes}>
        <div className={`${styles.box} ${styles.colorBox1}`}>
          <h1 className={styles.boxTitle}>20</h1>
          <p className={styles.boxSubtitle}>Quiz</p>
          <p className={styles.boxSubtitle}> Created</p>
        </div>

        <div className={`${styles.box} ${styles.colorBox2}`}>
          <h1 className={styles.boxTitle}>200</h1>
          <p className={styles.boxSubtitle}>Questions </p>
          <p className={styles.boxSubtitle}> Created</p>
        </div>

        <div className={`${styles.box} ${styles.colorBox3}`}>
          <h1 className={styles.boxTitle}>1.4K</h1>
          <p className={styles.boxSubtitle}>Total </p>
          <p className={styles.boxSubtitle}> Impressions</p>
        </div>
      </div>
      <div className={styles.trendingSection}>
        <p className={styles.trendingTitle}>Trending Quizzes</p>
        <div className={styles.trendingBoxes}>

          <div className={styles.trendingBox}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizName}>Quiz 1</h3>
                <p className={styles.impressionCount}>
                  667
                  <img src={EyeIcon} alt="impression" />
                </p>
            </div>
            <div className={styles.quizDateInfo}>
              <p className={styles.quizDate}>Created on : 04 Sep, 2023</p>
            </div>
          </div>

          <div className={styles.trendingBox}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizName}>Quiz 1</h3>
              <div className={styles.impressionContainer}>
                <p className={styles.impressionCount}>
                  667
                  <img src={EyeIcon} alt="impression" />
                </p>
              </div>
            </div>
            <div className={styles.quizDateInfo}>
              <p className={styles.quizDate}>Created on : 04 Sep, 2023</p>
            </div>
          </div>

          <div className={styles.trendingBox}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizName}>Quiz 1</h3>
              <div className={styles.impressionContainer}>
                <p className={styles.impressionCount}>
                  667
                  <img src={EyeIcon} alt="impression" />
                </p>
              </div>
            </div>
            <div className={styles.quizDateInfo}>
              <p className={styles.quizDate}>Created on : 04 Sep, 2023</p>
            </div>
          </div>

          <div className={styles.trendingBox}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizName}>Quiz 1</h3>
              <div className={styles.impressionContainer}>
                <p className={styles.impressionCount}>
                  667
                  <img src={EyeIcon} alt="impression" />
                </p>
              </div>
            </div>
            <div className={styles.quizDateInfo}>
              <p className={styles.quizDate}>Created on : 04 Sep, 2023</p>
            </div>
          </div>

          <div className={styles.trendingBox}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizName}>Quiz 1</h3>
              <div className={styles.impressionContainer}>
                <p className={styles.impressionCount}>
                  667
                  <img src={EyeIcon} alt="impression" />
                </p>
              </div>
            </div>
            <div className={styles.quizDateInfo}>
              <p className={styles.quizDate}>Created on : 04 Sep, 2023</p>
            </div>
          </div>

          <div className={styles.trendingBox}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizName}>Quiz 1</h3>
                <p className={styles.impressionCount}>
                  667
                  <img src={EyeIcon} alt="impression" />
                </p>
            </div>
            <div className={styles.quizDateInfo}>
              <p className={styles.quizDate}>Created on : 04 Sep, 2023</p>
            </div>
          </div>

          <div className={styles.trendingBox}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizName}>Quiz 1</h3>
              <div className={styles.impressionContainer}>
                <p className={styles.impressionCount}>
                  667
                  <img src={EyeIcon} alt="impression" />
                </p>
              </div>
            </div>
            <div className={styles.quizDateInfo}>
              <p className={styles.quizDate}>Created on : 04 Sep, 2023</p>
            </div>
          </div>

          <div className={styles.trendingBox}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizName}>Quiz 1</h3>
              <div className={styles.impressionContainer}>
                <p className={styles.impressionCount}>
                  667
                  <img src={EyeIcon} alt="impression" />
                </p>
              </div>
            </div>
            <div className={styles.quizDateInfo}>
              <p className={styles.quizDate}>Created on : 04 Sep, 2023</p>
            </div>
          </div>

          <div className={styles.trendingBox}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizName}>Quiz 1</h3>
              <div className={styles.impressionContainer}>
                <p className={styles.impressionCount}>
                  667
                  <img src={EyeIcon} alt="impression" />
                </p>
              </div>
            </div>
            <div className={styles.quizDateInfo}>
              <p className={styles.quizDate}>Created on : 04 Sep, 2023</p>
            </div>
          </div>

          <div className={styles.trendingBox}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizName}>Quiz 1</h3>
              <div className={styles.impressionContainer}>
                <p className={styles.impressionCount}>
                  667
                  <img src={EyeIcon} alt="impression" />
                </p>
              </div>
            </div>
            <div className={styles.quizDateInfo}>
              <p className={styles.quizDate}>Created on : 04 Sep, 2023</p>
            </div>
          </div>

          <div className={styles.trendingBox}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizName}>Quiz 1</h3>
                <p className={styles.impressionCount}>
                  667
                  <img src={EyeIcon} alt="impression" />
                </p>
            </div>
            <div className={styles.quizDateInfo}>
              <p className={styles.quizDate}>Created on : 04 Sep, 2023</p>
            </div>
          </div>

          <div className={styles.trendingBox}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizName}>Quiz 1</h3>
              <div className={styles.impressionContainer}>
                <p className={styles.impressionCount}>
                  667
                  <img src={EyeIcon} alt="impression" />
                </p>
              </div>
            </div>
            <div className={styles.quizDateInfo}>
              <p className={styles.quizDate}>Created on : 04 Sep, 2023</p>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;
