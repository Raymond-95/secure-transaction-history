import { createServer } from "miragejs"
import { TransactionData } from 'mock/transactionData'

export const makeServer = () => {
  return createServer({
    routes() {
      this.namespace = "api"

      this.post("/retrieveTransactionData", (schema, request) => {
        return { transactionData: TransactionData }
      })
    }
  })
};