import userTypes from "./user.types";

export const setCurrentUser = (payload) => ({
  type: userTypes.SET_CURRENT_USER,
  payload,
});
