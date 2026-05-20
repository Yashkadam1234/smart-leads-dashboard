import {
  Request,
  Response,
  NextFunction,
} from "express";

import { LeadService }
from "../services/lead.service";

import { exportLeadsToCSV }
from "../utils/csvExporter";

/**
 * Export leads CSV
 */
export const exportLeadsCSV =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user =
        req.user!;

      const result =
        await LeadService.getAllLeads(
          {
            ...req.query,
            limit: 100000,
            page: 1,
          },
          user.id,
          user.role
        );

      const csv =
        exportLeadsToCSV(
          result.leads
        );

      const date =
        new Date()
          .toISOString()
          .split("T")[0];

      res.setHeader(
        "Content-Type",
        "text/csv"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="leads-${date}.csv"`
      );

      res.status(200).send(csv);
    } catch (error) {
      next(error);
    }
  };