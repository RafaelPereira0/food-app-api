import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  sub: number;
  role: Role;
}

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "Não autorizado" });
  }


  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
    ) as unknown as JwtPayload;

    req.user = {
      id: Number(decoded.sub),
      role: decoded.role
    };


    return next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
