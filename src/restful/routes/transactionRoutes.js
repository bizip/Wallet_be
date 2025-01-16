import express from "express";
import TransactionController from "../controllers/transactionsController";

const transactionRouter = express.Router();

transactionRouter.post("/", TransactionController.newTransactions);
transactionRouter.get("/", TransactionController.getAllTransaction);

export default transactionRouter;
