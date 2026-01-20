
import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {
  constructor() {
    super(
      "Usuário não autenticado",
      "UNAUTHORIZED",
      401
    );
  }
}
