import { combineReducers } from "redux"
import { transctionDetailsReducer } from 'redux/slices/transactionSlice'

export const rootReducer = combineReducers({
    transaction: transctionDetailsReducer
})

export type RootStoreType = ReturnType<typeof rootReducer>
