import userTypes from "./user.types";
import { auth, GoogleProvider } from "./../../firebase/utils";

export const emailSignInStart = (userCredentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});
export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

export const signUpUserStart = (userCredentials) => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials,
});

export const userError = (error) => ({
  type: userTypes.USER_ERROR,
  payload: error,
});

export const resetPasswordStart = (userCredentials) => ({
  type: userTypes.RESET_PASSWORD_START,
  payload: userCredentials,
});

export const resetPasswordSuccess = () => ({
  type: userTypes.RESET_PASSWORD_SUCCESS,
  payload: true,
});

///// old actions

export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    //Login user with signInWithEmailAndPassword function from the firebase auth library
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: userTypes.SIGN_IN_SUCCESS,
      payload: true,
    });
  } catch (error) {
    console.log("Errors" + error);
  }
};

export const resetPassword = ({ email }) => async (dispatch) => {
  const config = {
    url: "http://localhost:3000/login", // This is the retrun url given to firebase and it is the url we want to send the user once they have reset their password from the reset link they were emailed
  };

  try {
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        //What to do when the promis is successful
        dispatch({
          type: userTypes.RESET_PASSWORD_SUCCESS,
          payload: true,
        });
      })
      .catch((error) => {
        //What to do when the promis is fails
        const err = ["Email not found. Please try again"];
        dispatch({ type: userTypes.RESET_PASSWORD_ERROR, payload: err });
      });
  } catch (error) {
    //console.log("Errors" + error);
  }
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await auth.signInWithPopup(GoogleProvider).then(() => {
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      });
    });
  } catch (error) {}
};

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});
