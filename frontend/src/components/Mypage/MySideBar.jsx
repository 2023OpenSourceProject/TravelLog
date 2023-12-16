import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import styles from './MySideBar.module.css';

function MySideBar() {
    const menus = [
        { name: "나의 계획", path: "/MyPage/myplan" },
        { name: "나의 여행 리뷰", path: "/MyPage/myreview" },
        { name: "회원 정보 수정", path: "/MyPage/setting" },
    ];
    return (
        <div className={styles.side}>
            <hr className={styles.line}/>
            <br/>
            <div className={styles.menu}>
                {menus.map((menu, index) => {
                    let match = useMatch(menu.path);
                    return (
                        <NavLink
                            exact={true}
                            to={menu.path}
                            key={index}
                            className={match ? styles.activeLink : styles.link}
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