import React, { useState, useEffect } from "react";
//Router
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils"; //authentication from firebase

//REDUX
import { connect } from "react-redux";
//Actions
import { setCurrentUser } from "./redux/User/user.actions";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import About from "./pages/About";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";

//Styles
import "./default.scss";

function App(props) {
  let authListener = null; //event listener

  useEffect(() => {
    authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth); //handleUserProfile returns our userRef document after creating it.

        //Subscripting to userRef and waiting for onSnapshot event to get the snapshot update the local state of our application
        userRef.onSnapshot((snapshot) => {
          props.setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(), // Grabbing all the other date we stored in the document. This was displayName, email, createDate and  ...additionalData we passed it
            },
          });
        });
      }
      props.setCurrentUser({ currentUser: userAuth }); //userAuth should return null.
    });

    return () => {
      console.log("clean up  effect");
      authListener();
    };
  }, []);

  return (
    <div className="App">
      <Switch>
        {" "}
        {/* exact={true} to only render that exact path and not other paths that match*/}
        <Route
          exact={true}
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path="/register"
          render={() =>
            props.currentUser ? (
              <Redirect to="/" /> // Redirect to homepage if currentUser exists
            ) : (
              <MainLayout>
                <Registration />
              </MainLayout>
            )
          }
        />
        <Route
          path="/about"
          render={() => (
            <MainLayout>
              <About />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() =>
            props.currentUser ? (
              <Redirect to="/" /> // Redirect to homepage if currentUser exists
            ) : (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />
        <Route
          path="/recovery"
          render={() =>
            props.currentUser ? (
              <Redirect to="/" /> // Redirect to homepage if currentUser exists
            ) : (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )
          }
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (payload) => dispatch(setCurrentUser(payload)), //setCurrentUser is our action used to update the state
});

//We disbatch actions to update the redux store with our new state. (i.e update our state like setState)

export default connect(mapStateToProps, mapDispatchToProps)(App);
