import React from "react";
import {Link} from 'react-router-dom';
import styles from "./PlanNavbar.module.css";
import icon from '../../assets/icon.svg';
const PlanNavbar = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/"><img className={styles.icon} src={icon}/></Link>
          <div className={styles.headerLeftPart}>
            <div className={styles.planName}>Plan Name</div>
            <div className={styles.date}>20XX.XX.XX ~ 20XX.XX.XX</div>
          </div>

          
        </div>
        <ul className={styles.days}>
          <li className={styles.day}>Day1</li>
          <li className={styles.day}>Day2</li>
          <li className={styles.day}>Day3</li>
           </ul>
        <div className={styles.btns}>
          <button className={styles.cancleBtn}>취소</button>
          <button className={styles.saveBtn}>저장</button>
        </div>
      </div>
    </>
  );
};

export default PlanNavbar;
