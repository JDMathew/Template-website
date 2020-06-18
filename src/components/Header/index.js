import React from "react";
import { connect } from "react-redux";
import "./styles.scss";
import { Link } from "react-router-dom";
import { auth } from "./../../firebase/utils";

import Logo from "./../../assets/logo/Logo.png";

const Header = (props) => {
  const { currentUser } = props;
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Art Over There logo" />
          </Link>
        </div>
        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">My Account</Link>
              </li>
              <li>
                <span
                  onClick={() => {
                    auth.signOut(); //tell Firebase to signOut user
                  }}
                >
                  Logout
                </span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>

              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = { currentUser: null };

//mapStateToProps is is passed to the connect redux function to return state as props into our header component
const mapStateToProps = (state) => ({
  //The root reducer contains our full state object
  currentUser: state.user.currentUser, // This provides our currentUser object. Rember user is the state user object from our root reducer.
});

export default connect(mapStateToProps, null)(Header);
