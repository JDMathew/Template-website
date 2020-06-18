import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "./../../components/forms/Button";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import { auth } from "./../../firebase/utils";

const initialState = {
  email: "",
  errors: [],
};

function EmailPassword(props) {
  const [emailPass, setEmailPass] = useState(initialState);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault(); //prevent the page reloading when one pushes the Register with button...
    const { email } = emailPass;

    const config = {
      url: "http://localhost:3000/login", // This is the retrun url given to firebase and it is the url we want to send the user once they have reset their password from the reset link they were emailed
    };

    try {
      console.log(" Email  " + email);
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          //What to do when the promis is successful
          history.push("/login"); //for class component this.props.history.push("/login"); and wrap your export in withRouter. ie.export default withRouter(EmailPassword); /
        })
        .catch((error) => {
          //What to do when the promis is fails
          const err = ["Email not found. Please try again"];
          console.log(" Errors from promis " + error);
          setEmailPass({ ...initialState, errors: err });
        });
      //once user reset password , restor the initial state
      //setEmailPass({ ...initialState });
    } catch (error) {
      //console.log("Errors" + error);
    }
  }

  //update the FormInput field with what is typed into it
  function handleChange(e) {
    const { name, value } = e.target;
    setEmailPass({ ...emailPass, [name]: value });
  }

  const { email, errors } = emailPass;

  const configAuthWrapper = {
    headline: " Reset Password",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="example@domain.com"
            handleChange={handleChange}
          />
          <div className="row">
            <Button type="submit">Reset</Button>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default EmailPassword; // withRouter gives us access to the history stored into react-router
