import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Dashboard from '../../components/dashboard/Dashboard'
import styles from "./Home.module.css"

const Home = () => {
  return (
    <div className={styles.homeContainer}>
        <Sidebar/>
        <Dashboard/>
    </div>
  )
}

export default Home