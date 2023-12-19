import styles from "./TravelList.module.css";
import icon2 from "../../assets/arrow_downward_alt.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import noResult from "../../assets/image/noResult2.png";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TravelList = ({ selectedDay, locationList, setLocationList }) => {
  console.log(locationList);

  const resetLocationsHandler = () => {
    setLocationList([]);
  }

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
      <div className={styles.initPlace} onClick={resetLocationsHandler}>장소 초기화</div>
      <ul className={styles.travelList}>
        {locationList.length > 0 ? (
          locationList
            .filter((item) => item.day === selectedDay)
            .map((item, index) => (
              <li className={styles.travelLocations} key={index}>
                <div className={styles.locationBoxSection}>
                  <button className={styles.numberSection}>{index+1}</button>
                  <div className={styles.locationTextSection}>
                    <div className={styles.locationName}>{item.name}</div>
                    <div className={styles.locationCategory}>{item.category2}</div>
                  </div>
                  <div className={styles.changeSeqBtn}>
                    <img
                      className={styles.listIcon}
                      src={icon2}
                      onClick={() => moveDownHandler(index)}
                    ></img>
                  </div>
                </div>
                <div className={styles.delBtnSection}>
                  <button
                    className={styles.deleteIcon}
                    onClick={() => removePlaceHandler(index)}
                  >
                    X
                  </button>
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

export default TravelList;
