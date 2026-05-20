import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { config } from "../config/env";

/**
 * Global error handler
 */
export const errorMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  console.error(err);

  /**
   * Custom API error
   */
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(config.NODE_ENV === "development" && {
        stack: err.stack,
      }),
    });

    return;
  }

  /**
   * Mongoose validation error
   */
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map(
      (e) => e.message
    );

    res.status(400).json({
      success: false,
      message: "Validation Error",
      errors,
    });

    return;
  }

  /**
   * Invalid Mongo ObjectId
   */
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: "Invalid resource ID",
    });

    return;
  }

  /**
   * JWT Errors
   */
  if (err instanceof jwt.JsonWebTokenError) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });

    return;
  }

  if (err instanceof jwt.TokenExpiredError) {
    res.status(401).json({
      success: false,
      message: "Token expired",
    });

    return;
  }

  /**
   * Fallback error
   */
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    ...(config.NODE_ENV === "development" && {
      stack: err instanceof Error ? err.stack : undefined,
    }),
  });
};