import React from "react";
import {Link} from 'react-router-dom';
import styles from "./PlanNavbar.module.css";
import icon from '../../assets/icon.svg';
import editIcon from '../../assets/editIcon.png';

const PlanNavbar = (props) => {

  const editClickHandler = () =>{
    props.setModalOpen(false);
  }

  const savePlanHandler = (event) => {
    event.preventDefault();
    props.setModalStyle("save");
    console.log("Save");
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/"><img className={styles.icon} src={icon}/></Link>
          <div className={styles.headerLeftPart}>
            <div className={styles.planName}>{props.planName}</div>
            <div className={styles.date}>{props.startDate} ~ {props.endDate}</div>
          </div>
          <div ><img className={styles.editIcon} onClick={editClickHandler} src={editIcon} ></img></div>

          
        </div>
        <ul className={styles.days}>
          <li className={styles.day}>Day1</li>
          <li className={styles.day}>Day2</li>
          <li className={styles.day}>Day3</li>
           </ul>
        <div className={styles.btns}>
          <button  className={styles.cancleBtn}>취소</button>
          <form onSubmit={savePlanHandler}>
            <button type="submit" className={styles.saveBtn}>저장</button>
          </form>

        </div>
      </div>
    </>
  );
};

export default PlanNavbar;
