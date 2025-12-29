
import { RegisterDTO } from "../dtos/auth.dto";
import prisma from "../prisma/client";
import bcrypt from 'bcrypt'

class AuthService {
    async register(data: RegisterDTO) {
        const { name, email, password, role, cnpj, phone, address } = data;
        const normalizedEmail = email.toLowerCase();

        const existUser = await prisma.user.findUnique({
            where: { email: normalizedEmail }
        })
        console.log(existUser)
        if (existUser) {
            throw new Error("Email já cadastrado")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        if (role === "RESTAURANT") {
            if (!cnpj) throw new Error("CNPJ é obrigatório para restaurantes")

            const existRestaurante = await prisma.restaurant.findUnique({
                where: { cnpj }
            })
            console.log(existRestaurante)
            if (existRestaurante) throw new Error("CNPJ já cadastrado")


            const restaurant = await prisma.restaurant.create({
                    data: {
                        name,
                        cnpj,
                        phone: phone || "",
                        address: address || ""
                    }
                })
            
            const user = await prisma.user.create({
                data: {
                    name,
                    email: normalizedEmail,
                    password: hashedPassword,
                    role,
                    phone: phone || "", 
                    address: address || "",
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
                phone: phone || "",  
                address: address || "" 
            }
        })

        return user
    }
}

export default new AuthService()
