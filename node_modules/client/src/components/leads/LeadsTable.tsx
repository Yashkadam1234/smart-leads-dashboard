import {
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import Badge from "../ui/Badge";
import EmptyState from "../ui/EmptyState";
import ErrorState from "../ui/ErrorState";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

import { useAuth } from "../../context/AuthContext";
import { useDeleteLead } from "../../hooks/useLeads";

import type { ILead } from "@shared/index";

interface LeadsTableProps {
  leads: ILead[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onEdit?: (lead: ILead) => void;
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

export default function LeadsTable({
  leads,
  isLoading,
  isError,
  onRetry,
  onEdit,
}: LeadsTableProps) {
  const { user } = useAuth();

  const deleteMutation =
    useDeleteLead();

  const [
    selectedLead,
    setSelectedLead,
  ] = useState<ILead | null>(
    null
  );

  const isAdmin =
    user?.role === "admin";

  const handleDelete =
    async (): Promise<void> => {
      if (!selectedLead) return;

      await deleteMutation.mutateAsync(
        selectedLead.id
      );

      setSelectedLead(null);
    };

  if (isError) {
    return (
      <ErrorState
        message="Failed to load leads."
        onRetry={onRetry}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map(
          (_, index) => (
            <div
              key={index}
              className="
                h-16
                animate-pulse
                rounded-2xl
                bg-slate-800
              "
            />
          )
        )}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <EmptyState
        title="No leads found"
        description="Try changing your filters or create a new lead."
      />
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-slate-800 text-left">
              <th className="pb-4 text-sm text-slate-400">
                Name
              </th>
              <th className="pb-4 text-sm text-slate-400">
                Email
              </th>
              <th className="pb-4 text-sm text-slate-400">
                Status
              </th>
              <th className="pb-4 text-sm text-slate-400">
                Source
              </th>
              <th className="pb-4 text-sm text-slate-400">
                Created At
              </th>
              <th className="pb-4 text-right text-sm text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="
                  border-b border-slate-800/60
                  transition
                  hover:bg-cyan-500/5
                "
              >
                <td className="py-4 text-white">
                  {lead.name}
                </td>

                <td className="py-4 text-slate-300">
                  {lead.email}
                </td>

                <td className="py-4">
                  <Badge status={lead.status} />
                </td>

                <td className="py-4">
                  <Badge
                    status={lead.source}
                    variant="source"
                  />
                </td>

                <td className="py-4 text-slate-300">
                  {formatDate(lead.createdAt)}
                </td>

                <td className="py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onEdit?.(lead)
                      }
                      className="
                        rounded-xl
                        border border-cyan-500/20
                        p-2
                        text-cyan-300
                        hover:bg-cyan-500/10
                      "
                    >
                      <Pencil size={16} />
                    </button>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedLead(lead)
                        }
                        className="
                          rounded-xl
                          border border-red-500/20
                          p-2
                          text-red-300
                          hover:bg-red-500/10
                        "
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={Boolean(selectedLead)}
        title="Delete Lead"
        onClose={() =>
          setSelectedLead(null)
        }
      >
        <p className="text-slate-300">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">
            {selectedLead?.name}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() =>
              setSelectedLead(null)
            }
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            isLoading={
              deleteMutation.isPending
            }
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}