import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./../../components/forms/Button";
import FormInput from "./../../components/forms/FormInput";
import { auth, signInWithGoogle } from "./../../firebase/utils";
import "./styles.scss";
import AuthWrapper from "../AuthWrapper";

const initialState = {
  email: "",
  password: "",
  errors: [],
};

const SignIn = (props) => {
  const [login, setLogin] = useState(initialState);
  const { email, password, errors } = login;

  function handleChange(e) {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault(); //prevent the page reloading when one pushes the signin with button...

    try {
      //Login user with signInWithEmailAndPassword function from the firebase auth library
      await auth.signInWithEmailAndPassword(email, password);

      //once user is Loged in, rest to the initial state
      setLogin({ ...initialState });
    } catch (error) {
      console.log("Errors" + error);
    }
  }

  const configAuthWrapper = {
    headline: "Login",
  };
  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="fromWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="email"
            handleChange={handleChange}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={handleChange}
          />
          <Button type="submit">Login</Button>
          <div className="socialSignin">
            <div className="row">
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
            <div className="links">
              <Link to="/recovery">Reset Password</Link>
            </div>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
