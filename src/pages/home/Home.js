import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Dashboard from '../../components/dashboard/Dashboard'
import styles from "./Home.module.css"
import Analytics from '../../components/analytics/Analytics'
import Createquiz from '../../components/createQuiz/Createquiz'

const Home = () => {
  return (
    <div className={styles.homeContainer}>
        <Sidebar/>
        <Createquiz/>
    </div>
  )
}

export default Home