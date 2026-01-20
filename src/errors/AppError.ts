export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(
    message: string,
    code = "BAD_REQUEST",
    statusCode = 400
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}
