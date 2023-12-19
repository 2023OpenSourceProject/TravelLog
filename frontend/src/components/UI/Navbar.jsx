import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icon.svg";
import "./Navbar.css";

const Navbar = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    props.setIsLoggedIn(false);
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="navbar-logo">
            <img className="logo" src={logo}></img>
            Travel Log
          </div>
        </Link>
        <ul className="nav-menu">
          <div></div>
          {isLoggedIn ? (
            <Link to="/NewPlan" style={{ textDecoration: "none" }}>
              <div className="item-btn2">
                <li className="nav-item">Plan</li>
              </div>
            </Link>
          ) : (
            <Link to="/Login" style={{ textDecoration: "none" }}>
              <div className="item-btn2">
                <li className="nav-item">Plan</li>
              </div>
            </Link>
          )}

          {isLoggedIn ? (
            <Link
              to="/WriteReview"
              style={{ textDecoration: "none" }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="item-btn">
                <li className="nav-item">Write Review</li>
              </div>
            </Link>
          ) : (
            <Link to="/Login" style={{ textDecoration: "none" }}>
              <div className="item-btn">
                <li className="nav-item">Write Review</li>
              </div>
            </Link>
          )}

          <Link
            to="/ReviewList"
            style={{ textDecoration: "none" }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="item-btn">
              <li className="nav-item">Read Review</li>
            </div>
          </Link>

          {isLoggedIn ? (
            <Link
              to="/MyPage/MyPlan"
              style={{ textDecoration: "none" }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="item-btn">
                <li className="nav-item">My Page</li>
              </div>
            </Link>
          ) : (
            <Link to="/Login" style={{ textDecoration: "none" }}>
              <div className="item-btn">
                <li className="nav-item">My Page</li>
              </div>
            </Link>
          )}
        </ul>
        {isLoggedIn ? (
          <Link to="/" style={{ textDecorationLine: "none" }}>
            <div className="nav-btn" onClick={logoutHandler}>
              <button className="navbar-button">Logout</button>
            </div>
          </Link>
        ) : (
          <Link to="/Login" style={{ textDecoration: "none" }}>
            <div className="nav-btn">
              <button className="navbar-button">Login</button>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
