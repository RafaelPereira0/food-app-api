import { ProductNotFoundError } from "../../errors/ProductNotFoundError";
import { RestaurantNotFound } from "../../errors/RestaurantNotFound";
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

        const category = await prisma.productCategory.findFirst({
            where: {
                id: data.productCategoryId,
                restaurantId: restaurant.id
            }
        });

        if (!category) {
            throw new Error("Categoria não encontrada ou não pertence ao seu restaurante");
        }

        const product = await prisma.product.create({
            data: {
                ...data,
                restaurantId: restaurant.id,
                productCategoryId: data.productCategoryId
            }
        })

        return product;
    }

    async getAll(){
        const products = await prisma.product.findMany({
            select: {
                id:true,
                name:true,
                description:true,
                price:true,
                restaurant: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                productCategory: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return products
    }

    async getAllFromRestaurant(userId: number): Promise<ProductType[]>{
        const restaurant = await prisma.restaurant.findUnique({
            where: {userId}
        });

        if(!restaurant){
            throw new RestaurantNotFound()
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
            throw new RestaurantNotFound()
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
            throw new RestaurantNotFound()
        }

        const product = await prisma.product.findFirst({
            where: {
                id: productId,
                restaurantId: restaurant.id
            }
        })

        if(!product){
            throw new ProductNotFoundError();
        }

        const deleted = await prisma.product.delete({
            where: {id: productId}
        })

        return deleted;
    }
}

export default new ProductService();