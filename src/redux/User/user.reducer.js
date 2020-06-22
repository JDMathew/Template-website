import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  userError: [],
  resetPasswordSuccess: false,
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  //{ type, payload } could be replaced with action because we pass our action to our reducers.
  switch (type) {
    case userTypes.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload, userError: [] };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return { ...state, resetPasswordSuccess: payload };
    case userTypes.USER_ERROR:
      return { ...state, userError: payload };
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

export default userReducer;
