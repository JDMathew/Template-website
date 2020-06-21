import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  signInSuccess: false,
  resetPasswordSuccess: false,
  resetPasswordError: [],
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  //{ type, payload } could be replaced with action because we pass our action to our reducers.
  switch (type) {
    case userTypes.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload };
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };

    ///OLD CAN REMOVE
    case userTypes.SET_CURRENT_USER:
      return { ...state, ...payload };
    case userTypes.SIGN_IN_SUCCESS:
      return { ...state, signInSuccess: payload };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return { ...state, resetPasswordSuccess: payload };
    case userTypes.RESET_PASSWORD_ERROR:
      return { ...state, resetPasswordError: payload };
    case userTypes.RESET_AUTH_FORMS:
      return {
        ...state,
        signInSuccess: false,
        resetPasswordSuccess: false,
        resetPasswordError: [],
      };
    /////////////////

    default:
      return state;
  }
};

export default userReducer;
