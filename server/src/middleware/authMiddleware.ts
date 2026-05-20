import {
  Request,
  Response,
  NextFunction,
} from "express";

import { ApiError } from "../utils/ApiError";
import { AuthService } from "../services/auth.service";

/**
 * Protect routes
 */
export const protect = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      throw ApiError.unauthorized(
        "Access denied. No token provided."
      );
    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
      AuthService.verifyToken(token);

    req.user = decoded;

    next();
  } catch {
    next(
      ApiError.unauthorized(
        "Invalid or expired token"
      )
    );
  }
};