import React, { useState, useEffect } from "react";
//Router
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils"; //authentication from firebase

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import About from "./pages/About";
import Login from "./pages/Login";

//Styles
import "./default.scss";

const initialState = {
  currentUser: null,
};

function App() {
  const [state, setState] = useState(initialState);
  let authListener = null; //event listener

  useEffect(() => {
    authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth); //handleUserProfile returns our userRef document after creating it.

        //Subscripting to userRef and waiting for onSnapshot event to get the snapshot update the local state of our application
        userRef.onSnapshot((snapshot) => {
          setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(), // Grabbing all the other date we stored in the document. This was displayName, email, createDate and  ...additionalData we passed it
            },
          });
        });
      }
      setState({ ...initialState });
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
            <HomepageLayout currentUser={state.currentUser}>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path="/register"
          render={() => (
            <MainLayout currentUser={state.currentUser}>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          path="/about"
          render={() => (
            <MainLayout currentUser={state.currentUser}>
              <About />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() =>
            state.currentUser ? (
              <Redirect to="/" /> // Redirect to homepage if currentUser exists
            ) : (
              <MainLayout currentUser={state.currentUser}>
                <Login />
              </MainLayout>
            )
          }
        />
      </Switch>
    </div>
  );
}

export default App;
