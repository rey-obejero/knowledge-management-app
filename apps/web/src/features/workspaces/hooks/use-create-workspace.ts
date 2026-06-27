import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useWorkspace } from './use-workspace';
import { WORKSPACE_QUERY_KEY } from './use-workspaces';
import { workspaceApi } from '../api/workspace-api';

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { selectWorkspace } = useWorkspace();

  return useMutation({
    mutationFn: workspaceApi.createWorkspace,
    onSuccess: (newWorkspace) => {
      queryClient.invalidateQueries({ queryKey: WORKSPACE_QUERY_KEY });
      selectWorkspace(newWorkspace);
      console.log(newWorkspace);
      navigate(`/w/${newWorkspace.id}`);
    },
  });
};
