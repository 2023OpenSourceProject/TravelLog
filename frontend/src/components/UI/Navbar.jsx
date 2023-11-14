import React from "react";
import { Link } from 'react-router-dom';
import "./Navbar.css";


const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/"><div className="menu-icon"></div><div className="navbar-logo">Travel Log</div></Link>
          <ul className="nav-menu">
            <Link to="/NewPlan"><li className="nav-item">Plan</li></Link>
            <Link to="/WriteReview"><li className="nav-item">Write Review</li></Link>
            <li className="nav-item">Read Review</li>
            <li className="nav-item">My Page</li>
          </ul>
          <Link to="/account/login"><div className="nav-btn"><button className="navbar-button">Login</button></div></Link>

        </div>

      </nav>

    </>
  );
};

export default Navbar;
