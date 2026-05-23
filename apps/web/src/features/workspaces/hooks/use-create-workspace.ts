import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useWorkspace } from './use-workspace';
import { workspaceApi } from '../api/workspace-api';

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { selectWorkspace } = useWorkspace();

  return useMutation({
    mutationFn: workspaceApi.createWorkspace,
    onSuccess: (newWorkspace) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      selectWorkspace(newWorkspace);
      console.log(newWorkspace);
      navigate(`/w/${newWorkspace.id}`);
    },
  });
};
