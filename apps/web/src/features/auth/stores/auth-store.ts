import { create } from 'zustand'; import type { User, AuthState } from '../types/auth.types';
import { persist } from 'zustand/middleware';

interface AuthActions {
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      setAuth: (user, accessToken) => {
        set({
          user,
          accessToken,
          isAuthenticated: true,
          error: null,
        })
      },
      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          error: null,
        })
      },
      setLoading: (isLoading) => {
        set({
          isLoading,
        })
      },
      setError: (error) => {
        set({
          error,
        })
      }
    }),
    {
      name: 'auth',
      partialize: (state) => ({
        accessToken: state.accessToken
      })
    }
  )
);
