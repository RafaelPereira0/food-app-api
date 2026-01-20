
import { Request, Response, NextFunction } from "express";
import {ZodObject, ZodError} from 'zod'; 

export const validate = (schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            req.body = await schema.parseAsync(req.body);
            return next()
        }catch(err){
            if(err instanceof ZodError){

                const details = err.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }))

                return res.status(400).json({
                    status: "Erro",
                    message: "Dados inválidos",
                    errors: details
                })
            }
            return res.status(500).json({message: "Erro interno na validação"})
        }
    }
}