import { Request, Response } from "express";
import { CreateOrderDTO } from "../dtos/order.dto";
import OrderService from "../services/OrderService";

class OrderController{

    async create(req: Request, res: Response){
        try{
            const data: CreateOrderDTO = req.body;
            const userId = req.user!.id;

            if(!data.items || data.items.length === 0){
                return res.status(400).json({message: "O pedido deve conter pelo menos 1 item"})
            }

            const order = await OrderService.create(userId, data.restaurantId, data.items)

            return res.status(201).json(order);
        }catch(err: any){
            return res.status(400).json({message: err.message});
        }
    }

    async update(req: Request, res: Response){
        try{
            const id = req.params.id;
            const {status} = req.body;

            const restaurantId = req.restaurant!.id;

            const updatedOrder = await OrderService.updateStatus(restaurantId, Number(id), status);

            return res.status(200).json(updatedOrder)
        }catch(err: any){
            return res.status(400).json({message: err.message})
        }
    }

    async listForClient(req: Request, res: Response){
        try{
            const id = req.user!.id;

            const listOrder = await OrderService.getAllClient(id);

            return res.status(200).json(listOrder);
        }catch(err: any){
            return res.status(400).json({message: err.message});
        }
    }

    async listForRestaurant(req: Request, res: Response){
        try{

        }catch(err:any){
            return res.status(400).json({message: err.message});
        }
    }
}

export default new OrderController()