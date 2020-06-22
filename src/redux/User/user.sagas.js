import { takeLatest, call, all, put } from "redux-saga/effects";
import userTypes from "./user.types";
import {
  signInSuccess,
  signOutUserSuccess,
  resetPasswordSuccess,
  userError,
} from "./user.actions";
import {
  auth,
  handleUserProfile,
  GoogleProvider,
  getCurrentUser,
} from "./../../firebase/utils";
import { handleResetPasswordAPI } from "./user.helpers";

// Helper function to get a snapshot of user on auth change (await removed as we can't use it with a generator function. Yield used instead)
export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  //(this is a helper function used by more than one generator function)
  try {
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    }); //handleUserProfile returns our userRef document after creating/registering a user it.
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(), // Grabbing all the other date we stored in the document. This was displayName, email, createDate and  ...additionalData we passed it
      })
    );

    //   type: userTypes.SIGN_IN_SUCCESS,
    //   payload: true,
    // });

    //Subscripting to userRef and waiting for onSnapshot event to get the snapshot update the local state of our application
  } catch (error) {}
}
//-------------------------------------------------------------
// EMAIL SIGN IN:
//Worker
export function* emailSignIn({ payload: { email, password } }) {
  try {
    //Login user with signInWithEmailAndPassword function from the firebase auth library
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    console.log("Errors" + error);
  }
}

//Watcher
export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}
//-------------------------------------------------------------

// CHECK USER SESSION
// Worker
export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    //console.log(error)
  }
}

//Watcher
export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}
//-------------------------------------------------------------

//SIGN OUT USER
//Worker
export function* signOutUser() {
  try {
    console.log("ran worker");
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (error) {
    //console.log(error)}
  }
}
//Watcher
export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}
//-------------------------------------------------------------

//SIGN UP USER

//Worker
export function* signUpUser({
  payload: { displayName, email, password, confirmPassword },
}) {
  if (password !== confirmPassword) {
    const err = ["Passwords Don't match"];
    yield put(userError(err));
    return;
  }

  try {
    //call the createUserWithEmailAndPassword function from the firebase auth library and destrucuture the response into a user variable. i.e get the user object from the backend

    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName };
    yield getSnapshotFromUserAuth(user, additionalData);
    //create the user document using our handleuserProfile function
    yield call(handleUserProfile, {
      userAuth: user,
      additionalData: { displayName },
    });

    //once user is signed up, restor the initial state
  } catch (error) {
    //console.log("Errors" + error);
  }
}

//Watcher
export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}
//-------------------------------------------------------------

//RESET PASSWORD

//Worker
export function* resetPassword({ payload: { email } }) {
  try {
    yield call(handleResetPasswordAPI, email);

    yield put(resetPasswordSuccess());
  } catch (error) {
    //console.log("Errors" + error);
    yield put(userError(error));
  }
}

//Watcher
export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}
//-------------------------------------------------------------

//Provide Redux rootSaga our User Sagas which is then provides the Redux store our Sagas
export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
  ]); // only need to pass onEmailSignInStart saga because onEmailSignInStart calls our emailSignIn saga
}
