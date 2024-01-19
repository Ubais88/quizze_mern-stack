import React, { useState } from "react";
import LoginForm from "../../components/login/LoginForm.js";
import SignupForm from "../../components/signup/SignupForm.js";
import styles from "./Auth.module.css";

const Auth = () => {
  const [isLoginFormActive, setLoginFormActive] = useState(false);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
        <p className={styles.title}>QUIZZIE</p>
        <div className={styles.buttonContainer}>
          <div className={`${styles.authButton} ${!isLoginFormActive && styles.activeButton}`} onClick={() => setLoginFormActive(false)}>
            Sign Up
          </div>
          <div className={`${styles.authButton} ${isLoginFormActive && styles.activeButton}`} onClick={() => setLoginFormActive(true)}>
            Log In
          </div>
        </div>
        </div>
        {isLoginFormActive ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default Auth;
