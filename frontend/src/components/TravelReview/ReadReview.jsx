import React, { useState, useEffect } from "react";
import styles from "./ReadReview.module.css";
import Navbar from "../UI/Navbar";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import arrowBack from "../../assets/arrow_back.svg";

const ReadReview = () => {
  const location = useLocation();
  const reviewId = location.state.reviewId;
  const [planId, SetPlanId] = useState();
  const [plan, setPlan] = useState({});
  const [review, setReview] = useState([]);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const date = new Date(review.createdAt);
  const createdDate = {
    year: date.getFullYear(),
    month: (date.getMonth() + 1).toString().padStart(2, "0"),
    day: date.getDate().toString().padStart(2, "0"),
  };
  const formattedDate = `${createdDate.year}-${createdDate.month}-${createdDate.day}`;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(reviewId);
    const token = localStorage.getItem("token");
    axios
      .get(`https://api.travellog.site:8080/review/${reviewId}`, {})
      .then((response) => {
        setReview(response.data);
        axios
          .get(`https://api.travellog.site:8080/plan/${response.data.planId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((responses) => {
            setPlan(responses.data);

          })
          .catch((error) => {
            console.log("Error!", error);
          });
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

  const handleDeleteComment = (commentId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://api.travellog.site:8080/comment/delete/${commentId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        // 댓글 삭제 후 댓글 리스트를 다시 가져옵니다.
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

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    axios
      .post(`https://api.travellog.site:8080/review/delete/${reviewId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("리뷰가 정상적으로 삭제되었습니다!");
        navigate("/ReviewList");
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
          <div className={styles.review_info}>
            <p>{formattedDate}</p>
            <p>view : {review.view}</p>
          </div>

          <div className={styles.buttons}>
            <Link
              to={`/EditReview/${review.reviewId}`}
              state={{ reviewId: review.reviewId }}
              key={review.reviewId}
              style={{ textDecoration: "none" }}
            >
              <button className={styles.editButton}>리뷰 수정</button>
            </Link>
            <button className={styles.deleteButton2} onClick={handleDelete}>
              리뷰 삭제
            </button>
          </div>

          {/* 내가 만든 계획 일정 출력해주는 부분 */}
          <div className={styles.planDetailSection}>
            {plan.plan_id}
          </div>

          {/* 사용자가 설정한 이미지 출력 */}
          <img className={styles.image} src={`${review.imgUrl}`} />
          <p
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: review.content }}
          ></p>
          <div className={styles.comments}>
            <h2 className={styles.commentsTitle}>댓글</h2>
            <form
              onSubmit={handleCommentSubmit}
              className={styles.newCommentForm}
            >
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
                className={styles.newCommentInput}
              />
              <button type="submit" className={styles.newCommentButton}>
                댓글 작성
              </button>
            </form>

            {comment.map((item) => (
              <div key={item.commentId} className={styles.comment}>
                <p className={styles.commentContent}>{item.content}</p>
                <div className={styles.commentMeta}>
                  <p className={styles.commentDate}>{item.createdAt}</p>
                  <p className={styles.commentUserName}>{item.userName}</p>
                </div>
                <button
                  onClick={() => handleDeleteComment(item.commentId)}
                  className={styles.deleteButton}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadReview;
