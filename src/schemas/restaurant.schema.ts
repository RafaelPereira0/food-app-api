import { z } from "zod";

export const restaurantSchema = z.object({
  name: z.string()
    .min(3, "O nome do restaurante deve ter no mínimo 3 caracteres")
    .max(50, "Nome muito longo"),
  
  cnpj: z.string()
    .min(14, "CNPJ inválido")
    .max(18, "CNPJ inválido"),
    
  phone: z.string()
    .min(10, "Telefone deve ter no mínimo 10 dígitos"),
    
  address: z.string()
    .min(5, "Endereço muito curto"),
    
  
  restaurantCategoryId: z.number().int()
});

export const updateRestaurantSchema = restaurantSchema.partial();