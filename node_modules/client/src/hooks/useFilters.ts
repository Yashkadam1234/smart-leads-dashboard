import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import type {
  LeadSource,
  LeadStatus,
} from "@shared/index";

export interface IFilterState {
  status?: LeadStatus | "all";
  source?: LeadSource | "all";
  search: string;
  sortBy: "latest" | "oldest";
  page: number;
}

type FilterKey = keyof IFilterState;

const DEFAULT_FILTERS: IFilterState = {
  status: "all",
  source: "all",
  search: "",
  sortBy: "latest",
  page: 1,
};

export function useFilters() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const filters: IFilterState = useMemo(() => {
    return {
      status:
        (searchParams.get("status") as LeadStatus | null) ??
        "all",
      source:
        (searchParams.get("source") as LeadSource | null) ??
        "all",
      search: searchParams.get("search") ?? "",
      sortBy:
        (searchParams.get("sortBy") as "latest" | "oldest" | null) ??
        "latest",
      page: Number(searchParams.get("page") ?? 1),
    };
  }, [searchParams]);

  const updateParams = (
    nextFilters: IFilterState
  ): void => {
    const params = new URLSearchParams();

    if (
      nextFilters.status &&
      nextFilters.status !== "all"
    ) {
      params.set("status", nextFilters.status);
    }

    if (
      nextFilters.source &&
      nextFilters.source !== "all"
    ) {
      params.set("source", nextFilters.source);
    }

    if (nextFilters.search.trim()) {
      params.set("search", nextFilters.search.trim());
    }

    if (nextFilters.sortBy !== "latest") {
      params.set("sortBy", nextFilters.sortBy);
    }

    if (nextFilters.page > 1) {
      params.set("page", String(nextFilters.page));
    }

    setSearchParams(params);
  };

  const setFilter = <K extends FilterKey>(
    key: K,
    value: IFilterState[K]
  ): void => {
    const nextFilters: IFilterState = {
      ...filters,
      [key]: value,
      page: key === "page" ? Number(value) : 1,
    };

    updateParams(nextFilters);
  };

  const setPage = (page: number): void => {
    updateParams({
      ...filters,
      page,
    });
  };

  const resetFilters = (): void => {
    updateParams(DEFAULT_FILTERS);
  };

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.source !== "all" ||
    Boolean(filters.search.trim()) ||
    filters.sortBy !== "latest";

  return {
    filters,
    setFilter,
    resetFilters,
    setPage,
    hasActiveFilters,
  };
}