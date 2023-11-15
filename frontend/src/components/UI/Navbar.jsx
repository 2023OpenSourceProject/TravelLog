import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/icon.svg';
import "./Navbar.css";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" style={{ textDecoration: "none"}}><div className="navbar-logo"><img className="logo" src={logo}></img>Travel Log</div></Link>
        <ul className="nav-menu">
          <Link to="/NewPlan" style={{ textDecoration: "none"}}><li className="nav-item">Plan</li></Link>
          <Link to="/WriteReview" style={{ textDecoration: "none"}}><li className="nav-item">Write Review</li></Link>
          <Link to="/ReadReview" style={{ textDecoration: "none"}}><li className="nav-item">Read Review</li></Link>
          <Link to="/MyPage" style={{ textDecoration: "none"}}><li className="nav-item">My Page</li></Link>
        </ul>
        <Link to="/account/login" style={{ textDecoration: "none"}}><div className="nav-btn">{<button className="navbar-button">Login</button>}</div></Link> 
       
        
      </div>
    </nav>
  );
};

export default Navbar;
