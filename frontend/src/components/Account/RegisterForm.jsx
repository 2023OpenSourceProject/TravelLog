import React from "react";
import image2 from "../../assets/image/accountImage2.png";
import logo from "../../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AccountForm.module.css";
import axios from "axios";

import { useState } from "react";

const RegisterForm = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputBirthday, setBirthday] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");

  function emailChangeHandler(event) {
    setInputEmail(event.target.value);
  }

  function usernameChangeHandler(event) {
    setInputUsername(event.target.value);
  }

  function pwdChangeHandler(event) {
    setInputPwd(event.target.value);
  }

  function pwdCheckHandler(event) {
    setCheckPwd(event.target.value);
  }

  function birthdayChangeHandler(event) {
    setBirthday(event.target.value);
  }

  let navigate = useNavigate();
  const params = new URLSearchParams();

  function submitHandler(event) {
    event.preventDefault();
    if (inputPwd !== checkPwd) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    const registerData = {
      email: inputEmail,
      name: inputUsername,
      birthday: inputBirthday,
      password: inputPwd,
      check: checkPwd,
    };
    console.log(registerData);
    Object.keys(registerData).forEach((key) =>
      params.append(key, registerData[key])
    );
    axios
      .post("https://api.travellog.site:8080/user", registerData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "*/*",
        },
      })
      .then((response) => {
        // 상태 코드가 200이 아닌 경우에도 성공 메시지를 표시하고 페이지를 이동시킵니다.
        alert("회원가입에 성공했습니다.");
        navigate("/Login");
      })
      .catch((error) => {
        // 오류가 발생한 경우 오류 메시지를 표시합니다.
        alert("회원가입에 실패했습니다.");
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
          <div className={styles.registerform}>
            <h1 className={`${styles.head} ${styles.miniform}`}>회원가입</h1>

            <div className={styles.miniform}>
              <p>이미 계정이 있으신가요?</p>
              <Link to="/Login">
                <p className={styles.link}>로그인</p>
              </Link>
            </div>

            <form onSubmit={submitHandler}>
              <div className={styles.miniform}>
                <p className={styles.index}>Email</p>
                <input className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  onChange={emailChangeHandler}
                />
              </div>

              <div className={styles.miniform}>
                <p className={styles.index}>Username</p>
                <input className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Enter your User name"
                  required
                  onChange={usernameChangeHandler}
                />
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

              <div className={styles.miniform}>
                <p className={styles.index}>Password</p>
                <input className={styles.input}
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  required
                  onChange={pwdChangeHandler}
                />
              </div>

              <div className={styles.miniform}>
                <p className={styles.index}>Confirm Password</p>
                <input className={styles.input}
                  type="password"
                  placeholder="Confirm your Password"
                  required
                  onChange={pwdCheckHandler}
                />
              </div>

              <input
                type="submit"
                className={`${styles.button} ${styles.miniform}`}
                value="회원가입"
              />
            </form>
          </div>
        </div>

        <img className={styles.image} src={image2} />
      </div>
    </div>
  );
};

export default RegisterForm;
