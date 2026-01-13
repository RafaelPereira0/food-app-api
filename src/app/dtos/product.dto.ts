export interface CreateProductDTO{
    name: string,
    description?: string,
    price: number
}

export type UpdateProductDTO = Partial<CreateProductDTO>;