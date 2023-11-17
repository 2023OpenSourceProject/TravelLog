import React, {useState, useEffect} from "react";
import Navbar from "../UI/Navbar.jsx";

const Mypage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
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

    return (
        <>
            <Navbar />
            <div>마이페이지</div>
        </>
    );
};

export default Mypage;
