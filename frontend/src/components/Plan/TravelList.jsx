import styles from "./TravelList.module.css";
import icon2 from "../../assets/arrowIcon.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import noResult from "../../assets/image/noResult2.png";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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

  const moveDownHandler = (indexToMove) => {
    setLocationList((prevState) => {
      const selectedDayPlaces = prevState.filter(
        (item) => item.day === selectedDay
      );

      if (indexToMove < selectedDayPlaces.length - 1) {
        const temp = selectedDayPlaces[indexToMove];
        selectedDayPlaces[indexToMove] = selectedDayPlaces[indexToMove + 1];
        selectedDayPlaces[indexToMove + 1] = temp;
      }

      selectedDayPlaces.forEach((item, index) => {
        item.seq = index + 1;
      });

      const otherDayPlaces = prevState.filter(
        (item) => item.day !== selectedDay
      );

      return [...otherDayPlaces, ...selectedDayPlaces];
    });
  };

  return (
    <>
      <ul className={styles.travelList}>
        {locationList.length > 0 ? (
            locationList
              .filter((item) => item.day === selectedDay)
              .map((item, index) => (
                  <li className={styles.travelLocations} key={index}>
                    <img
                      className={styles.listIcon}
                      src={icon2}
                      onClick={() => moveDownHandler(index)}
                    ></img>
                    <div className={styles.locationName}>{item.name}</div>
                    <img
                      className={styles.deleteIcon}
                      src={deleteIcon}
                      onClick={() => removePlaceHandler(index)}
                    ></img>
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

export default TravelList;
