import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import { TiEdit } from "react-icons/ti";
import { HiTrash } from "react-icons/hi";
import { IoShareSocialSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import DeleteQuiz from "../deleteQuiz/DeleteQuiz";
import { useAuth } from "../../store/auth";
import axios from "axios";
import toast from "react-hot-toast";
import handleShareClick from "../../utils/clipboardUtils";

const Analytics = () => {
  const {
    authorizationToken,
    BASE_URL,
    setModalOpen,
    setQuizData,
    setQuizInfo,
    LogoutUser,
    setUpdateQuizId,
    setCreateQuiz,
  } = useAuth();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizAnalysis, setQuizAnalysis] = useState();
  const [deleteQuiz, setDeleteQuiz] = useState("");

  const fetchAnalysisData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/quiz/getallquiz`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      //console.log("analysis response: ", response);

      if (response.status === 200) {
        // Successful fetch analysis data
        setQuizAnalysis(response.data.formattedQuizzes);
        setLoading(false);
      } else {
        // Failed analysis
        const message = response.data.message;
        toast.error(message);
        //console.log("Invalid credential");
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

  const deleteHandler = (quizId) => {
    setDeleteQuiz(quizId);
    setDeleteModalOpen(true);
  };

  const shareHandler = (quizId) => {
    handleShareClick(quizId);
  };

  const handleAnalysisClick = (quizId) => {
    navigate(`/questionsanalytics/${quizId}`);
  };

  const editHandler = async (quizId) => {
    try {
      const response = await axios.get(`${BASE_URL}/quiz/getquiz/${quizId}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      //console.log("getquiz response: ", response);

      if (response.status === 200) {
        // Successful getstats
        setQuizInfo({
          quizName: response.data.quiz.quizName,
          quizType: response.data.quiz.quizType,
        });
        setQuizData(response.data.quiz);
        //console.log("quizData response:", response.data);
      } else {
        // Failed getstats
        const message = response.data.message;
        toast.error(message);
        //console.log("Invalid credential");
      }
    } catch (error) {
      // Log any errors
      console.error("stats  error:", error);
      // if the error is due to unauthorized access (status code 401)
      if (error.response && error.response.status === 401) {
        LogoutUser(); // Log out the user
      }
      toast.error("Something went wrong");
    }

    setUpdateQuizId(quizId);
    setModalOpen(true);
    setCreateQuiz(false);
  };

  useEffect(() => {
    fetchAnalysisData();
  }, [deleteQuiz]);

  return (
    <div className={styles.quizAnalyticsPage}>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <h2 className={styles.analyticsTitle}>Quiz Analytics</h2>
          <div className={styles.quizTableContainer}>
            {quizAnalysis.length > 0 && (
              <table className={styles.quizTable}>
                <thead className={styles.headerContainer}>
                  <tr>
                    <th
                      className={`${styles.tableHeader} ${styles.startBorderRadius}`}
                    >
                      S.No.
                    </th>
                    <th className={styles.tableHeader}>Quiz Name</th>
                    <th className={styles.tableHeader}>Created At</th>
                    <th className={styles.tableHeader}>Impressions</th>
                    <th className={styles.tableHeader}></th>
                    <th
                      className={`${styles.tableHeader} ${styles.endBorderRadius}`}
                    ></th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {quizAnalysis.map((quiz, index) => (
                    <tr
                      key={index}
                      className={
                        (index + 1) % 2 === 0 ? styles.evenRow : styles.oddRow
                      }
                    >
                      <td
                        className={`${styles.serialNumber} ${styles.startBorderRadius}`}
                      >
                        {index + 1}
                      </td>
                      <td className={styles.quizName}>
                        {quiz.quizName.length > 15
                          ? `${quiz.quizName.slice(0, 11)}..`
                          : quiz.quizName}
                      </td>
                      <td className={styles.createdAt}>{quiz.createdOn}</td>
                      <td className={`${styles.impressions}`}>
                        {quiz.impressions}
                      </td>
                      <td className={styles.operations}>
                        <div className={styles.operationButton}>
                          <TiEdit
                            size={23}
                            color="#854CFF"
                            onClick={() => editHandler(quiz._id)}
                          />
                          <HiTrash
                            size={23}
                            color="#D60000"
                            onClick={() => deleteHandler(quiz._id)}
                          />
                          <IoShareSocialSharp
                            size={23}
                            color="#60B84B"
                            onClick={() => shareHandler(quiz._id)}
                          />
                        </div>
                      </td>
                      <td
                        className={`${styles.analysis} ${styles.endBorderRadius}`}
                      >
                        <p
                          className={styles.analysisPara}
                          onClick={() => handleAnalysisClick(quiz._id)}
                        >
                          Question Wise Analysis
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {deleteModalOpen && (
        <DeleteQuiz
          setDeleteModalOpen={setDeleteModalOpen}
          deleteQuiz={deleteQuiz}
          setDeleteQuiz={setDeleteQuiz}
        />
      )}
    </div>
  );
};

export default Analytics;
