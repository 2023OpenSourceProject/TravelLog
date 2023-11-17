import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/icon.svg';
import "./Navbar.css";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" style={{ textDecoration: "none"}}><div className="navbar-logo"><img className="logo" src={logo}></img>Travel Log</div></Link>
        <ul className="nav-menu">


          {isLoggedIn ? (
              <Link to="/NewPlan" style={{ textDecoration: "none"}}><li className="nav-item">Plan</li></Link>
          ) : (
              <Link to="/Login" style={{ textDecoration: "none"}}><li className="nav-item">Plan</li></Link>
          )}

          {isLoggedIn ? (
              <Link to="/WriteReview" style={{ textDecoration: "none"}}><li className="nav-item">Write Review</li></Link>
          ) : (
              <Link to="/Login" style={{ textDecoration: "none"}}><li className="nav-item">Write Review</li></Link>
          )}

          <Link to="/ReviewList" style={{ textDecoration: "none"}}><li className="nav-item">Read Review</li></Link>

          {isLoggedIn ? (
              <Link to="/MyPage" style={{ textDecoration: "none"}}><li className="nav-item">My Page</li></Link>
          ) : (
              <Link to="/Login" style={{ textDecoration: "none"}}><li className="nav-item">My Page</li></Link>
          )}

        </ul>
        {isLoggedIn ? (
            <Link to="/" style={{textDecorationLine: "none"}}>
              <div className="nav-btn" onClick={logoutHandler}>
                <button className="navbar-button">Logout</button>
              </div>
            </Link>

        ) : (
            <Link to="/Login" style={{ textDecoration: "none"}}>
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
