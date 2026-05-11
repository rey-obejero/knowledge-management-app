import { apiClient } from "@/lib/api-client";
import type { LoginRequest, Token } from "../types/auth.types";

const AUTH_API_BASE_URL = '/auth';

export const authApi = {
  login: async (data: LoginRequest): Promise<Token> => {
    const response = await apiClient.post<Token>(`${AUTH_API_BASE_URL}/login`, data);
    return response.data;
  }
};
