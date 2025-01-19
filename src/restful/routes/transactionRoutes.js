import express from "express";
import TransactionController from "../controllers/transactionsController";
import { protect } from "../../helper/Response/protect";

const transactionRouter = express.Router();

transactionRouter.post("/",protect, TransactionController.newTransactions);
transactionRouter.get("/",protect, TransactionController.getAllTransaction);

export default transactionRouter;
