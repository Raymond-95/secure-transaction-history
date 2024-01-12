import { Alert } from 'react-native'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TransactionDataModel } from 'models'

import { ApiService } from "services/network/ApiService"
import { TransactionDataResponse } from "services/network/responseModels"

interface TransactionDetails {
    isFetching: boolean
    transctionDetails: Array<TransactionDataModel>
    error?: string
}

const initialState: TransactionDetails = {
    isFetching: false,
    transctionDetails: [],
    error: null
}

export const transctionDetailsSlice = createSlice({
    name: 'transctionDetails',
    initialState,
    reducers: {
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setTransactionDetails: (state, action) => {
            state.isFetching = false
            state.transctionDetails = action.payload;
        },
        setTransactionDetailsError: (state, action) => {
            state.isFetching = false
            state.error = action.payload;
        }
    }
})

export const getTransactionDetails = createAsyncThunk(
    'transctionDetails/getTransactionDetails',
    async (_, { dispatch, getState }) => {
        try {
            const result: TransactionDataResponse = await ApiService.apis.getTransactionUrl();

            console.log(result)

            if (result.status === 'success') {
                // Assuming result.data.transactionData is the array you want to update
                dispatch(transctionDetailsSlice.actions.setTransactionDetails(result.data.transactionData));
            } else {
                // Handle the case where the API request fails
                dispatch(transctionDetailsSlice.actions.setTransactionDetailsError(result.data));
            }
        } catch (error) {
            console.error('Error fetching data:', error);

            Alert.alert('Error', error._message.message)
            // Handle the error if needed
            dispatch(transctionDetailsSlice.actions.setTransactionDetailsError(error.message));
        }
    }
);

export const { setIsFetching, setTransactionDetails } = transctionDetailsSlice.actions;
export const transctionDetailsReducer = transctionDetailsSlice.reducer