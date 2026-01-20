
import { AppError } from "./AppError";

export class UserNotFoundError extends AppError {
  constructor() {
    super(
      "Usuário não encontrado",
      "USER_NOT_FOUND",
      404
    );
  }
}
