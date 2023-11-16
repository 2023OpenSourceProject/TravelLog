import React, {useEffect} from "react";
import Navbar from "../UI/Navbar";
import {Link} from "react-router-dom";

const ReviewList = () => {
    return (
        <>
            <Navbar />
            <div>리뷰 리스트 보는 곳</div>
            <Link to="/ReadReview" style={{ textDecoration: "none"}}><li className="nav-item">Read Review</li></Link>
        </>
    );
};

export default ReviewList;
