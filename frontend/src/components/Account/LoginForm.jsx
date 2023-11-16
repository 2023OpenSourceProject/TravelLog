import React from "react";
import accountImage from "../../assets/image/accountImage.png";
import { Link, useNavigate } from "react-router-dom";
import "./AccountForm.css";
import axios from "axios";

import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [inputEmali, setInputEmail] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const navigate = useNavigate();
  const params = new URLSearchParams();

  function emailChangeHandler(event) {
    setInputEmail(event.target.value);
  }

  function pwdChangeHandler(event) {
    setInputPwd(event.target.value);
  }

  let navigate = useNavigate();
  const params = new URLSearchParams();

  function submitHandler(event) {
    event.preventDefault();
    const loginData = {
      email: inputEmali,
      password: inputPwd,
    };
    console.log(loginData);

    Object.keys(loginData).forEach((key) =>
      params.append(key, loginData[key])
    );
    axios
      .post("https://api.travellog.site:8080/login", loginData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "*/*",
        },
      })
      .then((response) => {
        // 상태 코드가 200이 아닌 경우에도 성공 메시지를 표시하고 페이지를 이동시킵니다.
        alert("로그인에 성공했습니다.");
        navigate("/");
      })
      .catch((error) => {
        // 오류가 발생한 경우 오류 메시지를 표시합니다.
        alert("로그인에 실패했습니다.");
      });

  }

  return (
    <div className="flex">
      <div className="blank">
        <Link to="/">
          <button>Travel log</button>
        </Link>

        <h1 className="head">로그인</h1>
        <p>아직 회원이 아니신가요?</p>
        <Link to="/account/register">
          <p className="link">회원가입</p>
        </Link>
        <form onSubmit={submitHandler}>

          <p className="blank">
            <p>Email</p>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              onChange={emailChangeHandler}
            ></input>
          </p>

          <p className="blank">
            <p>Password</p>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              required
              onChange={pwdChangeHandler}
            ></input>
          </p>

          <Link to="/account/findpwd">
            <p className="link">비밀번호를 잊으셨나요?</p>
          </Link>

          <button className="button">로그인</button>
        </form>
        <Link to="/account/findpwd">
          <p className="link">비밀번호를 잊으셨나요?</p>
        </Link>

      </div>

      <img className="blank" src={accountImage} />
    </div>
  );
};

export default LoginForm;