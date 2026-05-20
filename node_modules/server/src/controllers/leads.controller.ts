import { Request, Response, NextFunction } from "express";
import { LeadService } from "../services/lead.service";
import { ApiResponse } from "../utils/ApiResponse";

/**
 * Helper to normalize Express params/query values
 */
const normalize = (value: string | string[] | undefined): string => {
  return Array.isArray(value) ? value[0] : value ?? "";
};

/**
 * Get all leads
 */
export const getLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user!;

    const result = await LeadService.getAllLeads(
      req.query,
      user.id,
      user.role
    );

    ApiResponse.paginated(
      res,
      result.leads,
      result.pagination,
      "Leads fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get lead by ID
 */
export const getLeadById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user!;
    const leadId = normalize(req.params.id);

    const lead = await LeadService.getLeadById(
      leadId,
      user.id,
      user.role
    );

    ApiResponse.success(res, lead, "Lead fetched successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * Create lead
 */
export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user!;

    const lead = await LeadService.createLead(req.body, user.id);

    ApiResponse.success(res, lead, "Lead created successfully", 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Update lead
 */
export const updateLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user!;
    const leadId = normalize(req.params.id);

    const lead = await LeadService.updateLead(
      leadId,
      req.body,
      user.id,
      user.role
    );

    ApiResponse.success(res, lead, "Lead updated successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * Delete lead
 */
export const deleteLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user!;
    const leadId = normalize(req.params.id);

    const result = await LeadService.deleteLead(
      leadId,
      user.id,
      user.role
    );

    ApiResponse.success(res, result, "Lead deleted successfully");
  } catch (error) {
    next(error);
  }
};
