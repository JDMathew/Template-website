import React, { useEffect } from "react";
//Router
import { Route, Switch, Redirect } from "react-router-dom";

//REDUX
import { useSelector, useDispatch } from "react-redux";
//Actions
import { checkUserSession } from "./redux/User/user.actions";

//hoc
import WithAuth from "./hoc/withAuth";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import About from "./pages/About";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";

//Styles
import "./default.scss";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
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
            currentUser ? (
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
            currentUser ? (
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
            currentUser ? (
              <Redirect to="/" /> // Redirect to homepage if currentUser exists
            ) : (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )
          }
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;

// /// REDUX without REDUX HOOKS:
//import { connect} from "react-redux";
// const { setCurrentUser, currentUser } = props; //Destructuring actions (setCurrentUser action) and state currentUser from props
// // .... code....
// useEffect(() => {
//   dispatch(checkUserSession());

// //event listner moved out to Redux saga
//  //event listener that runs code inside the onAuthStateChanged function
// const authListener = auth.onAuthStateChanged(async (userAuth) => {
//   if (userAuth) {
//     const userRef = await handleUserProfile(userAuth); //handleUserProfile returns our userRef document after creating it.
//     //Subscripting to userRef and waiting for onSnapshot event to get the snapshot update the local state of our application
//     userRef.onSnapshot((snapshot) => {
//       //Call our Redux action to update state
//       dispatch(
//         setCurrentUser({
//           currentUser: {
//             id: snapshot.id,
//             ...snapshot.data(), // Grabbing all the other date we stored in the document. This was displayName, email, createDate and  ...additionalData we passed it
//           },
//         })
//       );
//     });
//   }
//   dispatch(setCurrentUser({ currentUser: userAuth })); //userAuth should return null.
// });
// return () => {
//   console.log("clean up  effect");
//   authListener();
// };
// }, []);
// // ....code...

// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (payload) => dispatch(setCurrentUser(payload)), //setCurrentUser is our action used to update the state
// });

// //We disbatch actions to update the redux store with our new state. (i.e update our state like setState)

// export default connect(mapStateToProps, mapDispatchToProps)(App);
