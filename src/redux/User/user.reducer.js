import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  signInSuccess: false,
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  //{ type, payload } could be replaced with action because we pass our action to our reducers.
  switch (type) {
    case userTypes.SET_CURRENT_USER:
      return { ...state, ...payload };
    case userTypes.SIGN_IN_SUCCESS:
      return { ...state, signInSuccess: payload };

    default:
      return state;
  }
};

export default userReducer;
