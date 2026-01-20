import prisma from "../prisma/client";

class CategoryService{

    async getRestaurantByCategory(categoryId: number){
        const restaurants = await prisma.restaurant.findMany({
            where: {
                restaurantCategoryId: categoryId,
                active: true
            },
            include: {restaurantCategory: true}
        })

        if(!restaurants){
            throw new Error("Nenhum restaurante dessa categoria");
        }

        return restaurants
    }

    async createRestaurantCategory(name: string){
        return await prisma.restaurantCategory.create({
            data: {name}
        })
    }

    async createProductCategory(name: string, restaurantId: number){
        const product = await prisma.productCategory.create({
            data: {name, restaurantId}
        })

        return product
    }
}

export default new CategoryService();