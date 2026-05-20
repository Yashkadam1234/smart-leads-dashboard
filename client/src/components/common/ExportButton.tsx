import { Download } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { exportLeads } from "../../api/leadsApi";
import { useState } from "react";

import type { ILeadFilters } from "@shared/index";

interface ExportButtonProps {
  filters: Omit<ILeadFilters, "page" | "limit">;
}

export default function ExportButton({
  filters,
}: ExportButtonProps) {
  const { user } = useAuth();
  const [isExporting, setIsExporting] =
    useState(false);

  if (user?.role !== "admin") {
    return null;
  }

  const handleExport =
    async (): Promise<void> => {
      try {
        setIsExporting(true);

        await exportLeads(filters);

        toast.success(
          "CSV exported successfully"
        );
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Export failed"
        );
      } finally {
        setIsExporting(false);
      }
    };

  return (
    <div
      title="Export matching leads as CSV"
    >
      <Button
        variant="secondary"
        onClick={handleExport}
        isLoading={isExporting}
        disabled={isExporting}
      >
        <Download size={16} />
        Export
      </Button>
    </div>
  );
}