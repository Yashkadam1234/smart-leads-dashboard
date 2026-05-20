import axiosInstance from "./axiosInstance";

import type {
  IRegisterInput,
  ILoginInput,
  IUser,
} from "@shared/index";

export interface AuthResult {
  token: string;
  user: IUser;
}

interface AuthApiResponse {
  success: boolean;
  message: string;
  data: AuthResult;
}

export const authApi = {
  register: async (
    data: IRegisterInput
  ): Promise<AuthResult> => {
    const response =
      await axiosInstance.post<AuthApiResponse>(
        "/auth/register",
        data
      );

    return response.data.data;
  },

  login: async (
    data: ILoginInput
  ): Promise<AuthResult> => {
    const response =
      await axiosInstance.post<AuthApiResponse>(
        "/auth/login",
        data
      );

    return response.data.data;
  },

  getMe: async (): Promise<IUser> => {
    const response =
      await axiosInstance.get<{
        success: boolean;
        message: string;
        data: IUser;
      }>("/auth/me");

    return response.data.data;
  },
};