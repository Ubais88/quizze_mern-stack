import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import Createquiz from "../createQuiz/Createquiz";
import { useAuth } from "../../store/auth";

const Sidebar = () => {
  const { LogoutUser , modalOpen , setModalOpen} = useAuth();
  const navigate = useNavigate()
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
  

  const handleMenuItemClick = (e) => {
    const menuItem = e.target.id; 
    if(menuItem == "createquiz"){
      setModalOpen(true)
      return
    } 
    setSelectedMenuItem(menuItem);
  };

const logoutClickHandler = () => {
  LogoutUser();
  navigate('/')
}

  useEffect(() => {
    navigate(`/${selectedMenuItem}`);
  },[selectedMenuItem]);

  return (
    <div>
    <div className={styles.sidebarContainer}>
      <div className={styles.logoContainer}>
        <h1 className={styles.logoText}>QUIZZIE</h1>
      </div>

      <div className={styles.menuItems}>
        <div
        onClick={handleMenuItemClick}
          className={`${styles.menuItem} ${selectedMenuItem === 'dashboard' && styles.selectedMenuItem}`}
          id="dashboard"
          
        >
          Dashboard
        </div>
        <div
          className={`${styles.menuItem} ${selectedMenuItem === 'analytics' && styles.selectedMenuItem}`}
          id="analytics"
          onClick={handleMenuItemClick}
        >
          Analytics
        </div>
        <div
          className={`${styles.menuItem} ${selectedMenuItem === 'createquiz' && styles.selectedMenuItem}`}
          id="createquiz"
          onClick={handleMenuItemClick}
        >
          Create Quiz
        </div>
      </div>

      <div className={styles.logoutContainer}>
        <div className={styles.divider}></div>
        <h2 className={styles.logoutText} onClick={logoutClickHandler}>Logout</h2>
      </div>
    </div>
    {
      modalOpen && <Createquiz/>
    }
    </div>
  );
};

export default Sidebar;
