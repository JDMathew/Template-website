import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

import Logo from "./../../assets/logo/Logo.png";

const Header = (props) => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Art Over There logo" />
          </Link>
        </div>
        <div className="callToActions">
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
