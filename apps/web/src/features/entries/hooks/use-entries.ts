import { useQuery } from '@tanstack/react-query';
import { entriesApi } from '../api/entries-api';

export const ENTRIES_QUERY_KEY = ['entries'] as const;

export const useEntries = (params: {
  workspaceId: string;
  schema?: string;
}) => {
  return useQuery({
    queryKey: [...ENTRIES_QUERY_KEY, params],
    queryFn: () => entriesApi.getEntries(params),
    enabled: !!params.workspaceId,
  });
};
