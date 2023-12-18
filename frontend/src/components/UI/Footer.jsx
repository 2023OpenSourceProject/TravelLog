import styles from "./Footer.module.css";
import logo from "../../assets/icon.svg";
import gitHubIcon from "../../assets/githubIcon.png";
const Footer = () => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <span>
            <img src={logo} alt="logo" className={styles.logo} />
            Travel Log
          </span>
          <a href="https://github.com/2023OpenSourceProject/project">
          <img className={styles.githubIcon} src={gitHubIcon} alt="" /></a>
        </div>
        <div className={styles.textSection}>
          <div className={styles.teamMember}>
            팀장 신현욱 | 팀원 김연신 | 팀원 박찬혁
          </div>
          <div className={styles.address}>
            (28644) 충북 청주시 서원구 충대로 1, 충북대학교 전자정보대학
            소프트웨어학부 S4-1동(전자정보 3관) 114호
          </div>

          <div className={styles.copyRight}>
            Copyright © SOFTWARE. All Rights Reserved.
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;
