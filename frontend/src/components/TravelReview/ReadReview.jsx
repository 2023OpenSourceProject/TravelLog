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
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");

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

    axios
        .get(`https://api.travellog.site:8080/comment/${reviewId}`, {})
        .then((response) => {
          setComment(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    console.log(comment.content);
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
        .post(`https://api.travellog.site:8080/comment/${reviewId}`, null, {
          params: { content: newComment },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setNewComment(""); // 댓글 입력란 초기화
          // 댓글 추가 후 댓글 리스트 다시 불러오기
          axios
              .get(`https://api.travellog.site:8080/comment/${reviewId}`)
              .then((response) => {
                setComment(response.data);
              })
              .catch((error) => {
                console.error("There was an error!", error);
              });
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
  };



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
           <p className={styles.content} dangerouslySetInnerHTML={{ __html: review.content }}></p>
          <div className={styles.comments}>
            <h2 className={styles.commentsTitle}>댓글</h2>
            <form onSubmit={handleCommentSubmit} className={styles.newCommentForm}>
              <input
                  type="text"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요..."
                  className={styles.newCommentInput}
              />
              <button type="submit" className={styles.newCommentButton}>댓글 작성</button>
            </form>

            {comment.map((item) => (
                <div key={item.commentId} className={styles.comment}>
                  <p className={styles.commentContent}>{item.content}</p>
                  <p className={styles.commentDate}>{item.createdAt}</p>
                </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default ReadReview;
