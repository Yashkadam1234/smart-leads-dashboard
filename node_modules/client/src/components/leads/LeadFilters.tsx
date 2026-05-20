import Badge from "../ui/Badge";

import type {
  LeadSource,
  LeadStatus,
} from "@shared/index";
import type { IFilterState } from "../../hooks/useFilters";

interface LeadFiltersProps {
  filters: IFilterState;
  setFilter: <K extends keyof IFilterState>(
    key: K,
    value: IFilterState[K]
  ) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

const statusOptions: Array<{
  label: string;
  value: LeadStatus | "all";
}> = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Qualified", value: "qualified" },
  { label: "Lost", value: "lost" },
];

const sourceOptions: Array<{
  label: string;
  value: LeadSource | "all";
}> = [
  { label: "All", value: "all" },
  { label: "Website", value: "website" },
  { label: "Instagram", value: "instagram" },
  { label: "Referral", value: "referral" },
];

export default function LeadFilters({
  filters,
  setFilter,
  resetFilters,
  hasActiveFilters,
}: LeadFiltersProps) {
  const activeCount =
    Number(filters.status !== "all") +
    Number(filters.source !== "all") +
    Number(Boolean(filters.search.trim())) +
    Number(filters.sortBy !== "latest");

  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/5
        p-4
        backdrop-blur-xl
      "
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          <select
            value={filters.status}
            onChange={(event) =>
              setFilter(
                "status",
                event.target.value as LeadStatus | "all"
              )
            }
            className="
              h-11 rounded-xl
              border border-white/10
              bg-[#0D1326]
              px-4 text-sm text-white
              outline-none
              focus:border-cyan-400/50
            "
          >
            {statusOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filters.source}
            onChange={(event) =>
              setFilter(
                "source",
                event.target.value as LeadSource | "all"
              )
            }
            className="
              h-11 rounded-xl
              border border-white/10
              bg-[#0D1326]
              px-4 text-sm text-white
              outline-none
              focus:border-cyan-400/50
            "
          >
            {sourceOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filters.sortBy}
            onChange={(event) =>
              setFilter(
                "sortBy",
                event.target.value as "latest" | "oldest"
              )
            }
            className="
              h-11 rounded-xl
              border border-white/10
              bg-[#0D1326]
              px-4 text-sm text-white
              outline-none
              focus:border-cyan-400/50
            "
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <Badge
              status={`${activeCount} active`}
            />
          )}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="
                rounded-xl
                border border-cyan-500/30
                px-4 py-2
                text-sm text-cyan-300
                hover:bg-cyan-500/10
              "
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}