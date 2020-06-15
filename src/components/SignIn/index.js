import React from "react";
import Button from "./../../components/forms/Button";

import "./styles.scss";

const SignIn = (props) => {
  return (
    <div className="signin">
      <div className="wrap">
        <h2>Login</h2>
        <div className="fromWrap">
          <form>
            <div className="socialSignin">
              <div className="row">
                <Button>Sign in with Google</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
