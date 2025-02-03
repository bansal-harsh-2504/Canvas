import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export function middleware(req: Request, res: Response, next: NextFunction) {
  let token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized: Missing token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError
    ) {
      res.status(403).json({ message: "Unauthorized: Invalid token" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
    return;
  }
}
