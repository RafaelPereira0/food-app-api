import {z} from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(3, "Nome do produto muito curto"),
    description: z.string().optional(),
    price: z.number().positive("O preço deve ser maior que zero"),
    productCategoryId: z.number().int("Id da categoria deve ser número inteiro")
})

export const updateProductSchema = createProductSchema.partial()
