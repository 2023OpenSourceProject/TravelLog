import React from "react";
import { NavLink } from "react-router-dom";
import styles from './MySideBar.module.css';

function MySideBar() {
    const menus = [
        { name: "나의 계획", path: "/MyPage/myplan" },
        { name: "나의 여행 리뷰", path: "/MyPage/myreview" },
        { name: "회원 정보 수정", path: "/MyPage/setting" },
    ];
    return (
        <div className={styles.side}>
            <h1 className={styles.title}>마이페이지</h1> {/* 타이틀 추가 */}
            <hr className={styles.line}/> {/* 밑줄 추가 */}
            <br/>
            <div className={styles.menu}>
                {menus.map((menu, index) => {
                    return (
                        <NavLink
                            exact={true}
                            style={{color: "gray", textDecoration: "none"}}
                            to={menu.path}
                            key={index}
                            activeStyle={{color: "black"}}
                        >
                            {menu.name}
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
}

export default MySideBar;