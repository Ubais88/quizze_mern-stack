import React from "react";
import styles from "./ShareQuiz.module.css";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

const ShareQuiz = ({setShareModalOpen}) => {
  const link = "abcdxusdisnvkjvnxfdn/.gbcv";

  const handleShareClick = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard!", {
          position: "top-right",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  return (
    <div className={styles.ShareQuizContainer}>
      <div className={styles.ShareQuizContent}>
        <div className={styles.cross}>
          <RxCross2 color="#474444" size={25} onClick={() => setShareModalOpen(false)} />
        </div>
        <div className={styles.contentSection}>
          <p className={styles.title}>Congrats your Quiz is Published!</p>
          <div className={styles.urlHolder}>{link}</div>
          <div className={styles.buttonHolder}>
            <button className={styles.shareButton} onClick={handleShareClick}>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareQuiz;
