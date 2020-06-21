import { takeLatest, call, all, put } from "redux-saga/effects";
import userTypes from "./user.types";
import { signInSuccess, signOutUserSuccess } from "./user.actions";
import {
  auth,
  handleUserProfile,
  GoogleProvider,
  getCurrentUser,
} from "./../../firebase/utils";

// Helper function to get a snapshot of user on auth change (await removed as we can't use it with a generator function. Yield used instead)
export function* getSnapshotFromUserAuth(user) {
  try {
    const userRef = yield call(handleUserProfile, { userAuth: user }); //handleUserProfile returns our userRef document after creating/registering a user it.
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

export function* emailSignIn({ payload: { email, password } }) {
  try {
    //Login user with signInWithEmailAndPassword function from the firebase auth library
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    console.log("Errors" + error);
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    //console.log(error)
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (error) {
    //console.log(error)}
  }
}
export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
  ]); // only need to pass onEmailSignInStart saga because onEmailSignInStart calls our emailSignIn saga
}
