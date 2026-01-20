
import { AppError } from "./AppError";

export class DifferentRestaurantError extends AppError {
  constructor() {
    super(
      "Não é possível misturar produtos de restaurantes diferentes no mesmo pedido.",
      "DIFFERENT_RESTAURANT",
      400
    );
  }
}
