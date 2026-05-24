import { useQuery } from '@tanstack/react-query';
import { entriesApi } from '../api/entries-api';

export const useEntries = (params: {
  workspaceId: string;
  schema?: string;
}) => {
  return useQuery({
    queryKey: ['entries', params],
    queryFn: () => entriesApi.getEntries(params),
    enabled: !!params.workspaceId,
  });
};
