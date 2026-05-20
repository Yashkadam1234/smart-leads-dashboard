import { stringify } from "csv-stringify/sync";

import type { ILeadDocument }
from "../models/Lead.model";

/**
 * Format date DD/MM/YYYY HH:mm
 */
const formatDate = (
  date: Date
): string => {
  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  ).format(date);
};

/**
 * Export leads to CSV
 */
export const exportLeadsToCSV =
  (
    leads: ILeadDocument[]
  ): string => {
    const rows = leads.map(
      (lead) => ({
        ID:
          lead._id.toString(),

        Name:
          lead.name,

        Email:
          lead.email,

        Status:
          lead.status,

        Source:
          lead.source,

        "Created At":
          formatDate(
            lead.createdAt
          ),
      })
    );

    return stringify(rows, {
      header: true,
    });
  };