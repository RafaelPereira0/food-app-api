import {z} from 'zod';
import { Role } from '../app/types/role';

export const registerSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.nativeEnum(Role).optional(),
    cnpj: z.string().optional()
}).refine((data) => {
    if(data.role === Role.RESTAURANT && !data.cnpj) return false
    return true
}, {
    message: "CNPJ é obrigatório para contas de restaurantes",
    path: ["cnpj"]
});

export const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string()
})
