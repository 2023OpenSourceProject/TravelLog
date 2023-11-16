import React from "react";
import accountImage from "../../assets/image/accountImage.png";
import { Link, useNavigate } from "react-router-dom";
import "./AccountForm.css";
import axios from "axios";

import { useState } from "react";

const FindPwdForm = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputBirth, setInputBirth] = useState("");

  function emailChangeHandler(event) {
    setInputEmail(event.target.value);
  }

  function nameChangeHandler(event) {
    setInputName(event.target.value);
  }

  function birthChangeHandler(event) {
    setInputBirth(event.target.value);
  }

  let navigate = useNavigate();
  const params = new URLSearchParams();

  function submitHandler(event) {
    event.preventDefault();
    const pwdData = {
      email: inputEmail,
      name: inputName,
      birthday: inputBirth,
    };
    console.log(pwdData);
    Object.keys(pwdData).forEach((key) =>
      params.append(key, pwdData[key])
    );
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
    <div className="flex">
      <div className="blank">
        <Link to="/">
          <button>Travel log</button>
        </Link>
        <h1 className="head">비밀번호 찾기</h1>
        <p>계정이 없으신가요?</p>
        <Link to="/account/register">
          <p className="link">회원가입</p>
        </Link>
        <form onSubmit={submitHandler}>
          <p>Username</p>
          <input
            type="text"
            name="name"
            placeholder="Enter your User name"
            required
            onChange={nameChangeHandler}
          ></input>
          <p>Email</p>
          <input
            type="email"
            name="name"
            placeholder="Enter your email address"
            required
            onChange={emailChangeHandler}
          ></input>
          <p>Birth Day</p>
          <input
            type="date"
            name="birthday"
            placeholder="Enter your Birthday"
            required
            onChange={birthChangeHandler}
          ></input>
          <br />
          <button className="button">비밀번호 찾기</button>
        </form>
      </div>

      <img className="blank" src={accountImage} />
    </div>
  );
};

export default FindPwdForm;
