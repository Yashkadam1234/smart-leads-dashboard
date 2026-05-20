import { Router } from "express";

import {
  register,
  login,
  getMe,
} from "../controllers/auth.controller";

import { protect } from "../middleware/authMiddleware";

import { validate } from "../middleware/validationMiddleware";

import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator";

const router = Router();

/**
 * Auth Routes
 */
router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/me",
  protect,
  getMe
);

export default router;