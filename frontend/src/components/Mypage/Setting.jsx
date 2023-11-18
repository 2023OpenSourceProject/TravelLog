import React, { useState } from "react";
import axios from "axios";

const Setting = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const params = new URLSearchParams();



    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');


        const changeData = {};
        if (password) changeData.password = password;
        if (name) changeData.name = name;
        if (birthday) changeData.birthday = birthday;


        Object.keys(changeData).forEach(key => params.append(key, changeData[key]));
        console.log(changeData)
        axios.post("https://api.travellog.site:8080/user/change", params,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*',
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if(response.status === 200){
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
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    이름:
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label>
                    비밀번호:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    생년월일:
                    <input
                        type="date"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Setting;
