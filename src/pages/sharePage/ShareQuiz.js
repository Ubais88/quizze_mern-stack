import React from "react";
import styles from "./ShareQuiz.module.css";
import { RxCross2 } from "react-icons/rx";
import handleShareClick from "../../utils/clipboardUtils";
import { useAuth } from "../../store/auth";

const ShareQuiz = ({setShareModalOpen , shareQuizId}) => {
  const { setModalOpen} = useAuth();

  const url = `http://localhost:3000/playquiz/${shareQuizId}`;

  const handleClick = () => {
    handleShareClick(url)
  }

  const crossClickHandler =() => {
    setShareModalOpen(false)
    setModalOpen(false);
  }

  return (
    <div className={styles.ShareQuizContainer}>
      <div className={styles.ShareQuizContent}>
        <div className={styles.cross}>
          <RxCross2 color="#474444" size={25} onClick={crossClickHandler} />
        </div>
        <div className={styles.contentSection}>
          <p className={styles.title}>Congrats your Quiz is Published!</p>
          <div className={styles.urlHolder}>{url}</div>
          <div className={styles.buttonHolder}>
            <button className={styles.shareButton} onClick={handleClick}>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareQuiz;
