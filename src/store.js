import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers";

// redux dev tools
import {composeWithDevTools} from "redux-devtools-extension";

// Setup initial State
const initialState = {};
// const brandData = {};

// Import Middleware
const middleware = [thunk];

// setup store

const store = createStore(combineReducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

// export store
export default store;