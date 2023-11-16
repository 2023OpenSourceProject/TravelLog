import React from "react";
import image2 from "../../assets/image/accountImage.png";
import { Link ,useNavigate } from "react-router-dom";
import "./AccountForm.css";
import axios from 'axios';

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
    Object.keys(registerData).forEach(key => params.append(key, registerData[key]));
    axios.post("https://api.travellog.site:8080/user", registerData,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*'
      }
    })
        .then((response) => {
          // 상태 코드가 200이 아닌 경우에도 성공 메시지를 표시하고 페이지를 이동시킵니다.
          alert("회원가입에 성공했습니다.");
          navigate("/");
        }
        );

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
        <form  onSubmit={submitHandler}>
          <p>Email</p>
          <input type="email" name="email" placeholder="Enter your email address" required onChange={emailChangeHandler} />
          <p>Username</p>
          <input type="text" name="name" placeholder="Enter your User name" required onChange={usernameChangeHandler} />
          <p>Birth Day</p>
          <input type="date" name="birthday" required onChange={birthdayChangeHandler} />
          <p>Password</p>
          <input type="password" name="password" placeholder="Enter your Password" required onChange={pwdChangeHandler} />
          <p>Confirm Password</p>
          <input type="password" placeholder="Confirm your Password" required onChange={pwdCheckHandler} />
          <br />
          <input type="submit" className="button" value="회원가입" />
        </form>
      </div>

      <img className="blank" src={image2} />
    </div>
  );
};

export default RegisterForm;
