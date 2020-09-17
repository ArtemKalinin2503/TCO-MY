import {createStore, applyMiddleware} from "redux";
import mainReducer from "../reducer/mainReducer";
import {composeWithDevTools} from "redux-devtools-extension"; //npm install redux-devtools-extension
import thunk from 'redux-thunk'; //npm install redux-thunk

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;
