import { Router } from "express";
// import dotenv from "dotenv";
import authRouter from "./auth";
import transactionRouter from "./transactionRoutes";
import budjetRouter from "./budgetRouter";

// dotenv.config();
const API_VERSION = process.env.API_VERSION || "v1";
const url = `/api/${API_VERSION}`;
const router = Router();

router.use(`${url}/auth`, authRouter);
router.use(`${url}/transactions`, transactionRouter);
router.use(`${url}/budjet`, budjetRouter );
router.all(`${url}/`, (req, res) => {
  return res.status(200).json({ message: "Welcome to my wallet" });
});
router.use("*", (req, res) => {
  res
    .status(404)
    .json({ status: 404, message: "This endpoint does not exist" });
});

export default router;
