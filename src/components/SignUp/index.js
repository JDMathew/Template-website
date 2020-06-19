import React, { useState } from "react";
import Button from "./../../components/forms/Button";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";

import { auth, handleUserProfile } from "./../../firebase/utils";

import "./styles.scss";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

const SignUp = (props) => {
  const [signUp, setSignUp] = useState(initialState);
  const { displayName, email, password, confirmPassword, errors } = signUp;

  async function handleSubmit(e) {
    e.preventDefault(); //prevent the page reloading when one pushes the Register with button...

    if (password !== confirmPassword) {
      const err = ["Passwords Don't match"];
      setSignUp({ ...signUp, errors: err });
    }

    try {
      //call the createUserWithEmailAndPassword function from the firebase auth library and destrucuture the response into a user variable. i.e get the user object from the backend
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("user" + user);
      //create the user document using our handleuserProfile function
      await handleUserProfile(user, { displayName });

      //once user is signed up, restor the initial state
      setSignUp({ ...initialState });
    } catch (error) {
      console.log("Errors" + error);
    }
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
