import { authApi } from "../api/auth-api";
import { useAuthStore } from "../stores/auth-store";
import type { LoginRequest } from "../types/auth.types";

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error, setAuth, clearAuth, setLoading, setError } = useAuthStore();

  const login = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = (await authApi.login(data)).token;

      const user = {
        id: 'test',
        email: 'test@email.com',
      };

      setAuth(user, accessToken);

      return {
        success: true,
      };
    } catch (error: any) {
      const message = error.response?.data?.error.description || 'Login failed';
      setError(message);
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
  };
}
