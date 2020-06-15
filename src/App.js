import React, { useState, useEffect } from "react";
//Router
import { Route, Switch, Redirect } from "react-router-dom";
import { auth } from "./firebase/utils"; //authentication from firebase

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
  let authListener = null;

  useEffect(() => {
    authListener = auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) {
        setState({ ...initialState });
      }

      setState({ currentUser: userAuth });
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
