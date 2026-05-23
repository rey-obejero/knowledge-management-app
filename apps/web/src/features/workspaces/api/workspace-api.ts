import type { Workspace } from '@/types/api';
import { apiClient } from '@/lib/api-client';
import type { CreateWorkspaceRequest } from '../types/workspaces.types';

const API_WORKSPACE_URL = '/workspaces';

export const workspaceApi = {
  createWorkspace: async (data: CreateWorkspaceRequest): Promise<Workspace> => {
    const response = await apiClient.post('/workspaces', data);
    return response.data;
  },

  getWorkspaces: async (): Promise<Workspace[]> => {
    const response = await apiClient.get<Workspace[]>(API_WORKSPACE_URL);
    return response.data;
  },

  getWorkspace: async (id: string): Promise<Workspace> => {
    const response = await apiClient.get<Workspace>(
      `${API_WORKSPACE_URL}/${id}`,
    );
    return response.data;
  },
};
