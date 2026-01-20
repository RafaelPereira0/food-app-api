import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import { ProductType } from "../types/productType";
import { CreateProductDTO, UpdateProductDTO } from "../dtos/product.dto";
import prisma from "../prisma/client";

class ProductController {

    async create(req: Request, res: Response) {
        try {
            const userId = req.user!.id;
            const data: CreateProductDTO = req.body;

            const product: ProductType = await ProductService.create(userId, data);
            return res.status(201).json(product);
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getAllFromRestaurant(req: Request, res: Response) {
        try {
            const userId = req.user!.id;

            const products: ProductType[] = await ProductService.getAllFromRestaurant(userId);
            return res.status(200).json(products)
        } catch (err: any) {
            return res.status(400).json({ message: err.message })
        }
    }

    async getAll(req: Request, res: Response){
        try{
            const products = await ProductService.getAll();

            return res.status(200).json(products)
        }catch(err: any){
            return res.status(400).json({message: err.message})
        }
    }

    async update(req: Request, res: Response) {
        try {
            const userId = req.user!.id;
            const productId = req.params.id;
            const data: UpdateProductDTO = req.body;

            const product: ProductType = await ProductService.update(Number(productId), userId, data);

            return res.status(200).json(product);
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userId = req.user!.id;
            const productId = req.params.id;

            const product: ProductType = await ProductService.delete(Number(productId), userId);

            return res.status(200).json(product);
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    }

    async getFullMenu(req: Request, res: Response) {
        const { restaurantId } = req.params;

        const menu = await prisma.productCategory.findMany({
            where: { restaurantId: Number(restaurantId) },
            include: {
                products: true
            }
        });

        return res.json(menu);
    }
}

export default new ProductController();