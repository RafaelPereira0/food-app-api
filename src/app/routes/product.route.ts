import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { OwnRestauranteMiddleware } from "../middlewares/ownRestaurante.middleware";
import ProductController from "../controllers/ProductController";

const productRoute = Router();

productRoute.use(AuthMiddleware);
productRoute.use(OwnRestauranteMiddleware);

productRoute.post('/create', ProductController.create);
productRoute.get('/all', ProductController.getAll);
productRoute.put('/update/:id', ProductController.update);
productRoute.delete('/delete/:id', ProductController.delete);

export default productRoute;
