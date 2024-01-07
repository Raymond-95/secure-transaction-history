import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TransactionDataModel } from 'models'

import { ApiService } from "services/network/ApiService"
import { TransactionDataResponse } from "services/network/models"

interface TransactionDetails {
    isFetching: boolean
    transctionDetails: Array<TransactionDataModel>
}

const initialState: TransactionDetails = {
    isFetching: false,
    transctionDetails: []
}

export const transctionDetailsSlice = createSlice({
    name: 'transctionDetails',
    initialState,
    reducers: {
        getTransactionDetails: (state) => {
            state.isFetching = true;
            ApiService.apis.getTransactionUrl()
                .then((result) => {
                    console.log(result)
                    state.transctionDetails = result.data
                    state.isFetching = false;
                })
                .catch((error) => {
                    console.log(error)
                    state.isFetching = false;
                })
        }
    }
})

export const { getTransactionDetails } = transctionDetailsSlice.actions;
export default transctionDetailsSlice.reducer;