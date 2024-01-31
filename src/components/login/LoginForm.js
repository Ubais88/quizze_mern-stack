import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import axios from "axios";


const LoginForm = () => {
const { storeTokenInLS, BASE_URL } = useAuth();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
    setErrors({});
  };


  const isFormValid = () => {
    const newErrors = {};

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginFormData.email);
    const isPasswordValid = loginFormData.password.length >= 5;

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const response = await axios.post(
          `${BASE_URL}/auth/login`,
          JSON.stringify(loginFormData),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        //console.log("Login response:", response);

        if (response.status === 200) {
          // Successful login
          // console.log(response)
          storeTokenInLS(response.data.token);
          setLoginFormData({ email: "", password: "" });
          toast.success("Login successful",{
            position: "top-right",
          });
          navigate("/dashboard");
        } else {
          // Failed login
          const res_data = response.data; // Access the response data directly
          toast.error(res_data.message);
          //console.log("Invalid credential");
        }
      } catch (error) {
        // Log any errors
        console.error("Login error:", error);
        toast.error(error.response.data.message,{
          position: "top-right",
        })
      }
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
