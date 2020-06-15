import React from "react";
//Router
import { Route, Switch } from "react-router-dom";

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

function App() {
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
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
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
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
