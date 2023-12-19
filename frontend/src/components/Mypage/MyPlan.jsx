import axios from "axios";
import { useLocation } from "react-router-dom";
import styles from "./MyPlan.module.css";
import React, { useState, useEffect } from "react";
import MyPlanNavbar from "./MyPlanNavbar";
import MyTravelList from "./MyTravelList";
import MyPlanMap from "./MyPlanMap";

const MyPlan = () => {
  const location = useLocation();
  const planId = location.state.plan_id;
  const [plan, setPlan] = useState([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [dateDiff, setDateDiff] = useState(1);
  let copiedPlan = [];

  const getDiff = (Start, End) => {
    const startDate = new Date(Start);
    const endDate = new Date(End);

    const diff = endDate.getTime() - startDate.getTime();

    return Math.abs(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://api.travellog.site:8080/viewplan/${planId}`, {})
      .then((response) => {
        setPlan(response.data);
        setDateDiff(getDiff(response.data.start_date, response.data.end_date));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);


  return (
    <>
      <MyPlanNavbar
        plan={plan}
        dateDiff={dateDiff}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <div className={styles.body}>
        <div>
          <MyTravelList planId={planId} selectedDay={selectedDay}/>
        </div>
        <div>
          <MyPlanMap planId={planId} selectedDay={selectedDay} />
        </div>
      </div>
    </>
  );
};

export default MyPlan;
