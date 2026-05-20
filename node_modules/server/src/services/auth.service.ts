import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config/env";
import { UserModel } from "../models/User.model";
import { ApiError } from "../utils/ApiError";

import type {
  IRegisterInput,
  ILoginInput,
  IUserPayload,
} from "../../../shared/types";

/**
 * Auth Service
 */
export class AuthService {
  /**
   * Generate JWT token
   */
  static generateToken(payload: IUserPayload): string {
    return jwt.sign(
      payload,
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRES_IN,
      } as SignOptions
    );
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token: string): IUserPayload {
    return jwt.verify(
      token,
      config.JWT_SECRET
    ) as IUserPayload;
  }

  /**
   * Register new user
   */
  static async register(input: IRegisterInput) {
    const existingUser = await UserModel.findOne({
      email: input.email,
    });

    if (existingUser) {
      throw ApiError.badRequest(
        "User already exists"
      );
    }

    const user = await UserModel.create(input);

    const payload: IUserPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = this.generateToken(payload);

    return {
      token,
      user: { 
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  /**
   * Login user
   */
  static async login(input: ILoginInput) {
    const user = await UserModel.findOne({
      email: input.email,
    });

    if (!user) {
      throw ApiError.unauthorized(
        "Invalid credentials"
      );
    }

    const isMatch =
      await user.comparePassword(
        input.password
      );

    if (!isMatch) {
      throw ApiError.unauthorized(
        "Invalid credentials"
      );
    }

    const payload: IUserPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = this.generateToken(payload);

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}