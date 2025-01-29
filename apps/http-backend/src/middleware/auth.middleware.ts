import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export function middleware(req: Request, res: Response, next: NextFunction) {
  let token: undefined | string = req.headers["authorization"] ?? "";

  if (!token || !token.startsWith("Bearer")) {
    res.status(403).json({
      message: "Unauthorized",
    });
    return;
  }

  token = token.split(" ")[1];

  if (!token) {
    res.status(403).json({
      message: "Unauthorized",
    });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
    userId: string;
  };

  if (decoded) {
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({
      message: "Unauthorized",
    });
  }
}
