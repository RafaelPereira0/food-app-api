import { CreateProductDTO, UpdateProductDTO } from "../dtos/product.dto";
import prisma from "../prisma/client";
import { ProductType } from "../types/productType";

class ProductService{

    async create(userId: number, data: CreateProductDTO): Promise<ProductType>{
        const restaurant = await prisma.restaurant.findUnique({
            where: {userId}
        });

        if(!restaurant){
            throw new Error("Usuário não possui um restaurante cadastrado");
        }

        const product = await prisma.product.create({
            data: {
                ...data,
                restaurantId: restaurant.id
            }
        })

        return product;
    }

    async getAllFromRestaurant(userId: number): Promise<ProductType[]>{
        const restaurant = await prisma.restaurant.findUnique({
            where: {userId}
        });

        if(!restaurant){
            throw new Error("Restaurante não encontrado")
        }

        const products = await prisma.product.findMany({
            where: {restaurantId: restaurant.id}
        })

        return products;
    }

    async update(productId: number, userId: number, data: UpdateProductDTO): Promise<ProductType>{
        const restaurant = await prisma.restaurant.findUnique({
            where: {userId: userId}
        });

        if(!restaurant){
            throw new Error("Restaurante não encontrado")
        }

        const product = await prisma.product.findFirst({
            where: {
                id: productId,
                restaurantId: restaurant.id
            }
        });

        if(!product){
            throw new Error("Produto não encontrado ou não pertence ao seu restaurante");
        }

        const updatedProduct = await prisma.product.update({
            where: {id: productId},
            data
        })  

        return updatedProduct;
    }

    async delete(productId: number, userId: number): Promise<ProductType>{
        const restaurant = await prisma.restaurant.findUnique({
            where: {userId}
        });

        if(!restaurant){
            throw new Error("Restaurante não encontrado")
        }

        const product = await prisma.product.findFirst({
            where: {
                id: productId,
                restaurantId: restaurant.id
            }
        })

        if(!product){
            throw new Error("Produto não encontrado");
        }

        const deleted = await prisma.product.delete({
            where: {id: productId}
        })

        return deleted;
    }
}

export default new ProductService();