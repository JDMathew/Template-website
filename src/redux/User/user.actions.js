import userTypes from "./user.types";
import { auth } from "./../../firebase/utils";

export const setCurrentUser = (payload) => ({
  type: userTypes.SET_CURRENT_USER,
  payload,
});

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

export const resetPassword = ({ email, config }) => async (dispatch) => {
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
