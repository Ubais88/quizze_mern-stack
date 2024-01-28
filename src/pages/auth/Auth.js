import React, { useEffect, useState } from "react";
import LoginForm from "../../components/login/LoginForm.js";
import SignupForm from "../../components/signup/SignupForm.js";
import styles from "./Auth.module.css";
import { useAuth } from "../../store/auth.js";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const {isLoggedIn} = useAuth()
  const navigate = useNavigate()
  const [isLoginFormActive, setLoginFormActive] = useState(false);

 useEffect(()=>{
  if(isLoggedIn) {
    navigate('/dashboard')
  }
 },[])

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>QUIZZIE</h1>
          <div className={styles.buttonContainer}>
            <div
              className={`${styles.authButton} ${
                !isLoginFormActive && styles.activeButton
              }`}
              onClick={() => setLoginFormActive(false)}
            >
              Sign Up
            </div>
            <div
              className={`${styles.authButton} ${
                isLoginFormActive && styles.activeButton
              }`}
              onClick={() => setLoginFormActive(true)}
            >
              Log In
            </div>
          </div>
        </div>
        {isLoginFormActive ? (
          <LoginForm />
        ) : (
          <SignupForm setLoginFormActive={setLoginFormActive} />
        )}
      </div>
    </div>
  );
};

export default Auth;
