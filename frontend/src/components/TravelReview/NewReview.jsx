import React, { useEffect, useState } from "react";
import Navbar from "../UI/Navbar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./NewReview.module.css";
import locale from 'date-fns/locale/ko';

const NewReview = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [planList, setPlanList] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [inputLocate, setLocate] = useState("");
  const [inputTitle, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(null);
  const [editorData, setEditorData] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/Login");
    }
  }, []);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setSelectedImageUrl(URL.createObjectURL(event.target.files[0])); // 이미지 URL 저장
    }
  };

  // plan 선택 핸들러
  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  function locateChangeHandler(event) {
    setLocate(event.target.value);
  }

  function titleChangeHandler(event) {
    setTitle(event.target.value);
  }

  const handleIsPublicChange = (e) => {
    setIsPublic(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://api.travellog.site:8080/user/myplan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPlanList(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

      (() => {
        window.addEventListener("beforeunload", preventClose);
      })();
      return () => {
        window.removeEventListener("beforeunload", preventClose);
      };
  }, []);
  
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  // 리뷰 등록 핸들러
  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("사진을 선택해주세요.");
      return;
    }
    if (!selectedPlan || selectedPlan === "") {
      alert("리뷰를 선택해주세요.");
      return;
    }
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
    const formData = new FormData();
    formData.append("img", selectedImage);
    formData.append("title", inputTitle);
    formData.append("planId", selectedPlan);
    formData.append("isPublic", isPublic);
    formData.append("content", editorData);
    formData.append("locate", inputLocate);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    const response = await axios.post(
      "https://api.travellog.site:8080/review",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 응답 처리
    if (response.status === 200) {
      alert("성공적으로 제출되었습니다.");
      navigate("/");
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
            <p className={styles.title}>Write Review</p>
            <input
              className={styles.input_title}
              type="text"
              name="title"
              placeholder="제목을 입력하세요"
              required
              maxLength={25}
              onChange={titleChangeHandler}
            ></input>
            <div>
              <CKEditor
                editor={ClassicEditor}
                onReady={(editor) => {
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditorData(data); // 에디터의 데이터를 상태 변수에 저장
                }}
                onBlur={(event, editor) => {
                }}
                onFocus={(event, editor) => {
                }}
              />
            </div>
          </div>
          <div>
            <br />
            <div>
              <div className={styles.index}>Photo</div>
              {selectedImage && (
                <img
                  src={selectedImageUrl}
                  alt="Selected"
                  style={{ width: "100%", height: "auto" }}
                />
              )}
              <label htmlFor="file" className={styles.select}>
                Select
              </label>
              <input
                className={styles.input_file}
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={onImageChange}
              />
            </div>

            <div className={styles.index}>Select Plan</div>
            <select className={styles.input} onChange={handlePlanChange}>
              <option value="">플랜을 선택하세요</option>
              {planList.map((plan) => (
                <option key={plan.plan_id} value={plan.plan_id}>
                  {plan.title}
                </option>
              ))}
            </select>
            <div className={styles.index}>Trip Place</div>
            <input className={styles.input}
              type="text"
              name="locate"
              placeholder="여행지를 입력해주세요"
              required
              onChange={locateChangeHandler}
            ></input>
            <div className={styles.index}>Public?</div>
            <select className={styles.input} onChange={handleIsPublicChange}>
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

export default NewReview;
