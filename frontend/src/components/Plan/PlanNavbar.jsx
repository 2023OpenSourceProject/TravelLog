import React from "react";

import {Link} from 'react-router-dom';
import styles from "./PlanNavbar.module.css";
import icon from '../../assets/icon.svg';
import editIcon from '../../assets/editIcon.png';

const PlanNavbar = (props) => {

  
  const editClickHandler = () =>{
    props.setModalOpen(true);
  }

  const savePlanHandler = (event) => {
    event.preventDefault();
    alert("저장하시겠습니까?")
    console.log("Save");
  }
  const listClickHandler = (day) => {
    props.setSelectedDay(day)
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
          {Array.from({ length: props.dateDiff}, (_, i) => i + 1).map((day) => (
            <li key={day} className={styles.day} onClick={() => listClickHandler(day)}>
              {day === props.selectedDay ? <div className={styles.selectedDay}>Day {day}</div> : <div>{`Day ${day}`}</div>}
            </li>
          ))}
        </ul>

        <div className={styles.btns}>
          <Link to="/"><button  className={styles.cancleBtn}>취소</button></Link>
          <form onSubmit={savePlanHandler}>
            <button type="submit" className={styles.saveBtn}>저장</button>
          </form>

        </div>
      </div>
    </>
  );
};

export default PlanNavbar;
