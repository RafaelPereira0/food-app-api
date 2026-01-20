// restaurant.routes.ts
import { Router } from "express";
import RestaurantController from "../controllers/RestaurantController";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { OwnRestauranteMiddleware } from "../middlewares/ownRestaurante.middleware";
import { validate } from "../middlewares/validate.middleware";
import { restaurantSchema, updateRestaurantSchema } from "../../schemas/restaurant.schema";

const restaurantRoute = Router();

restaurantRoute.use(AuthMiddleware);

restaurantRoute.post('/create', validate(restaurantSchema), RestaurantController.create)
restaurantRoute.post('/menu-section', OwnRestauranteMiddleware, RestaurantController.createMenuSection);
restaurantRoute.get('/all', RestaurantController.getAll)
restaurantRoute.get('/me', RestaurantController.getMyRestaurant)
restaurantRoute.get('/category/:id', RestaurantController.getRestaurantByCategory);
restaurantRoute.put('/me', validate(updateRestaurantSchema), RestaurantController.update)
restaurantRoute.delete('/me', RestaurantController.delete)

export default restaurantRoute;