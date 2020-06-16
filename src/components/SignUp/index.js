import React, { useState } from "react";
import Button from "./../../components/forms/Button";
import FormInput from "../forms/FormInput";

//import { auth, handleUserProfile } from "./../../firebase/utils";

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

  function handleSubmit(e) {
    e.preventDefault(); //prevent the page reloading when one pushes the Register with button...
  }

  //update the FormInput field with what is typed into it
  function handleChange(e) {
    const { name, value } = e.target;
    setSignUp({ ...signUp, [name]: value });
  }

  const { displayName, email, password, confirmPassword, errors } = signUp;
  return (
    <div className="signUp">
      <div className="wrap">
        <h2>SignUp</h2>
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
              onChange={handleChange}
            />

            <FormInput
              type="text"
              name="email"
              value={email}
              placeholder="example@domain.com"
              onChange={handleChange}
            />

            <FormInput
              type="password" //type of password prevents you from seeing what you typed into the forminput
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleChange}
            />

            <FormInput
              type="password" //type of password prevents you from seeing what you typed into the forminput
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
            />

            <div className="row">
              <Button type="submit">Register</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
