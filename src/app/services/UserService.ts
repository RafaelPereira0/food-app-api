import { EmailAlreadyInUseError } from "../../errors/EmailAlreadyInUseError";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { UserNotFoundError } from "../../errors/UserNotFoundError";
import { UpdateUserDTO } from "../dtos/user.dto";
import prisma from "../prisma/client";
import { UserType } from "../types/userType";

class UserService{

    async update(userId: number, data: UpdateUserDTO): Promise<UserType>{
        const {name, email, phone, address} = data;
        
        if(!userId){
            throw new UnauthorizedError();
        }
        if(email){
            const emailExist = await prisma.user.findUnique({
                where: {email}
            });

            if(emailExist && emailExist.id !== userId){
                throw new EmailAlreadyInUseError();
            }
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(data.name && {name : name}),
                ...(data.email && { email: email }),
                ...(data.phone !== undefined && { phone: phone }),
                ...(data.address !== undefined && { address: address }),
            },
            select:{
                name: true,
                email: true
            }
        })

        return user;
    }

    async delete(userId: number){
        if(!userId){
            throw new UnauthorizedError();
        }

        const existUser = await prisma.user.findUnique({
            where: {id: userId}
        });

        if(!existUser){
            throw new UserNotFoundError();
        }

        const deletedUser = await prisma.user.delete({
            where: {id: userId}
        })

        return deletedUser;
    }
}

export default new UserService();