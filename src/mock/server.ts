import { createServer, Response } from "miragejs";
import { TransactionData } from 'mock/transactionData';

export const makeServer = () => {
  return createServer({
    routes() {
      // Set a urlPrefix to handle requests with "/api" prefix
      this.namespace = "/api";
      this.urlPrefix = 'http://localhost:8081';
      this.post("/retrieveTransactionData", (schema, request) => {
        // Handle the POST request logic here
         return {
           status: "success",
           data: { transactionData: TransactionData },
         };

        // // throw specific error code
        // return new Response(400, {}, { error: 'Bad Request' });
      });
    },
  });
};
