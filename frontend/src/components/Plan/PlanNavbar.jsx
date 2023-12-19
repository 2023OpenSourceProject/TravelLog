import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./PlanNavbar.module.css";
import icon from "../../assets/icon.svg";
import editIcon from "../../assets/editIcon.png";
import axios from "axios";

const PlanNavbar = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const editClickHandler = () => {
    props.setModalOpen(true);
  };

  const cancleHandler = () => {
    if (confirm("취소하시겠습니까?")) {
      navigate("/");
    } else {
      return
    }
  }

  const savePlanHandler = (event) => {
    event.preventDefault();

    if (confirm("저장하시겠습니까?")) {
      axios
        .post("https://api.travellog.site:8080/plan", props.newPlan, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          alert("일정 생성 성공");
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          alert("일정 생성 실패");
          console.error(error);
        });
    } else {
      console.log("일정 저장 취소");
    }
  };

  const listClickHandler = (day) => {
    props.setSelectedDay(day);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/">
            <img className={styles.icon} src={icon} />
          </Link>
          <div className={styles.headerLeftPart}>
            <div className={styles.planName}>{props.planName}</div>
            <div className={styles.date}>
              {props.startDate} ~ {props.endDate}
            </div>
          </div>
          <div>
            <img
              className={styles.editIcon}
              onClick={editClickHandler}
              src={editIcon}
            ></img>
          </div>
        </div>
        <div>
          <ul className={styles.days}>
            {Array.from({ length: props.dateDiff }, (_, i) => i + 1).map(
              (day) => (
                <li
                  key={day}
                  className={styles.day}
                  onClick={() => listClickHandler(day)}
                >
                  {day === props.selectedDay ? (
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
          <button onClick={cancleHandler} className={styles.cancleBtn}>취소</button>
          <form onSubmit={savePlanHandler}>
            <button type="submit" className={styles.saveBtn}>
              저장
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PlanNavbar;
