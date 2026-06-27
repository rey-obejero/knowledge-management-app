import { entriesApi } from '../api/entries-api';
import { useQuery } from '@tanstack/react-query';

export const ENTRY_QUERY_KEY = ['entry'] as const;

export const useEntry = (id: string | undefined) => {
  return useQuery({
    queryKey: [...ENTRY_QUERY_KEY, id],
    queryFn: () => entriesApi.getEntry(id!),
    enabled: !!id,
  });
};
