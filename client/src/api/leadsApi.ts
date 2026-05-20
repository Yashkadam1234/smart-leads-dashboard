import axiosInstance from "./axiosInstance";

import type {
  ILead,
  ILeadFilters,
  ICreateLeadInput,
  IUpdateLeadInput,
  IApiResponse,
  IPaginatedResponse,
} from "@shared/index";

export const getLeads = async (
  filters: ILeadFilters
): Promise<IPaginatedResponse<ILead[]>> => {
  const response =
    await axiosInstance.get<
      IPaginatedResponse<ILead[]>
    >("/leads", {
      params: filters,
    });

  return response.data;
};

export const getLeadById = async (
  id: string
): Promise<
  IApiResponse<ILead>
> => {
  const response =
    await axiosInstance.get<
      IApiResponse<ILead>
    >(`/leads/${id}`);

  return response.data;
};

export const createLead = async (
  data: ICreateLeadInput
): Promise<
  IApiResponse<ILead>
> => {
  const response =
    await axiosInstance.post<
      IApiResponse<ILead>
    >("/leads", data);

  return response.data;
};

export const updateLead = async (
  id: string,
  data: IUpdateLeadInput
): Promise<
  IApiResponse<ILead>
> => {
  const response =
    await axiosInstance.patch<
      IApiResponse<ILead>
    >(
      `/leads/${id}`,
      data
    );

  return response.data;
};

export const deleteLead = async (
  id: string
): Promise<
  IApiResponse<null>
> => {
  const response =
    await axiosInstance.delete<
      IApiResponse<null>
    >(`/leads/${id}`);

  return response.data;
};

export const exportLeads =
  async (
    filters: Omit<
      ILeadFilters,
      "page" | "limit"
    >
  ): Promise<void> => {
    const response =
      await axiosInstance.get(
        "/leads/export",
        {
          params: filters,
          responseType:
            "blob",
        }
      );

    const blob =
      new Blob([
        response.data,
      ]);

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download = `leads-${
      new Date()
        .toISOString()
        .split("T")[0]
    }.csv`;

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    window.URL.revokeObjectURL(
      url
    );
  };