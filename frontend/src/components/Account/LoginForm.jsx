import React from "react";
import image2 from "../../assets/image/accountImage.png";
import logo from "../../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AccountForm.module.css";
import axios from "axios";

import { useState } from "react";

const LoginForm = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const navigate = useNavigate();
  const params = new URLSearchParams();

  function emailChangeHandler(event) {
    setInputEmail(event.target.value);
  }

  function pwdChangeHandler(event) {
    setInputPwd(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const loginData = {
      email: inputEmail,
      password: inputPwd,
    };
    console.log(loginData);
    Object.keys(loginData).forEach((key) => params.append(key, loginData[key]));
    console.log(loginData);
    axios
      .post("https://api.travellog.site:8080/login", loginData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "*/*",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data);
          alert("로그인에 성공했습니다.");
          navigate("/");
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        alert("로그인에 실패했습니다.");
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
          <div className={styles.loginform}>
            <h1 className={`${styles.head} ${styles.miniform}`}>로그인</h1>

            <div className={styles.miniform}>
              <p>아직 회원이 아니신가요?</p>
              <Link to="/Register">
                <p className="link">회원가입</p>
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
                ></input>
              </div>

              <div className={styles.miniform}>
                <p className={styles.index}>Password</p>
                <input className={styles.input}
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  required
                  onChange={pwdChangeHandler}
                ></input>
              </div>

              <input
                type="submit"
                className={`${styles.button} ${styles.miniform}`}
                value="로그인"
              />
            </form>
            <Link to="/Findpwd">
              <p className={styles.link} style={{ textAlign: "right" }}>
                비밀번호를 잊으셨나요?
              </p>
            </Link>
          </div>
        </div>

        <img className={styles.image} src={image2} />
      </div>
    </div>
  );
};

export default LoginForm;
