import { useState } from "react";
import Modal from 'react-modal';
import CreateMap from "./CreateMap";
import TravelList from "./TravelList";
import styles from "./NewPlan.module.css";
import PlanNavbar from "./PlanNavbar";

const NewPlan = () => {
  const customModalStyles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "360px",
      height: "180px",
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

  const [modalOpen, setModalOpen] = useState(true);
  const btnClickHandler = () =>{
    setModalOpen(false);
  }

  return (
    <div className={styles.main}>
      <Modal 
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customModalStyles}
      ariaHideApp={false}
      contentLabel="Pop up Message"
      shouldCloseOnOverlayClick={false}
      >
        <p>환영합니다</p>
        <button onClick={btnClickHandler}>확인</button>
      </Modal>

      <PlanNavbar />
      <div className={styles.body}>
        <div>
          <TravelList />
        </div>
        <div>
          <CreateMap />
        </div>
      </div>
    </div>
  );
};

export default NewPlan;
