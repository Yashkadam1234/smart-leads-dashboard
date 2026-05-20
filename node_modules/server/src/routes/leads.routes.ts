import { Router } from "express";

import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} from "../controllers/leads.controller";

import { exportLeadsCSV }
from "../controllers/export.controller";

import { protect } from "../middleware/authMiddleware";

import { requireRole  } from "../middleware/rbacMiddleware";

import { validate } from "../middleware/validationMiddleware";

import {
  createLeadSchema,
  updateLeadSchema,
} from "../validators/lead.validator";

const router = Router();

/**
 * Protect all lead routes
 */
router.use(protect);

/**
 * GET /api/leads
 */
router.get(
  "/",
  getLeads
);

/**
 * POST /api/leads
 */
router.post(
  "/",
  validate(
    createLeadSchema
  ),
  createLead
);

router.get(
  "/export",
  requireRole("admin"),
  exportLeadsCSV
);

 
router.get(
  "/:id",
  getLeadById
);

/**
 * PATCH /api/leads/:id
 */
router.patch(
  "/:id",
  validate(
    updateLeadSchema
  ),
  updateLead
);

/**
 * DELETE /api/leads/:id
 * Admin only
 */
router.delete(
  "/:id",
  requireRole("admin"),
  deleteLead
);

export default router;