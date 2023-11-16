import React from "react";
import image2 from "../../assets/image/accountImage.png";
import { Link, useNavigate } from "react-router-dom";
import "./AccountForm.css";

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

  function submitHandler(event) {
    event.preventDefault();
    const loginData = {
      email: inputEmali,
      password: inputPwd,
    };
    console.log(loginData);
    Object.keys(loginData).forEach(key => params.append(key, loginData[key]));
    axios.post("https://api.travellog.site:8080/login", loginData,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*'
      }
    })
        .then((response) => {
          if(response.status === 200){
            localStorage.setItem('token', response.data);
            alert("로그인에 성공했습니다.");
            navigate('/');
          } else {
            console.log(response);
          }
        })
        .catch((error) => {
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
          <p>Email</p>
          <input
              type="email" name="email"
            placeholder="Enter your email address"
            required
            onChange={emailChangeHandler}
          ></input>
          <p>Password</p>
          <input
              type="password" name="password"
            placeholder="Enter your Password"
            required
            onChange={pwdChangeHandler}
          ></input>
          <br />

          <button className="button">로그인</button>
        </form>
        <Link to="/account/findpwd">
          <p className="link">비밀번호를 잊으셨나요?</p>
        </Link>

      </div>

      <img className="blank" src={image2} />
    </div>
  );
};

export default LoginForm;
