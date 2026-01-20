import { AppError } from "./AppError";

export class OrderNotFoundError extends AppError {
    constructor(){
        super(
            "Pedido(s) não encontrado(s)",
            "ORDER_NOT_FOUND",
            404
        )
    }
}