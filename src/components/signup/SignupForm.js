import React, { useState } from "react";
import styles from "./SignupForm.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupForm = ({setLoginFormActive}) => {
  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({
      ...signupFormData,
      [name]: value,
    });
    console.log(signupFormData);
    setErrors({});
  };

  const isFormValid = () => {
    const newErrors = {};
    const isNameValid = signupFormData.name.trim() !== "";
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      signupFormData.email
    );
    const isPasswordValid = signupFormData.password.length >= 6;
    const isCPasswordValid =
      signupFormData.cPassword === signupFormData.password &&
      signupFormData.cPassword;

    if (!isNameValid) {
      newErrors.name = "Invalid name";
    }

    if (!isEmailValid) {
      newErrors.email = "Invalid Email";
    }

    if (!isPasswordValid) {
      newErrors.password = "Weak password";
    }

    if (!isCPasswordValid) {
      newErrors.cPassword = "password doesn’t match";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      toast.success("Form submitted successfully!");
      setLoginFormActive(true);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formFields}>
          <div className={styles.fieldContainer}>
            <label className={styles.paraContainer}>
              <p className={styles.inputPara}>Name</p>
            </label>
            <input
              type="text"
              name="name"
              className={`${styles.inputField} ${
                errors.name && styles.errorBorder
              }`}
              onChange={handleInputChange}
            />
          </div>

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

          <div className={styles.fieldContainer}>
            <label className={styles.paraContainer}>
              <p className={styles.inputPara}>Confirm Password</p>
            </label>
            <input
              type="text"
              name="cPassword"
              // value={signupFormData.cpassword}
              className={`${styles.inputField} ${
                errors.cPassword && styles.errorBorder
              }`}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button className={styles.signupButton} type="submit">
          Sign-Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
