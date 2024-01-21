import React from "react";
import styles from "./DeleteQuiz.module.css";
import toast from "react-hot-toast";

const DeleteQuiz = ({setDeleteModalOpen}) => {


  return (
    <div className={styles.deleteQuizContainer}>
      <div className={styles.deleteQuizContent}>
          <p className={styles.title}>Are you confirm you want to delete ?</p>
          <div className={styles.buttonHolder}>
            <button className={styles.deleteButton}>
            Confirm Delete
            </button>

            <button className={styles.cancelButton} onClick={() => setDeleteModalOpen(false)}>
            Cancel
            </button>
          </div>
        </div>
      </div>
  );
};

export default DeleteQuiz;
