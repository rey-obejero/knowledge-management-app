import type { User } from '@/types/api';

export type SignUpRequest = {
  email: string;
  password: string;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  user: User;
  accessToken: string;
  expiresIn: number;
}

export interface AuthenticationState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
