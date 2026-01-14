import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import OrderController from "../controllers/OrderController";
import { OwnRestauranteMiddleware } from "../middlewares/ownRestaurante.middleware";

const orderRoute = Router();

orderRoute.use(AuthMiddleware)

orderRoute.post('/create', OrderController.create);
orderRoute.patch('/status/:id',OwnRestauranteMiddleware ,OrderController.update);
orderRoute.get('/client', OrderController.listForClient);
orderRoute.get('/restaurant',OwnRestauranteMiddleware, OrderController.listForRestaurant)

export default orderRoute