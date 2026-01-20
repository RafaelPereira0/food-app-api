import { Request, Response } from "express";
import { restaurantDTO, UpdateRestaurantDTO } from "../dtos/restaurant.dto";
import RestaurantService from "../services/RestaurantService";
import { RestaurantTypes } from "../types/restaurantTypes";
import CategoryService from "../services/CategoryService";
import { CreateProductCategoryDTO } from "../dtos/category.dto";

class RestaurantController {
    async create(req: Request, res: Response) {
        try {
            const userId = req.user!.id
            const data: restaurantDTO = req.body;

            const restaurant: RestaurantTypes = await RestaurantService.create(userId, data);

            return res.status(200).json({ message: "Restaurante cadastrado com sucesso", restaurant })
        } catch (err: any) {
            res.status(400).json({ message: err.message })
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const restaurants: RestaurantTypes[] = await RestaurantService.getAll();

            return res.status(200).json(restaurants);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async getMyRestaurant(req: Request, res: Response) {
        try {
            const userId = req.user!.id;
            const restaurant: RestaurantTypes | null = await RestaurantService.getMyRestaurant(userId);

            if (!restaurant) {
                return res.status(404).json({ message: "Você não possui um restaurante cadastrado" })
            }

            return res.status(200).json(restaurant);
        } catch (err: any) {
            return res.status(400).json({ message: err.message })
        }
    }

    async delete(req: Request, res: Response){
        try{
            const userId = req.user!.id;
            const restaurant : RestaurantTypes | null = await RestaurantService.getMyRestaurant(userId);
            
            if (!restaurant) {
                return res.status(404).json({ message: "Você não possui um restaurante cadastrado" })
            }

            const deleted = await RestaurantService.delete(restaurant.id, userId);

            return res.status(200).json(deleted);
        }catch(err: any){
            return res.status(400).json({message: err.message});
        }
    }

    async update(req: Request, res: Response){
        try{
            const userId = req.user!.id;
            const data : UpdateRestaurantDTO = req.body;

            const restaurant : RestaurantTypes = await RestaurantService.uptdate(userId, data);

            return res.status(200).json(restaurant);
        }catch(err: any){
            return res.status(400).json({message: err.message});
        }
    }

        async getRestaurantByCategory(req: Request, res: Response){
        try{
            const {categoryId} = req.params
            const restaurants = await CategoryService.getRestaurantByCategory(Number(categoryId));

            if(!restaurants){
                return res.status(400).json({message: "Não há restaurantes dessa categoria"})
            }

            return res.status(200).json(restaurants);
        }catch(err: any){
            return res.status(400).json({message: err.message})
        }
    }

    async createMenuSection(req: Request, res: Response){
        try{
            const {restaurantId, name}: CreateProductCategoryDTO = req.body;

            const createdProduct = await CategoryService.createProductCategory(name, restaurantId);

            return res.status(200).json(createdProduct);    
        }catch(err: any){
            return res.status(400).json({message: err.message});
        }
    }
}


export default new RestaurantController();