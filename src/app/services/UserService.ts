import { UpdateUserDTO } from "../dtos/user.dto";
import prisma from "../prisma/client";

class UserService{
    async update(userId: number, data: UpdateUserDTO){
        const {name, email, phone, address} = data;
        
        if(!userId){
            throw new Error("ID não informado");
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
}

export default new UserService();