import { authenticationApi } from '../api/authentication-api';
import { useAuthenticationStore } from '../stores/authentication-store';
import type {
  LoginRequest,
  SignUpRequest,
} from '../types/authentication.types';

export const useAuthentication = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setAuthentication: setAuth,
    clearAuthentication: clearAuth,
    setLoading,
    setError,
  } = useAuthenticationStore();

  const signUp = async (data: SignUpRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authenticationApi.signUp(data);
      const user = response.user;
      const accessToken = response.token;

      setAuth(user, accessToken);

      return {
        success: true,
      };
    } catch (error: any) {
      const message =
        error.response?.data?.error.description || 'Sign up failed';
      setLoading(false);
      setError(message);
    }
  };

  const signIn = async (data: LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authenticationApi.login(data);
      const user = response.user;
      const accessToken = response.token;

      setAuth(user, accessToken);

      return {
        success: true,
      };
    } catch (error: any) {
      const message =
        error.response?.data?.error.description || 'Sign in failed';
      setLoading(false);
      setError(message);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    signUp,
    signIn,
  };
};
