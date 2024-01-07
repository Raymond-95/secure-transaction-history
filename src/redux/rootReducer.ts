import { combineReducers } from "redux"
import { transctionDetailsSlice } from 'redux/slices/transactionSlice'

export const rootReducer = combineReducers({
    transaction: transctionDetailsSlice
})
