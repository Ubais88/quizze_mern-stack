import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password:""
  })
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]:value
    })

    setErrors({})
  }


  const isFormValid = () => {
    const newErrors = {};

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginFormData.email);
    const isPasswordValid = loginFormData.password.length >= 6;

    if (!isEmailValid) {
      newErrors.email = "Invalid Email";
    }

    if (!isPasswordValid) {
      newErrors.password = "Weak password";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      toast.success("Login success!");
      navigate('/dashboard');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formFields}>
          <div className={styles.fieldContainer}>
            <label className={styles.paraContainer}>
              <p className={styles.inputPara}>Email</p>
            </label>
            <input
              type="email"
              name="email"
              className={`${styles.inputField} ${
                errors.email && styles.errorBorder
              }`}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.fieldContainer}>
            <label className={styles.paraContainer}>
              <p className={styles.inputPara}>Password</p>
            </label>
            <input
              type="password"
              name="password"
              className={`${styles.inputField} ${
                errors.password && styles.errorBorder
              }`}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button className={styles.loginButton}>Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
