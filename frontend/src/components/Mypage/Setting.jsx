import React, { useState, useEffect } from "react";
import styles from "./Setting.module.css";
import axios from "axios";
import accountCircie from "../../assets/account_circle.svg";

const Setting = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const params = new URLSearchParams();

  const token = localStorage.getItem("token");
  
  const [myInfo, setMyInfo] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.travellog.site:8080/user/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMyInfo(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const changeData = {};
    if (password) changeData.password = password;
    if (name) changeData.name = name;
    if (birthday) changeData.birthday = birthday;

    Object.keys(changeData).forEach((key) =>
      params.append(key, changeData[key])
    );
    console.log(changeData);
    axios
      .post("https://api.travellog.site:8080/user/change", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("회원정보 수정에 성공했습니다.");
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        alert("회원정보 수정에 실패했습니다.");
      });
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={accountCircie}></img>
          <p className={styles.name}>{myInfo.name}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className={styles.form}>
            이름
            <br />
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
          </label>
          <label className={styles.form}>
            비밀번호
            <br />
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
          </label>
          <label className={styles.form}>
            생년월일
            <br />
            <input
              className={styles.input}
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <br />
          </label>
          <input className={styles.button} type="submit" value="저장" />
        </form>
      </div>
    </div>
  );
};

export default Setting;
