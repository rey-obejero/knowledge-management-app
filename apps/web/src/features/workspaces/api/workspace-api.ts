import type { Workspace } from '@/types/api';
import { apiClient } from '@/lib/api-client';

export const workspaceApi = {
  getWorkspaces: async (): Promise<Workspace[]> => {
    const response = await apiClient.get<Workspace[]>('/workspace');
    return response.data;
  }
};
