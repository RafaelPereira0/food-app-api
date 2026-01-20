export interface RestaurantTypes {
    id: number,
    name: string,
    address: string,
    phone: string,
    RestaurantCategory?: {
        name: string
    }
}