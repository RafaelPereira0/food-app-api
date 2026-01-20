// errors/EmailAlreadyInUseError.ts
import { AppError } from "./AppError";

export class EmailAlreadyInUseError extends AppError {
  constructor() {
    super(
      "Email já está em uso",
      "EMAIL_ALREADY_IN_USE",
      409
    );
  }
}
