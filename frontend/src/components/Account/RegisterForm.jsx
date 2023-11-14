import React from "react";
import image2 from "../../assets/image/accountImage.png";
import { Link } from "react-router-dom";
import "./AccountForm.css";

import { useState } from "react";

const RegisterForm = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputUsername, setInputUsername] = useState("");
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

  function submitHandler(event) {
    event.preventDefault();
    const registerData = {
      email: inputEmail,
      username: inputUsername,
      pwd: inputPwd,
      check: checkPwd,
    };
    console.log(registerData);
  }

  return (
    <div className="flex">
      <div className="blank">
        <Link to="/">
          <button>Travel log</button>
        </Link>
        <h1 className="head">회원가입</h1>
        <p>이미 계정이 있으신가요?</p>
        <Link to="/account/login">
          <p className="link">로그인</p>
        </Link>
        <form onSubmit={submitHandler}>
          <p>Email</p>
          <input type="text" placeholder="Enter your email address" required onChange={emailChangeHandler}></input>
          <p>Username</p>
          <input type="text" placeholder="Enter your User name" required onChange={usernameChangeHandler}></input>
          <p>Password</p>
          <input type="text" placeholder="Enter your Password" required onChange={pwdChangeHandler}></input>
          <p>Confirm Password</p>
          <input type="text" placeholder="Confirm your Password" required onChange={pwdCheckHandler}></input>
          <br />
          <button className="button">회원가입</button>
        </form>
      </div>

      <img className="blank" src={image2} />
    </div>
  );
};

export default RegisterForm;
