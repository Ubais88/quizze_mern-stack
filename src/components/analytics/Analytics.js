import React from 'react';
import styles from './Analytics.module.css';
import { TiEdit } from "react-icons/ti";
import { HiTrash } from "react-icons/hi";
import { IoShareSocialSharp } from "react-icons/io5";

const Analytics = () => {
  const quizData = [
    {
      id: 1,
      name: 'Quiz 1',
      createdAt: '2023-09-04',
      impressions: 150,
    },
    {
      id: 2,
      name: 'Quiz 2',
      createdAt: '2023-09-24',
      impressions: 210,
    },
    {
      id: 3,
      name: 'Quiz 3',
      createdAt: '2023-09-24',
      impressions: 210,
    },
    {
      id: 4,
      name: 'Quiz 4',
      createdAt: '2023-09-24',
      impressions: 210,
    },
    {
      id: 1,
      name: 'Quiz 1',
      createdAt: '2023-09-04',
      impressions: 150,
    },
    {
      id: 2,
      name: 'Quiz 2',
      createdAt: '2023-09-24',
      impressions: 210,
    },
    {
      id: 3,
      name: 'Quiz 3',
      createdAt: '2023-09-24',
      impressions: 210,
    },
    {
      id: 4,
      name: 'Quiz 4',
      createdAt: '2023-09-24',
      impressions: 210,
    },
    {
      id: 1,
      name: 'Quiz 1',
      createdAt: '2023-09-04',
      impressions: 150,
    },
    {
      id: 2,
      name: 'Quiz 2',
      createdAt: '2023-09-24',
      impressions: 210,
    },
    {
      id: 3,
      name: 'Quiz 3',
      createdAt: '2023-09-24',
      impressions: 210,
    },
    {
      id: 4,
      name: 'Quiz 4',
      createdAt: '2023-09-24',
      impressions: 210,
    },    {
      id: 1,
      name: 'Quiz 1',
      createdAt: '2023-09-04',
      impressions: 150,
    },
    {
      id: 2,
      name: 'Quiz 2',
      createdAt: '2023-09-24',
      impressions: 210,
    },
    {
      id: 3,
      name: 'Quiz 3',
      createdAt: '2023-09-24',
      impressions: 210,
    },
    {
      id: 4,
      name: 'Quiz 4',
      createdAt: '2023-09-24',
      impressions: 210,
    },
    
  ];

  return (
    <div className={styles.quizAnalyticsPage}>
      <h2 className={styles.analyticsTitle}>Quiz Analytics</h2>
      <div className={styles.quizTableContainer}>
      <table className={styles.quizTable}>
        <thead className={styles.headerContainer}>
          <tr>
            <th className={`${styles.tableHeader} ${styles.startBorderRadius}`}>S.No.</th>
            <th className={styles.tableHeader}>Quiz Name</th>
            <th className={styles.tableHeader}>Created At</th>
            <th className={styles.tableHeader}>Impressions</th>
            <th className={styles.tableHeader}></th>
            <th className={`${styles.tableHeader} ${styles.endBorderRadius}`}></th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {quizData.map((quiz, index) => (
            <tr key={quiz.id} className={(index+1) % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <td className={`${styles.serialNumber} ${styles.startBorderRadius}`}>{index + 1}</td>
              <td className={styles.quizName}>{quiz.name}</td>
              <td className={styles.createdAt}>{quiz.createdAt}</td>
              <td className={`${styles.impressions}`}>{quiz.impressions}</td>
              <td className={styles.operations}>
                <div className={styles.operationButton}>
                <TiEdit size={23} color='#854CFF'/>
                <HiTrash size={23} color='#D60000'/>
                <IoShareSocialSharp size={23} color='#60B84B'/>
                </div>
              </td>
              <td className={`${styles.analysis} ${styles.endBorderRadius}`}>
                <p className={styles.analysisPara}>Question Wise Analysis</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Analytics;
