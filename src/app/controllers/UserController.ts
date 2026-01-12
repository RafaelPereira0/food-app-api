import { Request, Response } from "express";
import UserService from "../services/UserService";
import { UserType } from "../types/userType";

class UserController{

    async update(req: Request, res: Response){
        try{
            const userId = req.user!.id;
            const data = req.body;
            
            const user : UserType = await UserService.update(userId, data);
            return res.status(200).json(user);
        }catch(err: any){
            return res.status(400).json({message: err.message});
        }
    }

    async delete(req: Request, res: Response){
        try{
            const userId = req.user!.id;

            const user = await UserService.delete(userId);

            return res.status(200).json(user);
        }catch(err: any){
            return res.status(400).json({message: err.message});
        }
    }
}

export default new UserController();