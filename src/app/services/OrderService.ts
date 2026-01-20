import { DifferentRestaurantError } from "../../errors/DifferentRestaurantError";
import { OrderNotFoundError } from "../../errors/OrderNotFoundError";
import { ProductNotFoundError } from "../../errors/ProductNotFoundError";
import prisma from "../prisma/client";
import { OrderStatus } from "../types/orderStatus";

class OrderService{

    async create(userId: number, restaurantId: number, items: {productId: number, quantity: number}[]){
        
        const productsId = items.map(i => i.productId);

        const dbProducts = await prisma.product.findMany({
            where: {id: {
                in: productsId
            }}
        });

        const isFromDifferentRestaurant = dbProducts.some(p => p.restaurantId !== restaurantId);
            if (isFromDifferentRestaurant) {
                throw new DifferentRestaurantError();
        }

        if (dbProducts.length !== items.length) {
            throw new ProductNotFoundError();
        }

        let total = 0;

        const itemsData = items.map(item => {
            const product = dbProducts.find(p => p.id === item.productId)

            if (!product) throw new Error(`Produto ${item.productId} não encontrado`);

            const subtotal = product!.price * item.quantity;
            total += subtotal;

            return {
                product: {
                    connect: { id: item.productId}
                },
                quantity: item.quantity,
                price: product?.price 
            }
        } )

        const createdOrder = await prisma.order.create({
            data: {
                userId,
                restaurantId,
                total: total,
                status: OrderStatus.PENDING,
                items: {
                    create: itemsData
                }
            }, include: {items: true}
        })

        return createdOrder;
    }

    async updateStatus(restaurantId: number, orderId: number, status: OrderStatus){
        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                restaurantId
            }
        })

        if(!order){
            throw new OrderNotFoundError();
        }

        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId
            }, data: {
                status
            }
        })

        return updatedOrder;
    }

    async getAllClient(userId: number){
        const orders = await prisma.order.findMany({
            where: {userId: userId},
            include: {
                restaurant: {
                    select: {
                        name: true,
                        phone: true
                    }
                }, items: {
                    include: {
                        product:{
                            select:{
                                name: true,
                                description: true
                            }
                        }
                    }
                }
            }, orderBy: {createdAt: "desc"}
        })

        if(!orders) throw new OrderNotFoundError();

        return orders;
    }

    async getAllRestaurant(restaurantId: number){
        const orders = await prisma.order.findMany({
            where: {restaurantId: restaurantId},
            include: {
                user: {
                    select: {
                        name: true,
                        phone: true,
                        address: true
                    }
                }, items: {
                    include: {
                        product: {
                            select:{
                                name: true,
                                description: true
                            }
                        }
                    }
                }
            }, orderBy: {createdAt: "asc"}
        });

        if(!orders) throw new OrderNotFoundError();

        return orders
    }

}

export default new OrderService()