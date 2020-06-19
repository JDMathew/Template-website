import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "./../../components/forms/Button";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import {
  resetPassword,
  resetAllAuthForms,
} from "./../../redux/User/user.actions";

const initialState = {
  email: "",
  errors: [],
};

const MapState = (state) => ({
  resetPasswordSuccess: state.user.resetPasswordSuccess,
  resetPasswordError: state.user.resetPasswordError,
});

function EmailPassword(props) {
  const [emailPass, setEmailPass] = useState(initialState);
  const history = useHistory();
  const dispatch = useDispatch();
  const { resetPasswordSuccess, resetPasswordError } = useSelector(MapState); //trystate => state.resetPasswordSuccess

  const { email, errors } = emailPass;

  function handleSubmit(e) {
    e.preventDefault(); //prevent the page reloading when one pushes the Register with button...
    dispatch(resetPassword({ email }));
  }

  useEffect(() => {
    if (resetPasswordSuccess) {
      //once user reset password , restor the initial state
      setEmailPass({ ...initialState });
      history.push("/login"); //for class component this.props.history.push("/login"); and wrap your export in withRouter. ie.export default withRouter(EmailPassword); /
    }

    return () => {
      dispatch(resetAllAuthForms);
    };
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setEmailPass({ ...initialState, errors: resetPasswordError });
    }
    return () => {
      //Added cleanup for resetPasswordError global state in the reset passwordSuccess useEffect unmount.
    };
  }, [resetPasswordError]);

  //update the FormInput field with what is typed into it
  function handleChange(e) {
    const { name, value } = e.target;
    setEmailPass({ ...emailPass, [name]: value });
  }

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
