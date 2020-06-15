import firebase from "firebase/app";
import "firebase/firestore"; //firebase firestore
import "firebase/auth"; //firebase auth library
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig); //connect to database

// two instances of auth ot use in application:
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//SignIn Providers (can create custome providers for Google, Facebook, Github...)
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
const FacebookProvider = new firebase.auth.FacebookAuthProvider();

//Setting custome parameters on providers
GoogleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider); //signInWithPopup accepts a provider we pass it
