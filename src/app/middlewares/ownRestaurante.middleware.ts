import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";

export async function OwnRestauranteMiddleware(req: Request, res: Response, next: NextFunction){
    const restaurant = await prisma.restaurant.findUnique({
        where: {userId: req.user!.id}
    })

    if(!restaurant){
        return res.status(403).json({message: "Não autorizado"})
    }

    req.restaurant = restaurant;
    next();
} 