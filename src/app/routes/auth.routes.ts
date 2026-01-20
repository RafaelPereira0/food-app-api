import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../../schemas/auth.schema";

const authRouter = Router();

authRouter.use('/register', validate(registerSchema), AuthController.register);
authRouter.use('/login', validate(loginSchema), AuthController.login);

export default authRouter;
