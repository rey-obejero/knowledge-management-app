import { create } from 'zustand';
import type { Workspace } from '@/types/api';

interface WorkspaceState {
  activeWorkspace: Workspace | null;
  isLoading: boolean;
  error: string | null;
}

interface WorkspaceActions {
  setActiveWorkspace: (workspace: Workspace | null) => void;
  clearActiveWorkspace: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWorkspaceStore = create<WorkspaceState & WorkspaceActions>()(
  (set) => ({
    // State
    activeWorkspace: null,
    isLoading: false,
    error: null,

    // Actions
    setActiveWorkspace: (workspace) => {
      set({
        activeWorkspace: workspace,
        error: null,
      });
    },

    clearActiveWorkspace: () => {
      set({
        activeWorkspace: null,
        error: null,
      });
    },

    setLoading: (isLoading) => {
      set({ isLoading });
    },

    setError: (error) => {
      set({ error });
    },
  }),
);
