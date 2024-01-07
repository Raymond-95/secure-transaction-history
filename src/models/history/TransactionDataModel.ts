export type TransctionType = 'debit' | 'credit'

export interface TransactionDataModel {
    id: number,
    acc_no: string,
    recipient_name: string,
    amount: number,
    date: string,
    description: string,
    type: TransctionType
}