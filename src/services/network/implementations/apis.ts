import { client } from 'services/network/ApiService'
import { routes } from 'services/network/routes'
import { TransactionDataResponse } from 'services/network/responseModels'

// API implementation
export const apis = {
    getTransactionUrl: () => client.post<TransactionDataResponse>(
        routes.getTransactionUrl()
    )
}