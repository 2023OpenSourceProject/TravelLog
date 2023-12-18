import React, {useState, useEffect} from "react";
import Navbar from "../UI/Navbar.jsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import MySideBar from "./MySideBar.jsx";
import MyPlan from "./MyPlanList.jsx";
import MyReview from "./MyReviewList.jsx";
import Setting from "./Setting.jsx";

const Mypage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
          setIsLoggedIn(true);
        }
        else{
          navigate('/Login');
        }

      }, []);

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex', height: '90vh'}}>
                <MySideBar />
                <div style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<MyPlan />} />
                        <Route path="MyPlan" element={<MyPlan />} />
                        <Route path="MyReview" element={<MyReview />} />
                        <Route path="Setting" element={<Setting />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default Mypage;
