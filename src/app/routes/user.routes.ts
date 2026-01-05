import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { RoleMiddleware } from "../middlewares/role.middleware";
import { Role } from "../types/role";
import UserController from "../controllers/UserController";

const userRoute = Router();

userRoute.put('/me',
    AuthMiddleware,
    RoleMiddleware([Role.CLIENT]),
    
    UserController.update
)

export default userRoute;