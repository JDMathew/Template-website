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
