import React from "react";
import image2 from "../../assets/image/accountImage2.png";
import logo from "../../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AccountForm.module.css";
import axios from "axios";

import { useState } from "react";

const FindPwdForm = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputBirthday, setBirthday] = useState("");

  function usernameChangeHandler(event) {
    setInputUsername(event.target.value);
  }

  function emailChangeHandler(event) {
    setInputEmail(event.target.value);
  }

  function birthdayChangeHandler(event) {
    setBirthday(event.target.value);
  }

  let navigate = useNavigate();
  const params = new URLSearchParams();

  function submitHandler(event) {
    event.preventDefault();
    const pwdData = {
      name: inputUsername,
      email: inputEmail,
      birthday: inputBirthday,
    };
    console.log(pwdData);
    Object.keys(pwdData).forEach((key) => params.append(key, pwdData[key]));
    axios
      .post("https://api.travellog.site:8080/user/reset", pwdData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "*/*",
        },
      })
      .then((response) => {
        // 상태 코드가 200이 아닌 경우에도 성공 메시지를 표시하고 페이지를 이동시킵니다.
        alert("비밀번호 찾기에 성공했습니다.");
        navigate("/");
      })
      .catch((error) => {
        // 오류가 발생한 경우 오류 메시지를 표시합니다.
        alert("비밀번호 찾기에 실패했습니다.");
      });
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.form}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className={styles.logo}>
              <img className={styles.icon} src={logo}></img>Travel Log
            </div>
          </Link>
          <div className={styles.findpwdform}>
            <h1 className={`${styles.head} ${styles.miniform}`}>
              비밀번호 찾기
            </h1>

            <div className={styles.miniform}>
              <p>계정이 없으신가요?</p>
              <Link to="/Register">
                <p className={styles.link}>회원가입</p>
              </Link>
            </div>

            <form onSubmit={submitHandler}>
              <div className={styles.miniform}>
                <p className={styles.index}>Username</p>
                <input className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Enter your User name"
                  required
                  onChange={usernameChangeHandler}
                ></input>
              </div>

              <div className={styles.miniform}>
                <p className={styles.index}>Email</p>
                <input className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  onChange={emailChangeHandler}
                ></input>
              </div>

              <div className={styles.miniform}>
                <p className={styles.index}>Birth Day</p>
                <input className={styles.input}
                  type="date"
                  name="birthday"
                  required
                  onChange={birthdayChangeHandler}
                />
              </div>

              <input
                type="submit"
                className={`${styles.button} ${styles.miniform}`}
                value="비밀번호 찾기"
              />
            </form>
          </div>
        </div>
        <img className={styles.image} src={image2} />
      </div>
    </div>
  );
};

export default FindPwdForm;
