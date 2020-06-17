import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  //{ type, payload } could be replaced with action because we pass our action to our reducers.
  switch (type) {
    case userTypes.SET_CURRENT_USER:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default userReducer;
