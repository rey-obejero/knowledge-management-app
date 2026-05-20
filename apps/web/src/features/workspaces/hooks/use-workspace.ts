import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWorkspaceStore } from '../stores/workspace-store';
import { workspaceApi } from '../api/workspace-api';
import type { Workspace } from '@/types/api';

export const useWorkspace = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
  const isLoading = useWorkspaceStore((state) => state.isLoading);
  const error = useWorkspaceStore((state) => state.error);
  const setActiveWorkspace = useWorkspaceStore(
    (state) => state.setActiveWorkspace,
  );
  const clearActiveWorkspace = useWorkspaceStore(
    (state) => state.clearActiveWorkspace,
  );
  const setLoading = useWorkspaceStore((state) => state.setLoading);
  const setError = useWorkspaceStore((state) => state.setError);

  useEffect(() => {
    if (!workspaceId) {
      clearActiveWorkspace();
      return;
    }

    if (activeWorkspace?.id === workspaceId) {
      return;
    }

    const fetchWorkspace = async () => {
      setLoading(true);
      setError(null);

      try {
        const workspace = await workspaceApi.getWorkspace(workspaceId);
        setActiveWorkspace(workspace);
      } catch (err: any) {
        const message =
          err.response?.data?.error?.description || 'Failed to load workspace';
        setError(message);
        clearActiveWorkspace();
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [workspaceId]);

  const selectWorkspace = async (workspace: Workspace) => {
    setActiveWorkspace(workspace);
  };

  return {
    activeWorkspace,
    activeWorkspaceId: activeWorkspace?.id ?? null,
    isLoading,
    error,
    selectWorkspace,
    clearActiveWorkspace,
  } as const;
};
