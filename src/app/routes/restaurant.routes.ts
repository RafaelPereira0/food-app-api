// restaurant.routes.ts
import { Router } from "express";
import RestaurantController from "../controllers/RestaurantController";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const restaurantRoute = Router();

restaurantRoute.use(AuthMiddleware);

restaurantRoute.post('/create', RestaurantController.create)
restaurantRoute.get('/all', RestaurantController.getAll)
restaurantRoute.get('/me', RestaurantController.getMyRestaurant)
restaurantRoute.put('/me', RestaurantController.update)
restaurantRoute.delete('/me', RestaurantController.delete)

export default restaurantRoute;