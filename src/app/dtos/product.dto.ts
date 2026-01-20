export interface CreateProductDTO{
    productCategoryId: any;
    name: string,
    description?: string,
    price: number
}

export type UpdateProductDTO = Partial<CreateProductDTO>;