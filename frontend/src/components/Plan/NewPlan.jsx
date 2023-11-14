import React from "react";
import {Link} from 'react-router-dom';
import CreateMap from './CreateMap';
import TravelList from "./TravelList";
import styles from "./NewPlan.module.css";
import PlanNavbar from "./PlanNavbar";

const NewPlan = () => {

  return (
    <div className={styles.main}>
      <PlanNavbar />
      <div className={styles.body}>
        <div><TravelList/></div>
        <div><CreateMap/></div>
      </div>

    </div>
  );
};

export default NewPlan;
