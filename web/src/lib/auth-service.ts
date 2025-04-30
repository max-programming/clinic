import { api } from "./api";
import {
  ApiResponse,
  LoginUserRequest,
  LoginUserResponseData,
  RegisterUserRequest,
  RegisterUserResponseData,
  UserResponseData,
} from "../types/auth";

export const authService = {
  register: async (
    data: RegisterUserRequest
  ): Promise<RegisterUserResponseData> => {
    const response = await api.post<ApiResponse<RegisterUserResponseData>>(
      "/register",
      data
    );

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    return response.data.data;
  },

  login: async (data: LoginUserRequest): Promise<LoginUserResponseData> => {
    const response = await api.post<ApiResponse<LoginUserResponseData>>(
      "/login",
      data
    );

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    if (response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
    }

    return response.data.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: async (): Promise<UserResponseData | null> => {
    try {
      const response = await api.get<ApiResponse<UserResponseData>>("/me");

      if (!response.data.success) {
        throw new Error(response.data.error);
      }

      return response.data.data;
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem("token") !== null;
  },
};
