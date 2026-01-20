import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { OwnRestauranteMiddleware } from "../middlewares/ownRestaurante.middleware";
import ProductController from "../controllers/ProductController";
import { validate } from "../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema } from "../../schemas/product.schema";

const productRoute = Router();

productRoute.get('/all', ProductController.getAll);

productRoute.use(AuthMiddleware);
productRoute.use(OwnRestauranteMiddleware);

productRoute.post('/create', validate(createProductSchema), ProductController.create);
productRoute.get('/all/restaurant', ProductController.getAllFromRestaurant);
productRoute.get('/menu/:restaurantId', ProductController.getFullMenu);
productRoute.put('/update/:id', validate(updateProductSchema), ProductController.update);
productRoute.delete('/delete/:id', ProductController.delete);

export default productRoute;
