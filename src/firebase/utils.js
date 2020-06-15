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

//utility function to handelUsers Profile for GraphQL
export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return; // if userAuth is null... return else..

  //Check if user is in current collection (colletion is a firebase thing. It's like a table)
  //Each entry in a collection has a document so if collection is a talbe a document is the row. Each document(row) has a unique id with is the title of the document this is the `uid`.

  //If the user exists in the database then the user/uid path will exists with a document id. If it doesn't exist we need to create it.
  const { uid } = userAuth;

  const userRef = firestore.doc(`user/${uid}`); // this returns a reference document with a couple of methods to get data or set data.
  const snapshot = await userRef.get(); //get the userid

  //if user does not exist try create it catch any erros
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createDate: timestamp,
        ...additionalData, // we passed the UserAuth and aditional data to the function
      });
    } catch (err) {
      console.log(err);
    }
  }
  return userRef; //Return the userRef document to update the local state of our application
};
