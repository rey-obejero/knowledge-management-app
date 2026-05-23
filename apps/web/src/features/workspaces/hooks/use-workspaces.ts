import { workspaceApi } from '../api/workspace-api';
import { useQuery } from '@tanstack/react-query';

export const WORKSPACE_QUERY_KEY = ['workspaces'] as const;

export const useWorkspaces = () => {
  return useQuery({
    queryKey: WORKSPACE_QUERY_KEY,
    queryFn: workspaceApi.getWorkspaces,
  });
};
