import type { User } from '@/types/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  user: User;
  token: string;
  expiresAt: string;
}

export interface AuthenticationState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};
