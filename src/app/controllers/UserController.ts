import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController{
    async update(req: Request, res: Response){
        try{
            const userId = req.user!.id;
            const data = req.body;

            const user = await UserService.update(userId, data);

            return res.status(200).json(user);
        }catch(err: any){
            return res.status(400).json({message: err.message});
        }
    }
}

export default new UserController();