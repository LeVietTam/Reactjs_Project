import {combineReducers} from "redux"
import cartQty from "./cartQty"

const roodReducer = combineReducers({
    qty:cartQty,
})

export default roodReducer;