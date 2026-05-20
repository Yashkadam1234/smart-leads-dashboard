import { z } from "zod";

/**
 * Register schema
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least 1 uppercase letter and 1 number"
    ),

  role: z.enum(["admin", "sales"]).optional(),
});

/**
 * Login schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});