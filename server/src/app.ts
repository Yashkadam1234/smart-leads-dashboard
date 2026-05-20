import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import authRoutes
from "./routes/auth.routes";

import leadsRoutes
from "./routes/leads.routes";

import { config }
from "./config/env";

import { errorMiddleware }
from "./middleware/errorMiddleware";

const app = express();

/**
 * Security middleware
 */
app.use(helmet());

/**
 * CORS
 */
app.use(
  cors({
    origin:
      config.CLIENT_URL,
    credentials: true,
  })
);

/**
 * Parsers
 */
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 * Logging
 */
app.use(
  morgan("dev")
);

/**
 * Routes
 */
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/leads",
  leadsRoutes
);

/**
 * 404 handler
 */
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
/**
 * Global error middleware
 */
app.use(
  errorMiddleware
);

export default app;