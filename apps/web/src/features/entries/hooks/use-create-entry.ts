import { entriesApi } from '../api/entries-api';
import { useMutation } from '@tanstack/react-query';

export const useCreateEntry = () => {
  return useMutation({
    mutationFn: entriesApi.createEntry,
    onSuccess: () => {},
  });
};
