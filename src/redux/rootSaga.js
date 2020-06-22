import { all, call } from "redux-saga/effects";
import userSagas from "./User/user.sagas";

//create generator functions
export default function* rootSaga() {
  yield all([call(userSagas)]);
}

//Terms to look up for Saga's:
//Watchers and Workers - a way of splitting up sagas
// Saga Helpers: takeEvery, takeLaters
//Effect Creators: call, put, take - return plan JavaScript objects - execution is performed by the middleware during Itteration process - middleware examines each Effect description and performs the appropriate action
// call runs a function, if it retruns a promise it will pause the saga until promise is resolved. i.e you don't need to do async await.
// put - dispatches an action
// Others: fork, select, race, spawn, join, cancel
