
import { LoginDTO, RegisterDTO } from "../dtos/auth.dto";
import prisma from "../prisma/client";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { Role } from "../types/role";

class AuthService {
    async register(data: RegisterDTO) {
        const { name, email, password, role, cnpj, phone, address } = data;
        const normalizedEmail = email.toLowerCase();

        const existUser = await prisma.user.findUnique({
            where: { email: normalizedEmail }
        })

        if (existUser) {
            throw new Error("Email já cadastrado")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        if (role === Role.RESTAURANT) {
            if (!cnpj) throw new Error("CNPJ é obrigatório para restaurantes")

            const existRestaurante = await prisma.restaurant.findUnique({
                where: { cnpj }
            })

            if (existRestaurante) throw new Error("CNPJ já cadastrado")

            if (!phone || !address) {
                throw new Error("Telefone e endereço são obrigatórios para restaurantes")
            }


            const restaurant = await prisma.restaurant.create({
                    data: {
                        name,
                        cnpj,
                        phone: phone,
                        address: address
                    }
                })
            
            const user = await prisma.user.create({
                data: {
                    name,
                    email: normalizedEmail,
                    password: hashedPassword,
                    role,
                    phone: phone, 
                    address: address,
                    restaurantId: restaurant.id
                }
            })

            return {user, restaurant}
        }
        const user = await prisma.user.create({
            data: {
                name,
                email: normalizedEmail,
                password: hashedPassword,
                role,
                phone: phone,  
                address: address 
            }
        })

        return user
    }

    async login(data: LoginDTO){
        const {email, password} = data
        const normalizedEmail = email.toLocaleLowerCase();

        const user = await prisma.user.findUnique({
            where: {email: normalizedEmail},
            include: {restaurant:true}
        })

        if(!user){
            throw new Error("Email não cadastrado")
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            throw new Error("Email ou senha inválidos");
        }

        const token = jwt.sign({
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET as string,
        {
            subject: String(user.id),
            expiresIn: '1d'
        }
        )

        return {
            token,
            user:{
                name: user.name,
                email: user.email,
                role: user.role,
                restaurantId: user.restaurantId
            }
        }
    }
}

export default new AuthService()
