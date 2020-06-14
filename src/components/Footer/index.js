import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="wrap">
        © Art Over There 2020
        <div className="footerLinks">
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
