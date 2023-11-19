import Modal from "react-modal";
import {useState} from "react"
import { DateRange, DateRangePicker } from 'react-date-range';
import {addDays} from 'date-fns';

import locale from 'date-fns/locale/ko';
import styles from "./ModalComponent.module.css";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import logo from "../../assets/icon.svg";
const ModalComponent = ({
  modalOpen,
  modalStyle,
  setModalOpen,
  setPlanName,
  setStartDate,
  setEndDate,
  setDateDiff,
}) => {

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    }
  ])

  const editModalStyles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.6)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "1080px",
      height: "660px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
      textAlign: "center",
    },
  };

  const saveModalStyles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.6)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "720px",
      height: "480px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
      textAlign: "center",
    },
  };

  const getDiff = (Start, End) => {
    const startDate = new Date(Start);
    const endDate = new Date(End);

    const diff = endDate.getTime() - startDate.getTime();

    return Math.abs(diff / (1000 * 60 * 60 * 24)) + 1;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const planInfo = {
      name: event.target[0].value,
      start: event.target[1].value,
      end: event.target[2].value,
    };
    console.log(planInfo.start);

    setPlanName(planInfo.name);
    setStartDate(planInfo.start);
    setEndDate(planInfo.end);
    
    const diff = getDiff(planInfo.start, planInfo.end);
    setDateDiff(diff);
    setModalOpen(false);
    console.log(diff);
  };
  const saveHandler = () =>{
    
  }
  

  if (modalStyle === "Edit") {
    return (
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={editModalStyles}
        shouldCloseOnOverlayClick={false}
      >
        <>
          <img className={styles.logo} src={logo}></img>
          <p className={styles.modalText1}>당신의 여행을 계획하세요</p>
          <form onSubmit={submitHandler}>
            <div className={styles.inputName}>
              <input
                className={styles.modalPlanName}
                type="text"
                required
              /><label className={styles.nameLabel}>Name</label><span className={styles.nameSpan}></span>
            </div>
            <p>여행 기간</p>
            <div>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                direction="horizontal"
                locale={locale}
                dateDisplayFormat="yyyy-MM-dd"
              />
            </div>

            <button type="submit" className={styles.btn}>Continue</button>
          </form>
        </>
      </Modal>
    );
  } else if (modalStyle === "Save") {
    return (
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={saveModalStyles}
        shouldCloseOnOverlayClick={true}
      >
        <>
          <img className={styles.logo} src={logo}></img>
          <p className={styles.modalText1}>저장하시겠습니까?</p>
          <form onSubmit={saveHandler}>

            <button >Continue</button>
          </form>
        </>
      </Modal>
    );
  }
};

export default ModalComponent;
