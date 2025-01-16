import express from "express";
import budjetController from "../controllers/budjectController";

const budjetRouter = express.Router();

budjetRouter.post("/", budjetController.newBadet);

export default budjetRouter;
