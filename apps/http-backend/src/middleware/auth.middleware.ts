import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export function middleware(req: Request, res: Response, next: NextFunction) {
  let token: undefined | string = req.headers["authorization"] ?? "";

  if (!token || !token.startsWith("Bearer ")) {
    res.status(403).json({ message: "Unauthorized: Missing token" });
    return;
  }

  token = token.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "Unauthorized: Invalid token format" });
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
