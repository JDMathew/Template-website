import React, { useState } from "react";
import Button from "./../../components/forms/Button";
import FormInput from "./../../components/forms/FormInput";
import { auth, signInWithGoogle } from "./../../firebase/utils";
import "./styles.scss";

const initialState = {
  email: "",
  password: "",
  errors: [],
};

const SignIn = (props) => {
  const [login, setLogin] = useState(initialState);

  function handleChange(e) {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault(); //prevent the page reloading when one pushes the signin with button...
    const { email, password } = login;

    try {
      //Login user with signInWithEmailAndPassword function from the firebase auth library
      await auth.signInWithEmailAndPassword(email, password);

      //once user is Loged in, rest to the initial state
      setLogin({ ...initialState });
    } catch (error) {
      console.log("Errors" + error);
    }
  }
  const { email, password, errors } = login;
  return (
    <div className="signin">
      <div className="wrap">
        <h2>Login</h2>
        <div className="fromWrap">
          <form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="email"
              value={email}
              placeholder="email"
              onChange={handleChange}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleChange}
            />
            <Button type="submit">Login</Button>
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
