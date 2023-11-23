import styles from "./TravelList.module.css";
import icon2 from "../../assets/icon2.png";
import deleteIcon from "../../assets/deleteIcon.svg";

const TravelList = ({ selectedDay, locationList, setLocationList }) => {
  const removePlaceHandler = (indexToRemove) => {
    setLocationList((prevState) => {
      let count = 0; // 선택된 날짜의 장소들 중에서 몇 번째인지를 세는 카운터
      const newLocationList = prevState.filter((item, index) => {
        if (item.day === selectedDay) {
          return count++ !== indexToRemove;
        }
        return true;
      });

      count = 0;
      newLocationList.forEach((item, index) => {
        if (item.day === selectedDay) {
          item.seq = ++count;
        }
      });
      return newLocationList;
    });
  };

  return (
    <>
      <ul className={styles.travelList}>
        {locationList
          .filter((item) => item.day === selectedDay)
          .map((item, index) => (
            <li className={styles.travelPlace} key={index}>
              <img className={styles.listIcon} src={icon2}></img>
              <h5>{item.name}</h5>
              <img
                className={styles.deleteIcon}
                src={deleteIcon}
                onClick={() => removePlaceHandler(index)}
              ></img>
            </li>
          ))}
      </ul>
    </>
  );
};

export default TravelList;
