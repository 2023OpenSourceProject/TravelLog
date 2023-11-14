import React from "react";
import image2 from "../../assets/image/accountImage.png";
import { Link } from "react-router-dom";
import "./AccountForm.css";

import { useState } from "react";

const FindPwdForm = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  function usernameChangeHandler(event) {
    setInputUsername(event.target.value);
  }

  function emailChangeHandler(event) {
    setInputEmail(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const pwdData = {
      username: inputUsername,
      email: inputEmail,
    };
    console.log(pwdData);
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
          <input type="text" placeholder="Enter your User name" required onChange={usernameChangeHandler}></input>
          <p>Email</p>
          <input type="text" placeholder="Enter your email address" required onChange={emailChangeHandler}></input>
          <br />
          <button className="button">비밀번호 찾기</button>
        </form>
      </div>

      <img className="blank" src={image2} />
    </div>
  );
};

export default FindPwdForm;
