import { apiClient } from "./client";
import type { LoginRequest, Token } from "../types/auth.types";
import { paths } from "@/config/paths";

export const authApi = {
  login: async (data: LoginRequest): Promise<Token> => {
    const response = await apiClient.post<Token>('https://localhost:7100/api/auth/login', data);
    return response.data;
  }
};
