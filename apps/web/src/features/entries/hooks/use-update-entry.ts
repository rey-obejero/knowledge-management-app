import { entriesApi } from '../api/entries-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const ENTRY_QUERY_KEY = ['entry'] as const;

export const useUpdateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: entriesApi.updateEntry,
    onSuccess: (updatedEntry) => {
      queryClient.invalidateQueries({
        queryKey: [...ENTRY_QUERY_KEY, updatedEntry.id],
      });
    },
  });
};
