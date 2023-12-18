import React, { useState, useEffect } from "react";
import styles from "./MyReviewList.module.css";
import { Link } from "react-router-dom";
import noResultImage from "../../assets/image/noResult2.png";
import axios from "axios";

const MyReviewList = () => {
  const token = localStorage.getItem("token");
  const [myReviewlist, setMyReviewList] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.travellog.site:8080/user/myreview", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMyReviewList(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className={styles.body}>
      <p className={styles.title}>My Review</p>
      {myReviewlist.length > 0 ? (
        <div className={styles.container}>
          {[...myReviewlist].reverse().map((review) => (
          <Link
            to={`/MyReview/${review.reviewId}`}
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
          <img src={noResultImage}/>
          <div className={styles.no_review_message}>작성한 리뷰가 없습니다</div>
        </div>
      )}
    </div>
  );
};

export default MyReviewList;
