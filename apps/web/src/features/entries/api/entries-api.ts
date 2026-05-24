import type { Entry } from '@/types/api';
import type {
  CreateEntryRequest,
  UpdateEntryRequest,
} from '../types/entries.types';
import { apiClient } from '@/lib/api-client';

const API_ENTRIES_URL = '/entries';

export const entriesApi = {
  createEntry: async (data: CreateEntryRequest): Promise<Entry> => {
    const response = await apiClient.post<Entry>(API_ENTRIES_URL, data);
    return response.data;
  },

  getEntry: async (id: string): Promise<Entry> => {
    const response = await apiClient.get<Entry>(`${API_ENTRIES_URL}/${id}`);
    return response.data;
  },

  getEntries: async (params: {
    workspaceId: string;
    schema?: string;
  }): Promise<Entry[]> => {
    const response = await apiClient.get<Entry[]>(API_ENTRIES_URL, { params });
    return response.data;
  },

  updateEntry: async (data: UpdateEntryRequest): Promise<Entry> => {
    const response = await apiClient.put<Entry>(API_ENTRIES_URL, data);
    return response.data;
  },
};
