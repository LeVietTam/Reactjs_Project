import { legacy_createStore as createStore } from "redux";
import roodReducer from "./reducers";

const store = createStore(roodReducer)

export default store;


