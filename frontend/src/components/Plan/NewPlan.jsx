import { useEffect, useState } from "react";
import Modal from 'react-modal';
import CreateMap from "./CreateMap";
import TravelList from "./TravelList";
import styles from "./NewPlan.module.css";
import PlanNavbar from "./PlanNavbar";
import logo from "../../assets/icon.svg";
import { useNavigate } from "react-router-dom";

const NewPlan = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [planName, setPlanName] = useState("Test");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [modalOpen, setModalOpen] = useState(true);
  const [modalStyle, setModalStyle] = useState("default");
  const navigate = useNavigate();

  const customModalStyles = {
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
      height: "540px",
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token : " + token);
    if(token) {
      setIsLoggedIn(true);
    }
    if(isLoggedIn === false){
      navigate('/Login');
    }
  }, []);



  const submitHandler = (event) =>{
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

    setModalOpen(false);
    console.log(startDate);
  }

  return (
    <div className={styles.main}>
      <Modal 
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customModalStyles}
      shouldCloseOnOverlayClick={false}
      >
        {modalStyle === "default" && 
          <>
            <img className={styles.logo} src={logo}></img>
            <p className={styles.modalText1}>당신의 여행을 계획하세요</p>
            <form onSubmit={submitHandler}> 
              <div><input className={styles.modalPlanName} type="text"  required></input></div>
              <p>여행 기간</p>
              <div><input name="startDate" type="date"  required></input>
              <input name="endDate" type="date"  required></input></div>
    
              <button type="submit">Continue</button>
            </form>
          </>
        }
        {modalStyle === "save" && 
          <>
            <img className={styles.logo} src={logo}></img>
            <p className={styles.modalText1}>save</p>
            <form onSubmit={submitHandler}> 
              <div><input className={styles.modalPlanName} type="text"  required></input></div>
              <p>여행 기간</p>
              <div><input name="startDate" type="date"  required></input>
              <input name="endDate" type="date"  required></input></div>
    
              <button type="submit">Continue</button>
            </form>
          </>
        }
        

      </Modal>

      <PlanNavbar planName={planName} startDate={startDate} endDate={endDate} setModalOpen={setModalOpen} modalStyle={modalStyle} setModalStyle={setModalStyle}/>
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
