import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import SearchBar from "../components/common/SearchBar";
import ExportButton from "../components/common/ExportButton";
import Pagination from "../components/common/Pagination";
import LeadFilters from "../components/leads/LeadFilters";
import LeadsTable from "../components/leads/LeadsTable";
import LeadForm from "../components/leads/LeadForm";
import Modal from "../components/ui/Modal";

import { useFilters } from "../hooks/useFilters";
import {
  useExportLeads,
  useLeads,
} from "../hooks/useLeads";

import Button from "../components/ui/Button";

import type {
  ILead,
  ILeadFilters,
} from "@shared/index";

export default function LeadsPage() {
  const {
    filters,
    setFilter,
    resetFilters,
    setPage,
    hasActiveFilters,
  } = useFilters();

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingLead, setEditingLead] =
    useState<ILead | null>(null);

  const queryFilters: ILeadFilters =
    useMemo(() => {
      return {
        status:
          filters.status === "all"
            ? undefined
            : filters.status,
        source:
          filters.source === "all"
            ? undefined
            : filters.source,
        search:
          filters.search || undefined,
        sort: filters.sortBy,
        page: filters.page,
        limit: 10,
      };
    }, [filters]);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useLeads(queryFilters);

  const exportMutation =
    useExportLeads();

  const leads: ILead[] =
    data?.data ?? [];

  const totalCount =
    data?.pagination?.total ??
    leads.length;

  const totalPages =
    data?.pagination?.totalPages ??
    Math.max(
      1,
      Math.ceil(totalCount / 10)
    );

  const openCreateModal =
    (): void => {
      setEditingLead(null);
      setIsModalOpen(true);
    };

  const openEditModal =
    (lead: ILead): void => {
      setEditingLead(lead);
      setIsModalOpen(true);
    };

  const closeModal =
    (): void => {
      setIsModalOpen(false);
      setEditingLead(null);
    };

  const handleExport =
    async (): Promise<void> => {
      await exportMutation.mutateAsync({
        status:
          queryFilters.status,
        source:
          queryFilters.source,
        search:
          queryFilters.search,
        sort:
          queryFilters.sort,
      });
    };

  return (
    <DashboardLayout title="Lead Pipeline">
      <div className="space-y-6">
        {/* Header */}
        <div
          className="
            flex flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div>
            <div className="flex items-center gap-3">
              <h1
                className="
                  font-space
                  text-3xl
                  font-bold
                  text-white
                "
              >
                Lead Pipeline
              </h1>

              <span
                className="
                  rounded-full
                  border border-cyan-500/30
                  bg-cyan-500/10
                  px-3 py-1
                  text-xs
                  font-mono
                  uppercase
                  tracking-wider
                  text-cyan-300
                "
              >
                {totalCount} total
              </span>
            </div>

            <p className="mt-2 text-slate-400">
              Search, filter, create, edit and manage leads.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ExportButton
              filters={{
                status: queryFilters.status,
                source: queryFilters.source,
                search: queryFilters.search,
                sort: queryFilters.sort,
              }}
            />
            <Button
              onClick={openCreateModal}
            >
              <Plus size={16} />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Search */}
        <SearchBar
          value={filters.search}
          onChange={(value) =>
            setFilter(
              "search",
              value
            )
          }
        />

        {/* Filters */}
        <LeadFilters
          filters={filters}
          setFilter={setFilter}
          resetFilters={resetFilters}
          hasActiveFilters={
            hasActiveFilters
          }
        />

        {/* Table */}
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            p-6
            backdrop-blur-xl
          "
        >
          <LeadsTable
            leads={leads}
            isLoading={isLoading}
            isError={isError}
            onRetry={() =>
              refetch()
            }
            onEdit={openEditModal}
          />

          {!isLoading &&
            !isError &&
            leads.length > 0 && (
              <Pagination
                currentPage={
                  filters.page
                }
                totalPages={
                  totalPages
                }
                onPageChange={
                  setPage
                }
              />
            )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        title={
          editingLead
            ? "Edit Lead"
            : "Add Lead"
        }
        onClose={closeModal}
      >
        <LeadForm
          lead={editingLead}
          onSuccess={closeModal}
          onCancel={closeModal}

        />
      </Modal>
    </DashboardLayout>
  );
}