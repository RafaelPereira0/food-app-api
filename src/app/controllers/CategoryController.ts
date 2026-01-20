import { Request, Response } from "express"
import { CreateCategoryDTO } from "../dtos/category.dto";
import CategoryService from "../services/CategoryService";

class CategoryController{

    async createCategory(req: Request, res: Response){
        try{    
            const {name}: CreateCategoryDTO = req.body;

            const category = await CategoryService.createRestaurantCategory(name);

            return res.status(201).json(category);
        }catch(err:any){
            return res.status(400).json({message: err.message})
        }
    }
}

export default new CategoryController()