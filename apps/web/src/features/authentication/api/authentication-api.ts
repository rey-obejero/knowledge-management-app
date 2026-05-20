import { apiClient } from '@/lib/api-client';
import type {
  AuthenticationResponse,
  LoginRequest,
} from '../types/authentication.types';
import type { User } from '@/types/api';

const API_AUTHENTICATION_URL = '/authentication';

export const authenticationApi = {
  login: async (data: LoginRequest): Promise<AuthenticationResponse> => {
    const response = await apiClient.post<AuthenticationResponse>(
      `${API_AUTHENTICATION_URL}/login`,
      data,
    );
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get(`${API_AUTHENTICATION_URL}/getme`);
    return response.data;
  },
};
