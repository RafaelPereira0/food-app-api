import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import OrderController from "../controllers/OrderController";
import { OwnRestauranteMiddleware } from "../middlewares/ownRestaurante.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createOrderSchema, updateOrderSchema } from "../../schemas/order.schema";

const orderRoute = Router();

orderRoute.use(AuthMiddleware)

orderRoute.post('/create', validate(createOrderSchema), OrderController.create);
orderRoute.patch('/status/:id',OwnRestauranteMiddleware, validate(updateOrderSchema) ,OrderController.update);
orderRoute.get('/client', OrderController.listForClient);
orderRoute.get('/restaurant',OwnRestauranteMiddleware, OrderController.listForRestaurant)

export default orderRoute