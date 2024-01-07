import { TransactionDataModel } from 'models'

export interface GenericResponse {
    status: string
    message: string
}

export interface TransactionDataResponse {
    data: [TransactionDataModel]
}

