import type { Workspace } from '@/types/api';
import { apiClient } from '@/lib/api-client';

const API_WORKSPACE_URL = '/workspaces';

export const workspaceApi = {
  getWorkspaces: async (): Promise<Workspace[]> => {
    const response = await apiClient.get<Workspace[]>(API_WORKSPACE_URL);
    return response.data;
  },

  getWorkspace: async (id: string): Promise<Workspace> => {
    const response = await apiClient.get<Workspace>(`API_WORKSPACE_URL/${id}`);
    return response.data;
  },
};
