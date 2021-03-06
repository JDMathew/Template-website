import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "./../../components/forms/Button";
import FormInput from "./../../components/forms/FormInput";
import {
  emailSignInStart,
  googleSignInStart,
} from "./../../redux/User/user.actions";

import "./styles.scss";
import AuthWrapper from "../AuthWrapper";

const initialState = {
  email: "",
  password: "",
  errors: [],
};

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(initialState);
  const { email, password, errors } = login;

  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    if (currentUser) {
      //once user is Loged in, rest to the initial state
      setLogin({ ...initialState });
    }
    return () => {};
  }, [currentUser]);

  function handleChange(e) {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault(); //prevent the page reloading when one pushes the signin with button...
    //Disbatch action
    dispatch(emailSignInStart(login)); // could also dispatch(signInUser({email,password}))
  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

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
              <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
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
