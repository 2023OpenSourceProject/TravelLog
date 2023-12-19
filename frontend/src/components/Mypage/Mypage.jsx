import React, {useState, useEffect} from "react";
import Navbar from "../UI/Navbar.jsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import MySideBar from "./MySideBar.jsx";
import MyPlanList from "./MyPlanList.jsx";
import MyReviewList from "./MyReviewList.jsx";
import Setting from "./Setting.jsx";
import Footer from "../UI/Footer.jsx";

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
                        <Route path="/" element={<MyPlanList />} />
                        <Route path="MyPlan" element={<MyPlanList />} />
                        <Route path="MyReview" element={<MyReviewList />} />
                        <Route path="Setting" element={<Setting />} />
                    </Routes>
                </div>
            </div>
            <Footer />  
        </>
    );
};

export default Mypage;
