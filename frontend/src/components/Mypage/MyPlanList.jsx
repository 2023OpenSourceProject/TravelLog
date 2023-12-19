import React, { useState, useEffect } from "react";
import styles from "./MyPlanList.module.css";
import { Link } from "react-router-dom";
import noResultImage from "../../assets/image/noResult2.png";
import axios from "axios";

const MyPlanList = () => {
  const token = localStorage.getItem("token");
  const [myPlanlist, setMyPlanList] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.travellog.site:8080/user/myplan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMyPlanList(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className={styles.body}>
      <p className={styles.title}>My Plan</p>
      {myPlanlist.length > 0 ? (
        <div className={styles.container}>
          {[...myPlanlist].reverse().map((plan) => (
            <Link
              to={`/MyPlan/${plan.plan_id}`}
              state={{ plan_id: plan.plan_id }}
              key={plan.plan_id}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.plan_box}>
                <div className={styles.plan}>
                  <div className={styles.title_view_container}>
                    <li className={styles.plan_title}>{plan.title}</li>
                    <p className={styles.create_date}>{plan.created_at}</p>
                  </div>
                  <div className={styles.date}>
                    <p>
                      {plan.start_date} ~ {plan.end_date}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.notFoundSection}>
          <img src={noResultImage} />
          <div className={styles.no_review_message}>작성한 계획이 없습니다</div>
        </div>
      )}
    </div>
  );
};

export default MyPlanList;
