import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { RoleMiddleware } from "../middlewares/role.middleware";
import { Role } from "../types/role";
import UserController from "../controllers/UserController";

const userRoute = Router();

userRoute.use(AuthMiddleware);
userRoute.use(RoleMiddleware([Role.CLIENT]));

userRoute.put('/me',UserController.update);
userRoute.delete('/me', UserController.delete);

export default userRoute;