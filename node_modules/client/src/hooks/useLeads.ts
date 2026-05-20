import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createLead,
  deleteLead,
  exportLeads,
  getLeads,
  updateLead,
} from "../api/leadsApi";

import type {
  ICreateLeadInput,
  ILeadFilters,
  IUpdateLeadInput,
} from "@shared/index";

export const leadsQueryKey = [
  "leads",
];

export function useLeads(
  filters: ILeadFilters
) {
  return useQuery({
    queryKey: [
      ...leadsQueryKey,
      filters,
    ],
    queryFn: () =>
      getLeads(filters),
  });
}

export function useCreateLead() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      (
        data: ICreateLeadInput
      ) => createLead(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          leadsQueryKey,
      });
    },
  });
}

export function useUpdateLead() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      ({
        id,
        data,
      }: {
        id: string;
        data: IUpdateLeadInput;
      }) =>
        updateLead(
          id,
          data
        ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          leadsQueryKey,
      });
    },
  });
}

export function useDeleteLead() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      (id: string) =>
        deleteLead(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          leadsQueryKey,
      });
    },
  });
}

export function useExportLeads() {
  return useMutation({
    mutationFn:
      (
        filters: Omit<
          ILeadFilters,
          "page" | "limit"
        >
      ) =>
        exportLeads(
          filters
        ),
  });
}