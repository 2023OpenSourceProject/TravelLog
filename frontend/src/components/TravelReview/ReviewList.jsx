import React, { useState, useEffect } from "react";
import Navbar from "../UI/Navbar";
import styles from "./ReviewList.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ReviewList = () => {
  const [reviewlist, setReviewList] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.travellog.site:8080/review", {})
      .then((response) => {
        setReviewList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <p className={styles.title}>Read Review</p>
        <div className={styles.container}>
          {[...reviewlist].reverse().map((review) => (
            <Link
              to={`/ReadReview/${review.reviewId}`}
              state={{ reviewId: review.reviewId }}
              key={review.reviewId}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.review}>
                <img src={`${review.imgUrl}`} className={styles.image} />
                <p className={styles.review_title}>{review.title}</p>
                <div className={styles.place_writer}>
                  <p>{review.locate}</p>
                  <p>{review.userName}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewList;
