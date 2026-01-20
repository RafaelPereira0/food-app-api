import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import CategoryController from "../controllers/CategoryController";

const categoryRoutes = Router();

categoryRoutes.use(AuthMiddleware);

categoryRoutes.post('/create', CategoryController.createCategory);

export default categoryRoutes;