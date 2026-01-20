import {z} from 'zod';
import { OrderStatus } from '../app/types/orderStatus';

export const createOrderSchema = z.object({
    restaurantId: z.number(),
    items: z.array(z.object({
        productId: z.number(),
        quantity: z.number().int().positive().min(1, "O pedido deve ter pelo menos 1 item")
    }))

})

export const updateOrderSchema = z.object({
    status: z.nativeEnum(OrderStatus)
})
