import { UpdateUserDTO } from "../dtos/user.dto";
import prisma from "../prisma/client";

class UserService{
    async update(userId: number, data: UpdateUserDTO){
        const {name, email, phone, address} = data;
        
        if(!userId){
            throw new Error("Usuário não está logado");
        }
        if(email){
            const emailExist = await prisma.user.findUnique({
                where: {email}
            });

            if(emailExist && emailExist.id !== userId){
                throw new Error("Email já está em uso");
            }
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(data.name && {name : name}),
                ...(data.email && { email: email }),
                ...(data.phone !== undefined && { phone: phone }),
                ...(data.address !== undefined && { address: address }),
            }
        })

        return user;
    }

    async delete(userId: number){
        if(!userId){
            throw new Error("Usuário não está logado");
        }

        const existUser = await prisma.user.findUnique({
            where: {id: userId}
        });

        if(!existUser){
            throw new Error("Usuário não encontrado");
        }

        const deletedUser = await prisma.user.delete({
            where: {id: userId}
        })

        return deletedUser;
    }
}

export default new UserService();