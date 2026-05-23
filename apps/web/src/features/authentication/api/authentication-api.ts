import { apiClient } from '@/lib/api-client';
import type {
  AuthenticationResponse,
  SignUpRequest,
  LoginRequest,
} from '../types/authentication.types';
import type { User } from '@/types/api';

const API_AUTHENTICATION_URL = '/authentication';

export const authenticationApi = {
  signUp: async (data: SignUpRequest): Promise<AuthenticationResponse> => {
    const response = await apiClient.post<AuthenticationResponse>(
      `${API_AUTHENTICATION_URL}/sign-up`,
      data,
    );
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthenticationResponse> => {
    const response = await apiClient.post<AuthenticationResponse>(
      `${API_AUTHENTICATION_URL}/sign-in`,
      data,
    );
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get(`${API_AUTHENTICATION_URL}/get-me`);
    return response.data;
  },
};
