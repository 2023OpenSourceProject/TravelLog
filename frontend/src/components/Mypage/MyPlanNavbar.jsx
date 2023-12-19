import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./MyPlanNavbar.module.css";
import icon from "../../assets/icon.svg";
import editIcon from "../../assets/editIcon.png";
import axios from "axios";

const MyPlanNavbar = ({plan, dateDiff, selectedDay, setSelectedDay}) => {

  const listClickHandler = (day) => {
    setSelectedDay(day);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/">
            <img className={styles.icon} src={icon} />
          </Link>
          <div className={styles.headerLeftPart}>
            <div className={styles.planName}>{plan.title}</div>
            <div className={styles.date}>
              {plan.start_date} ~ {plan.end_date}
            </div>
          </div>
        </div>
        <div>
          <ul className={styles.days}>
            {Array.from({ length: dateDiff }, (_, i) => i + 1).map(
              (day) => (
                <li
                  key={day}
                  className={styles.day}
                  onClick={() => listClickHandler(day)}
                >
                  {day === selectedDay ? (
                    <div className={styles.selectedDay}>Day {day}</div>
                  ) : (
                    <div>{`Day ${day}`}</div>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
        <div className={styles.btns}>
          <Link to="/MyPage/MyPlan">
            <button className={styles.cancleBtn}>돌아가기</button>
          </Link>
        </div>
      </div>


    </>
  );
};

export default MyPlanNavbar;
