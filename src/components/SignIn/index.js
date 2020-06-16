import React from "react";
import Button from "./../../components/forms/Button";
import { signInWithGoogle } from "./../../firebase/utils";

import "./styles.scss";

const SignIn = (props) => {
  function handleSubmit(e) {
    e.preventDefault(); //prevent the page reloading when one pushes the signin with button...
  }

  return (
    <div className="signin">
      <div className="wrap">
        <h2>Login</h2>
        <div className="fromWrap">
          <form onSubmit={handleSubmit}>
            <div className="socialSignin">
              <div className="row">
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
