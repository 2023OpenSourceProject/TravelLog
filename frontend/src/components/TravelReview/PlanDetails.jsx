import React from "react";
import styles from "./PlanDetails.module.css";
import defaultIcon from "../../assets/locationIcon/defaultIcon.svg";

const PlanDetails = ({ plan }) => {

  console.log(plan);
  if (!plan || !plan.plan_details) {
    return null;  // 또는 로딩중임을 나타내는 컴포넌트를 반환할 수 있습니다.
  }


  const groupedPlanDetails = plan.plan_details.reduce((acc, cur) => {
    if (!acc[cur.day]) acc[cur.day] = [];
    acc[cur.day].push(cur);
    return acc;
  }, {});

  return (
    // 전체 플랜 디테일을 담을 div
    <div className={styles.planDetailSection}>
      {/* N일차 별로 div를 나눔 1일차-2일차-3일차(마지막날짜)이면 3개의 planDetail div가 있어야함 */}
      {Object.keys(groupedPlanDetails).map((day) => (
        <div className={styles.planDetail} key={day} >
          <div className={styles.planDay}>Day {day}</div>
          <div className={styles.locations} >
            {groupedPlanDetails[day]
              .sort((a, b) => a.seq - b.seq)
              .map((detail) => (
                <div className={styles.planLocationSection} key={detail.planDetailId}>
                  <div className={styles.location}>
                    <img src={defaultIcon} alt="default" />
                    <div className={styles.detailName}>{detail.name}</div>
                  </div>
                </div>
              ))}
          </div>

        </div>
      ))}

      {/* N일차의 장소의 이름과 아이콘이 출력되어야함 img는 plan_detail의 항목의 category내용 따라 다르게 해야함 ex)plan_details[#].category === "병원" 이라면 병원 아이콘 "학교"라면 학교 아이콘 "" 비어있다면 디폴트 아이콘 보여줌 */}
      {/* N일차의 seq값에 따라 순서대로 출력되어야함 plan_details[#].day === 1이면 1일차, plan_details[#].seq === 2 라면 1일차의 2번째 장소 */}
    </div>
  );
};

export default PlanDetails;
