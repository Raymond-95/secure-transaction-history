import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setTransactionDetails: (state, action) => {
            state.transctionDetails = action.payload;
        }
    }
})

export const getTransactionDetails = createAsyncThunk(
    'transctionDetails/getTransactionDetails',
    async (_, { dispatch, getState }) => {
        try {
            // Set isFetching to true before the API call
            dispatch(transctionDetailsSlice.actions.setIsFetching(true));

            const result: TransactionDataResponse = await ApiService.apis.getTransactionUrl();

            if (result.status === 'success') {
                // Assuming result.data.transactionData is the array you want to update
                dispatch(transctionDetailsSlice.actions.setTransactionDetails(result.data.transactionData));
            } else {
                // Handle the case where the API request fails
            }

            // Set isFetching to false after the API call
            dispatch(transctionDetailsSlice.actions.setIsFetching(false));
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error if needed
            dispatch(transctionDetailsSlice.actions.setIsFetching(false));
        }
    }
);

export const { setIsFetching, setTransactionDetails } = transctionDetailsSlice.actions;
export const transctionDetailsReducer = transctionDetailsSlice.reducer