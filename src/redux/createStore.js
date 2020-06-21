import { createStore, applyMiddleware } from "redux";

//Middlewares
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddle from "redux-saga";

//Reducers and Sagas
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

//Need to create an instance of the saga before passing into middleware array
const sagaMiddleware = createSagaMiddle();

export const middlewares = [thunk, logger, sagaMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga); // must be called after createStore. Pass in our rootSaga

export default store;
