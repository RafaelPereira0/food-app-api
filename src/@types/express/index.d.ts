declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: import("@prisma/client").Role;
      };
      restaurant?: any;
    }
  }
}

export {};