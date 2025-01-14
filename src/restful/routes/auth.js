import express from "express";
import AuthController from "../controllers/authControllers";

const authRouter = express.Router();

authRouter.post("/signup", AuthController.signUp);

export default authRouter;
