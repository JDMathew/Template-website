import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./../../components/forms/Button";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import { signUpUserStart } from "../../redux/User/user.actions";

import "./styles.scss";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  userError: state.user.userError,
});

const SignUp = () => {
  const [signUp, setSignUp] = useState(initialState);
  const { displayName, email, password, confirmPassword, errors } = signUp;
  const { currentUser, userError } = useSelector((state) => ({
    currentUser: state.user.currentUser,
    userError: state.user.userError,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setSignUp({ ...initialState });
    }
    return () => {
      //cleanup;
    };
  }, [currentUser]);
  useEffect(() => {
    if (Array.isArray(userError) && userError.length > 0) {
      setSignUp({ ...signUp, errors: userError });
    }
    return () => {
      //cleanup
    };
  }, [userError]);

  async function handleSubmit(e) {
    e.preventDefault(); //prevent the page reloading when one pushes the Register with button...

    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword,
        errors,
      }) /// try write this by destructuring state. i.e {...signUp}
    );
  }

  //update the FormInput field with what is typed into it
  function handleChange(e) {
    const { name, value } = e.target;
    setSignUp({ ...signUp, [name]: value });
  }

  const configAuthWrapper = {
    headline: "SignUp",
  };
  return (
    <AuthWrapper {...configAuthWrapper}>
      {errors.length > 0 && (
        <ul>
          {errors.map((err, index) => {
            return <li key={index}>{err}</li>;
          })}
        </ul>
      )}
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
            handleChange={handleChange}
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="example@domain.com"
            handleChange={handleChange}
          />

          <FormInput
            type="password" //type of password prevents you from seeing what you typed into the forminput
            name="password"
            value={password}
            placeholder="Password"
            handleChange={handleChange}
          />

          <FormInput
            type="password" //type of password prevents you from seeing what you typed into the forminput
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={handleChange}
          />

          <div className="row">
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
