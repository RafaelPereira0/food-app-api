import { AppError } from "./AppError";

export class ProductNotFoundError extends AppError {
  constructor() {
    super(
      "Um ou mais produtos informados não foram encontrados.",
      "PRODUCT_NOT_FOUND",
      404
    );
  }
}
