import { AppError } from "./AppError";

export class RestaurantNotFound extends AppError {
  constructor() {
    super(
      "Restaurante informado não encontrado.",
      "RESTAURANT_NOT_FOUND",
      404
    );
  }
}
