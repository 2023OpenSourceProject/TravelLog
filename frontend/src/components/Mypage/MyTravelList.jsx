import styles from "./MyTravelList.module.css";
import icon2 from "../../assets/arrowIcon.svg";
import noResult from "../../assets/image/noResult2.png";
import { useState, useEffect } from "react";
import axios from "axios";

const MyTravelList = ({ selectedDay ,planId}) => {
  const [planDetails, setPlanDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.travellog.site:8080/viewplan/${planId}`, {})
      .then((response) => {
        setPlanDetails(response.data.plan_details);    
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <>
      <ul className={styles.travelList}>
        {planDetails.length > 0 ? (
          planDetails
            .filter((item) => item.day === selectedDay)
            .map((item, index) => (
              <li className={styles.travelLocations} key={index}>
                <div className={styles.locationBoxSection}>
                  <button className={styles.numberSection}>{index+1}</button>
                  <div className={styles.locationTextSection}>
                    <div className={styles.locationName}>{item.name}</div>
                    <div className={styles.locationCategory}>{item.category2}</div>
                  </div>
                </div>
              </li>
            ))
        ) : (
          <div className={styles.noLocations}>
            <img style={{ width: "15vw" }} src={noResult} alt="noResult" />
            <div>추가한 여행지가 없습니다</div>
          </div>
        )}
      </ul>
    </>
  );
};

export default MyTravelList;
