import { RestaurantNotFound } from "../../errors/RestaurantNotFound";
import { restaurantDTO, UpdateRestaurantDTO } from "../dtos/restaurant.dto";
import prisma from "../prisma/client";
import { RestaurantTypes } from "../types/restaurantTypes";
import { Role } from "../types/role";

class RestaurantService{
    async create(userId: number, data: restaurantDTO){
        const alreadyHasRestaurant = await prisma.restaurant.findUnique({
            where: {userId}
        })

        if(alreadyHasRestaurant && alreadyHasRestaurant.active === true){
            throw new Error("Usuário já possui um restaurante");
        }

        if(alreadyHasRestaurant && alreadyHasRestaurant.active === false){
            const activeRestaurante = await prisma.restaurant.update({
                where: {userId: userId},
                data: {
                    active: true
                },
                select: {
                    id: true,
                    name: true,
                    address: true,
                    phone: true
                }
            })

            return activeRestaurante;
        }

        const restaurant = await prisma.restaurant.create({
            data:{
                ...data,
                userId
            }, select:{
                id: true,
                name: true,
                address: true,
                phone: true,
                restaurantCategory: true
            }
        });

        const userToRestaurant = await prisma.user.update({
            where: { id: userId },
            data: {
                role: Role.RESTAURANT
            }
        })

        return restaurant;
    }

    async getAll(){
        const allRestaurants = await prisma.restaurant.findMany({
            where: {active: true},
            select: {
                id: true,
                name: true,
                address: true,
                phone: true,
                restaurantCategory: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if(!allRestaurants){
            throw new Error("Erro ao buscar restaurantes");
        }

        return allRestaurants;
    }

    async getMyRestaurant(userId: number): Promise<RestaurantTypes | null>{
        const restaurant = await prisma.restaurant.findUnique({
            where: {userId},
            select: {
                id: true,
                name: true,
                cnpj: true,
                phone: true,
                address: true,
                active: true,
                restaurantCategory: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if(!restaurant){
            throw new RestaurantNotFound();
        }

        return restaurant;
    }

    async delete(restaurantId: number, userId: number){
        const restaurant = await prisma.restaurant.findUnique({
            where: {id: restaurantId}
        })

        if(!restaurant){
            throw new RestaurantNotFound();
        }

        const deleted = await prisma.restaurant.update({
            where: {id: restaurantId},
            data: {active: false}
        })

        const restaurantToUser = await prisma.user.update({
            where: {id: userId},
            data: {
                role: Role.CLIENT
            }
        })

        return deleted;
    }

    async uptdate(userId : number, data: UpdateRestaurantDTO): Promise<RestaurantTypes>{
        const {name, phone, cnpj, address, category} = data;

        if(cnpj){
            const cnpjExist = await prisma.restaurant.findUnique({
                where: {cnpj}
            })

            if(cnpjExist && cnpjExist.userId !== userId){
                throw new Error("CNPJ existente");
            }
        }

        const updatedRestaurante = await prisma.restaurant.update({
            where: { userId: userId },
            data:{
                ...(data.name && {name: name}),
                ...(data.phone && {phone: phone}),
                ...(data.address && {address: address}),
                ...(data.category && {restaurantCategoryId: category})
            },

        })

        return updatedRestaurante;
    }
}

export default new RestaurantService();