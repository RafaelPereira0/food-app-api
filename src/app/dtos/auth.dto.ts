import { Role } from "../types/role"

export interface RegisterDTO{
    name: string,
    email: string,
    password:string,
    phone?: string,
    address?: string
    role?: Role
    cnpj? : string

}

export interface LoginDTO{
    email: string,
    password:string
}