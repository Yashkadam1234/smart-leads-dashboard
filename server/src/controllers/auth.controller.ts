import {
  Request,
  Response,
  NextFunction,
} from "express";

import { AuthService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

/**
 * Register controller
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result =
      await AuthService.register(req.body);

    ApiResponse.success(
      res,
      result,
      "User registered successfully",
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Login controller
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result =
      await AuthService.login(req.body);

    ApiResponse.success(
      res,
      result,
      "Login successful"
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user
 */
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    ApiResponse.success(
      res,
      req.user,
      "Current user fetched"
    );
  } catch (error) {
    next(error);
  }
};