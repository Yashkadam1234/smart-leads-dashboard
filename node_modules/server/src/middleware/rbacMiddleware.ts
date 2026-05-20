import {
  Request,
  Response,
  NextFunction,
} from "express";

import type {
  UserRole,
} from "../../../shared/types";

import { ApiError } from "../utils/ApiError";

/**
 * Role-based access control
 */
export const requireRole =
  (...roles: UserRole[]) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ): void => {
    const user = req.user;

    if (!user) {
      return next(
        ApiError.unauthorized(
          "Unauthorized"
        )
      );
    }

    if (
      !roles.includes(
        user.role
      )
    ) {
      return next(
        ApiError.forbidden(
          "Forbidden"
        )
      );
    }

    next();
  };