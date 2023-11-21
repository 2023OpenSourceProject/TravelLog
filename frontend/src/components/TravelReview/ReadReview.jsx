import React, { useState, useEffect } from "react";
import styles from "./ReadReview.module.css";
import Navbar from "../UI/Navbar";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import arrowBack from "../../assets/arrow_back.svg";

const ReadReview = () => {
  const location = useLocation();
  const reviewId = location.state.reviewId;
  const [review, setReview] = useState([]);

  useEffect(() => {
    console.log(reviewId);
    axios
      .get(`https://api.travellog.site:8080/review/${reviewId}`, {})
      .then((response) => {
        setReview(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    console.log(review.content);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.header_box}>
            <Link to="/ReviewList">
              <img src={arrowBack} />
            </Link>
            <h1 className={styles.header}>Review</h1>
            <img className={styles.hidden_arrow} src={arrowBack} />
          </div>
          <h1 className={styles.title}>{review.title}</h1>
          <div className={styles.review_info}>
            <p className={styles.locate}>{review.locate} 여행</p>
            <p>{review.userName}</p>
          </div>
          <img className={styles.image} src={`${review.imgUrl}`} />
          <p className={styles.content}>{review.content}</p>
        </div>
      </div>
    </>
  );
};

export default ReadReview;
