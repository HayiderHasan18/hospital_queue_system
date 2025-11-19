
import React from 'react';
import { FaUsers, FaUserClock, FaUserCheck, FaClock } from 'react-icons/fa';
import styles from './Stats.module.css';

const Stats = ({ queueCount, calledCount, servedCount }) => {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.statBox}>
        <div className={styles.iconContainer}>
          <FaUsers className={styles.icon} />
        </div>
        <h3>Waiting Patients</h3>
        <p className={styles.statValue}>{queueCount}</p>
        <small>In queue</small>
      </div>
      
      <div className={`${styles.statBox} ${styles.statBoxTime}`}>
        <div className={styles.iconContainer}>
          <FaUserClock className={styles.icon} />
        </div>
        <h3>Called Patients</h3>
        <p className={styles.statValue}>{calledCount}</p>
        <small>Ready for consultation</small>
      </div>
        

      
      <div className={`${styles.statBox} ${styles.statBoxServed}`}>
        <div className={styles.iconContainer}>
          <FaUserCheck className={styles.icon} />
        </div>
        <h3>Served Patients</h3>
        <p className={styles.statValue}>{servedCount}</p>
        <small>Today</small>
      </div>
      
     
    </div>
  );
};

export default Stats;