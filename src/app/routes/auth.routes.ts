import { Router } from "express";
import AuthController from "../controllers/AuthController";

const authRouter = Router();

authRouter.use('/register', AuthController.register);

export default authRouter;
