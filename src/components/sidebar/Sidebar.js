import React, { useState } from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logoContainer}>
        <h1 className={styles.logoText}>QUIZZIE</h1>
      </div>

      <div className={styles.menuItems}>
        <div
          className={`${styles.menuItem} ${selectedMenuItem === 'Dashboard' && styles.selectedMenuItem}`}
          onClick={() => handleMenuItemClick("Dashboard")}
        >
          Dashboard
        </div>
        <div
          className={`${styles.menuItem} ${selectedMenuItem === 'Analytics' && styles.selectedMenuItem}`}
          onClick={() => handleMenuItemClick("Analytics")}
        >
          Analytics
        </div>
        <div
          className={`${styles.menuItem} ${selectedMenuItem === 'Create Quiz' && styles.selectedMenuItem}`}
          onClick={() => handleMenuItemClick("Create Quiz")}
        >
          Create Quiz
        </div>
      </div>

      <div className={styles.logoutContainer}>
        <div className={styles.divider}></div>
        <h2 className={styles.logoutText}>Logout</h2>
      </div>
    </div>
  );
};

export default Sidebar;
