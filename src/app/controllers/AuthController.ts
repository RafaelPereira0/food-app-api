import { Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "../dtos/auth.dto";
import AuthService from "../services/AuthService";

class AuthController{
    async register(req: Request, res: Response){
        try{
            const data: RegisterDTO = req.body;

            const user = await AuthService.register(data);
           
            return res.status(200).json({
                message: "Usuário registrado com sucesso"
            })
        }catch(err: any){
            return res.status(400).json({
                message: err.message
            })
        }
    }

    async login(req: Request, res: Response){
        try{
            const data: LoginDTO = req.body;
            const result = await AuthService.login(data)

            return res.status(200).json(result)
        }catch(err: any){
            return res.status(401).json({
                message: err.message
            })
        }
    }
}

export default new AuthController