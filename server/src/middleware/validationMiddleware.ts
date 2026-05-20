import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ApiResponse } from "../utils/ApiResponse";

/**
 * Validate request body with Zod schema
 */
export const validate =
  (schema: ZodSchema) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map(
          (err) => `${err.path.join(".")}: ${err.message}`
        );

        ApiResponse.error(
          res,
          "Validation failed",
          422,
          errors
        );

        return;
      }

      next(error);
    }
  };