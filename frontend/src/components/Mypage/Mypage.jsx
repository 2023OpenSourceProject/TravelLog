import React, {useState, useEffect} from "react";
import Navbar from "../UI/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("token : " + token);
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
            <div>마이페이지</div>
        </>
    );
};

export default Mypage;
