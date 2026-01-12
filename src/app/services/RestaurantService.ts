import { restaurantDTO } from "../dtos/restaurant.dto";
import prisma from "../prisma/client";
import { RestaurantTypes } from "../types/restaurantTypes";


class RestaurantService{
    async create(userId: number, data: restaurantDTO){
        const alreadyHasRestaurant = await prisma.restaurant.findUnique({
            where: {userId}
        })

        if(alreadyHasRestaurant){
            throw new Error("Usuário já possui um restaurante");
        }

        const restaurant = await prisma.restaurant.create({
            data:{
                ...data,
                userId
            }, select:{
                id: true,
                name: true,
                address: true,
                phone: true
            }
        });

        return restaurant;
    }

    async getAll(){
        const allRestaurants = await prisma.restaurant.findMany({
            where: {active: true},
            select: {
                id: true,
                name: true,
                address: true,
                phone: true
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
                address: true
            }
        })

        if(!restaurant){
            throw new Error("Restaurante não encontrado");
        }

        return restaurant;
    }

    async delete(restaurantId: number){
        const restaurant = await prisma.restaurant.findUnique({
            where: {id: restaurantId}
        })

        if(!restaurant){
            throw new Error("Restaurante não encontrado");
        }

        const deleted = await prisma.restaurant.update({
            where: {id: restaurantId},
            data: {active: false}
        })

        return deleted;
    }

    async uptdate(userId : number, data: restaurantDTO): Promise<RestaurantTypes>{
        const {name, phone, cnpj, address} = data;

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
                ...(data.address && {address: address})
            },

        })

        return updatedRestaurante;
    }
}

export default new RestaurantService();