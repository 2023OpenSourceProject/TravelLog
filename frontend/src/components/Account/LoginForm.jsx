import React from "react";
import image2 from "../../assets/image/accountImage.png";
import { Link } from "react-router-dom";
import "./AccountForm.css";

import { useState } from "react";

const LoginForm = () => {
  const [inputEmali, setInputEmail] = useState("");
  const [inputPwd, setInputPwd] = useState("");

  function emailChangeHandler(event) {
    setInputEmail(event.target.value);
  }

  function pwdChangeHandler(event) {
    setInputPwd(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const loginData = {
      email: inputEmali,
      pwd: inputPwd,
    };
    console.log(loginData);
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
          <p>Email</p>
          <input
            type="text"
            placeholder="Enter your email address"
            required
            onChange={emailChangeHandler}
          ></input>
          <p>Password</p>
          <input
            type="text"
            placeholder="Enter your Password"
            required
            onChange={pwdChangeHandler}
          ></input>
          <br />
          <Link to="/account/findpwd">
            <p className="link">비밀번호를 잊으셨나요?</p>
          </Link>
          <button className="button">로그인</button>
        </form>
      </div>

      <img className="blank" src={image2} />
    </div>
  );
};

export default LoginForm;
