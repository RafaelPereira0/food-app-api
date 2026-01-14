import { OrderStatus } from "../types/orderStatus"

export interface CreateOrderItemDTO{
    productId: number
    quantity: number
}

export interface CreateOrderDTO{
    restaurantId: number
    items: CreateOrderItemDTO[]
}

export interface UpdateOrderStatusDTO{
    status: OrderStatus
}
