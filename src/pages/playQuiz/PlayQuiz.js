import React, { useState } from "react";
import styles from "./PlayQuiz.module.css";
import Congrats from "../../components/congrat/Congrats";

const PlayQuiz = () => {
  const optionType = "imageUrlf";
  const imageURL =
    "https://st4.depositphotos.com/3747267/23885/i/450/depositphotos_238850144-stock-photo-poppy-meadow-beautiful-light-evening.jpg";
  const [selectedOption, setSelectedOption] = useState();
  const [finalSubmit , setFinalSubmit] = useState(false);
  return (
    <div className={styles.playQuizContainer}>
      <div className={styles.playQuizModal}>
        <div className={styles.quizHeader}>
          <p className={styles.quizProgress}>01/04</p>
          <p className={styles.quizTimer}>00:10s</p>
        </div>
        <div className={styles.questionTextContainer}>
          <p className={styles.questionText}>
            Your question text comes here, it's a sample text.
          </p>
        </div>
        <div className={styles.optionsContainer}>
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`${styles.option} ${
                selectedOption === index && styles.selectedOption
              }`}
              onClick={() => setSelectedOption(index)}
            >
              {optionType === "Text" ? (
                <div className={styles.optionTextContainer}>
                <p className={styles.optionText}>Option 1</p>

                </div>
              ) : optionType === "imageUrl" ? (
                <img
                  src={imageURL}
                  alt="Option Image"
                  className={styles.optionImage}
                />
              ) : (
                <div className={styles.textImageoption}>
                  <p className={styles.optionImageText}>Sample Image</p>
                  <img
                    src={imageURL}
                    alt="Option Image"
                    className={styles.optionTextImage}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* <div className={styles.nextButtonContainer}> */}
        <button className={styles.nextButton} onClick={() => setFinalSubmit(true)}>NEXT</button>
        {/* </div> */}
        {
            finalSubmit && (<Congrats/>)
        }
      </div>
    </div>
  );
};

export default PlayQuiz;
