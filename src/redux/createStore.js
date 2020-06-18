import { createStore, applyMiddleware } from "redux";

//Middlewares
import logger from "redux-logger";
import thunk from "redux-thunk";

//Reducers
import rootReducer from "./rootReducer";

export const middlewares = [thunk, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
