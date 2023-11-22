import { useEffect, useState } from "react";
import ModalComponent from "../UI/ModalComponent";
import CreateMap from "./CreateMap";
import TravelList from "./TravelList";
import styles from "./NewPlan.module.css";
import PlanNavbar from "./PlanNavbar";
import { useNavigate } from "react-router-dom";

const NewPlan = () => {
  console.log(new Date());
  const [planName, setPlanName] = useState("Plan Name");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dateDiff, setDateDiff] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [modalOpen, setModalOpen] = useState(true);
  const [modalStyle, setModalStyle] = useState("Edit");
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token : " + token);
    if (!token) {
      navigate("/Login");
    } 

    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  return (
    <div className={styles.main}>
      <ModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalStyle={modalStyle}
        setPlanName={setPlanName}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setDateDiff={setDateDiff}
   
      />
      <PlanNavbar
        planName={planName}
        startDate={startDate}
        endDate={endDate}
        modalStyle={modalStyle}
        setModalStyle={setModalStyle}
        setModalOpen={setModalOpen}
        dateDiff={dateDiff}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}

      />
      <div className={styles.body}>
        <div>
          <TravelList selectedDay={selectedDay} />
        </div>
        <div>
          <CreateMap />
        </div>
      </div>
    </div>
  );
};

export default NewPlan;
