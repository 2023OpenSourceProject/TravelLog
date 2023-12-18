import React, { useState, useEffect } from "react";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import styles from "./ReviewList.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import noResultImage from "../../assets/image/noResult2.png";

const ReviewList = () => {
  const [reviewlist, setReviewList] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.travellog.site:8080/review", {})
      .then((response) => {
        setReviewList(response.data);
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
        {reviewlist.length > 0 ? (
          <div className={styles.container}>
            {[...reviewlist].reverse().map((review) => (
              <Link
                to={`/ReadReview/${review.reviewId}`}
                state={{ reviewId: review.reviewId }}
                key={review.reviewId}
                style={{ textDecoration: "none" }}
              >
                <div className={styles.review_box}>
                  <div className={styles.review}>
                    <img src={`${review.imgUrl}`} className={styles.image} />
                    <div className={styles.title_view_container}>
                      <p className={styles.review_title}>{review.title}</p>
                      <p className={styles.view_count}>Views: {review.view}</p>
                    </div>
                    <div className={styles.place_writer}>
                      <p>{review.locate}</p>
                      <p>{review.userName}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.notFoundSection}>
            <img src={noResultImage} />
            <div className={styles.no_review_message}>
              작성한 리뷰가 없습니다
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReviewList;
