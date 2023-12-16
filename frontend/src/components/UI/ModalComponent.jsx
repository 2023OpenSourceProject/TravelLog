import Modal from "react-modal";
import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { ko } from "date-fns/esm/locale";
import styles from "./ModalComponent.module.css";
import "react-datepicker/dist/react-datepicker.css";

import logo from "../../assets/icon.svg";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  setPlanName,
  setStartDate,
  setEndDate,
  setDateDiff,
  setNewPlan,
  setSelectedDay,
  dateDiff
}) => {
  const [modalStartDate, setModalStartDate] = useState(new Date());
  const [modalEndDate, setModalEndDate] = useState(addDays(new Date(), 1));

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className={styles.exampleCustomInput} onClick={onClick} ref={ref}>
      {value}
    </div>
  ));

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
      display: "flex",
      width: "920px",
      height: "520px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "50px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
      textAlign: "center",
    },
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getDiff = (Start, End) => {
    const startDate = new Date(Start);
    const endDate = new Date(End);

    const diff = endDate.getTime() - startDate.getTime();

    return Math.abs(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(event);

    let diff = getDiff(modalStartDate, modalEndDate);
    let endDate = modalEndDate;

    if(diff > 10) {
      endDate = addDays(modalStartDate, 9);
      diff = 10;
      setModalEndDate(endDate);
    }

    const planInfo = {
      name: event.target[0].value,
      start: modalStartDate,
      end: endDate,
    };
    console.log(planInfo.start);

    setPlanName(planInfo.name);
    setStartDate(formatDate(planInfo.start));
    setEndDate(formatDate(planInfo.end));
    console.log(diff);
    setDateDiff(diff);

    setNewPlan((prevPlan) => {
      const newPlanDetail = prevPlan.plan_details.filter(
        (item) => item.day <= diff
      );
      return {
        ...prevPlan,
        title: planInfo.name,
        start_date: formatDate(planInfo.start),
        end_date: formatDate(planInfo.end),
        plan_details: newPlanDetail,
      };
    });
    setModalOpen(false);
    setSelectedDay(1);
    console.log(dateDiff);
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={editModalStyles}
      shouldCloseOnOverlayClick={false}
    >
      <div className={styles.modalContents}>
        <div>
          <img className={styles.logo} src={logo}></img>
          <p className={styles.modalText1}>당신의 여행을 계획하세요</p>
          <form onSubmit={submitHandler}>
            <div className={styles.inputName}>
              <input className={styles.modalPlanName} type="text" required />
              <label className={styles.nameLabel}>Plan Name</label>
              <span className={styles.nameSpan}></span>
            </div>
            <div className={styles.dateSection}>
              <DatePicker
                selected={modalStartDate}
                onChange={(date) => setModalStartDate(date)}
                selectsStart
                startDate={modalStartDate}
                endDate={modalEndDate}
                locale={ko}
                dateFormat="yyyy-MM-dd"
                zIndex="999"
                customInput={<ExampleCustomInput />}
              />
              <p style={{marginLeft:"20px", marginRight:"20px", fontWeight:"bold"}}>-</p>
              <DatePicker
                selected={modalEndDate}
                onChange={(date) => setModalEndDate(date)}
                selectsEnd
                startDate={modalStartDate}
                endDate={modalEndDate}
                minDate={modalStartDate}
                locale={ko}
                dateFormat="yyyy-MM-dd"
                customInput={<ExampleCustomInput />}
              />
            </div>
            <button type="submit" className={styles.btn}>
              Continue
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
