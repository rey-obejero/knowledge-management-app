import { create } from 'zustand';
import type { AuthenticationState } from '../types/authentication.types';
import type { User } from '@/types/api'
import { persist } from 'zustand/middleware';

interface AuthenticationActions {
  setAuthentication: (user: User, accessToken: string) => void;
  clearAuthentication: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthenticationStore = create<AuthenticationState & AuthenticationActions>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      setAuthentication: (user, accessToken) => {
        set({
          user,
          accessToken,
          isAuthenticated: true,
          error: null,
        })
      },
      clearAuthentication: () => {
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
      name: 'authentication',
      partialize: (state) => ({
        accessToken: state.accessToken
      })
    }
  )
);
