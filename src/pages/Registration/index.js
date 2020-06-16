import React, { Component } from "react";
import SignUp from "../../components/SignUp";

import "./styles.scss";

class Registration extends Component {
  render() {
    return (
      <div className="Registration">
        <h1>Registration page</h1>
        <SignUp />
      </div>
    );
  }
}

export default Registration;
