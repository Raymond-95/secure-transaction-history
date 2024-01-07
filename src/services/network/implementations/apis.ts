import { client } from 'services/network/ApiService'
import { routes } from 'services/network/routes'
import { TransactionDataResponse } from 'services/network/models'

// API implementation
export const apis = {
    getTransactionUrl: () => client.post<TransactionDataResponse>(
        routes.getTransactionUrl()
    )
}