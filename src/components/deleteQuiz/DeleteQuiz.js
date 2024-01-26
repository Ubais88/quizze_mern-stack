import React from "react";
import styles from "./DeleteQuiz.module.css";
import toast from "react-hot-toast";
import { useAuth } from "../../store/auth";
import axios from "axios";

const DeleteQuiz = ({
  setDeleteModalOpen,
  LogoutUser,
  deleteQuiz,
  setDeleteQuiz,
}) => {
  const { authorizationToken, BASE_URL } = useAuth();
  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/quiz/delete/${deleteQuiz}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      //console.log("delete response: ", response);

      if (response.status === 200) {
        // Successful deleted data
        toast.success("Quiz deleted successfully");
        setDeleteModalOpen(false);
        setDeleteQuiz("");
      } else {
        // Failed analysis
        const message = response.data.message;
        toast.error(message);
        setDeleteModalOpen(false);
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

  const cancelHandler = () => {
    setDeleteQuiz("");
    setDeleteModalOpen(false);
  };
  return (
    <div className={styles.deleteQuizContainer}>
      <div className={styles.deleteQuizContent}>
        <p className={styles.title}>Are you confirm you want to delete ?</p>
        <div className={styles.buttonHolder}>
          <button className={styles.deleteButton} onClick={deleteHandler}>
            Confirm Delete
          </button>

          <button className={styles.cancelButton} onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuiz;
