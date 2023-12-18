import React, { useEffect, useState } from "react";
import Navbar from "../UI/Navbar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "./NewReview.module.css";

const EditReview = () => {
  const location = useLocation();
  const reviewId = location.state.reviewId;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputLocate, setLocate] = useState("");
  const [inputTitle, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(null);
  const [editorData, setEditorData] = useState("");
  const [review, setReview] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/Login");
    }

    axios
        .get(`https://api.travellog.site:8080/review/${reviewId}`, {})
        .then((response) => {
          setReview(response.data);
          setTitle(response.data.title);
          setEditorData(response.data.content)
          setLocate(response.data.locate)
          setIsPublic(response.data.isPublic)
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

  }, []);


  function locateChangeHandler(event) {
    setLocate(event.target.value);
  }

  function titleChangeHandler(event) {
    setTitle(event.target.value);
  }

  const handleIsPublicChange = (e) => {
    setIsPublic(e.target.value);
  };


  // 리뷰 등록 핸들러
  const handleSubmit = async () => {
    if (!isPublic || isPublic === "") {
      alert("공개여부를 선택해주세요.");
      return;
    }

    //제목을 선택했는지 여부 확인
    if (!inputTitle || inputTitle === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    //위치를 선택했는지 여부 확인
    if (!inputLocate || inputLocate === "") {
      alert("여행지를 입력해주세요.");
      return;
    }

    const token = localStorage.getItem("token");


    const editedData = {
      title: inputTitle,
      content: editorData,
      locate: inputLocate,
      isPublic: isPublic
    };

    console.log(editedData);

    const response = await axios.post(
        `https://api.travellog.site:8080/review/update/${reviewId}`,
        editedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    );

    // 응답 처리
    if (response.status === 200) {
      alert("성공적으로 제출되었습니다.");
      navigate("/ReviewList");
    } else {
      alert("제출에 실패하였습니다.");
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.container}>
          <div>
            <p className={styles.title}>Edit Review</p>
            <input
              className={styles.input_title}
              type="text"
              name="title"
              placeholder="제목을 입력하세요"
              required
              maxLength={25}
              value={inputTitle}
              onChange={titleChangeHandler}
            ></input>
            <div>
              <CKEditor
                editor={ClassicEditor}
                onReady={(editor) => {
                  axios
                      .get(`https://api.travellog.site:8080/review/${reviewId}`, {})
                      .then((response) => {
                        editor.setData(response.data.content); // 내용 데이터를 에디터에 설정
                      })
                      .catch((error) => {
                        console.error("There was an error!", error);
                      });
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditorData(data); // 에디터의 데이터를 상태 변수에 저장
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </div>
          </div>
          <div>
            <br />

            <div className={styles.index}>Trip Place</div>
            <input className={styles.input}
              type="text"
              name="locate"
              placeholder="여행지를 입력해주세요"
                   value={inputLocate}
              required
              onChange={locateChangeHandler}
            ></input>
            <div className={styles.index}>Public?</div>
            <select className={styles.input} value={isPublic} onChange={handleIsPublicChange}>
              <option value="">공개여부를 선택해주세요</option>
              <option value="1">공개</option>
              <option value="0">비공개</option>
            </select>
            <br />
            <button className={styles.button_post} onClick={handleSubmit}>
              <div>Post</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditReview;
