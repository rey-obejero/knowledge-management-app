export interface LoginRequest {
  email: string;
  password: string;
}

export interface Token {
  token: string;
  expiresAt: string;
}

export interface User {
  id: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};
