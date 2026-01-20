export interface restaurantDTO {
    name: string,
    cnpj: string,
    phone: string,
    address: string,
    category: number
}


export type UpdateRestaurantDTO = Partial<restaurantDTO>;
