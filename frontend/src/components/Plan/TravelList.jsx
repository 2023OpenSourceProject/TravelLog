import styles from './TravelList.module.css';
import icon2 from '../../assets/icon2.png';
import deleteIcon from '../../assets/deleteIcon.svg'

const TravelList = () => {
  return (
    <>
      <ul className={styles.travelList}>
        <li className={styles.travelPlace}><img className={styles.listIcon} src={icon2}></img>Test1<img className={styles.deleteIcon} src={deleteIcon}></img></li>
        <li className={styles.travelPlace}><img className={styles.listIcon} src={icon2}></img>Test2<img className={styles.deleteIcon} src={deleteIcon}></img></li>
        <li className={styles.travelPlace}><img className={styles.listIcon} src={icon2}></img>Test3<img className={styles.deleteIcon} src={deleteIcon}></img></li>

      </ul>
    </>
  );
}

export default TravelList;