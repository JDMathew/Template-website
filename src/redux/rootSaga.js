import { all, call } from "redux-saga/effects";
import userSagas from "./User/user.sagas";

//create generator functions
export default function* rootSaga() {
  yield all([call(userSagas)]);
}
