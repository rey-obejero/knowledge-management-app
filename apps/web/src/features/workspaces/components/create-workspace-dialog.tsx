import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateWorkspace } from '../hooks/use-create-workspace';

interface WorkspaceCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormValues {
  name: string;
}

export const CreateWorkspaceDialog = ({
  open,
  onOpenChange,
}: WorkspaceCreateDialogProps) => {
  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: '' },
  });

  const onSubmit = (values: FormValues) => {
    if (!values.name.trim()) return;
    createWorkspace({
      name: values.name,
    });
    onOpenChange(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='w-96'>
        <DialogHeader>
          <DialogTitle className='m-auto'>New Workspace</DialogTitle>
          <DialogDescription className='m-auto'>
            Start organizing your entries.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-2'>
          <div className='space-y-2'>
            <Input
              id='workspace-name'
              placeholder='Enter the name for your workspace'
              disabled={isPending}
              {...register('name', {
                required: 'Only alphaneumeric characters are allowed.',
              })}
            />
            {errors.name && (
              <p className='text-destructive text-xs font-medium tracking-wide'>
                {errors.name.message}
              </p>
            )}
          </div>
          <DialogFooter className='pt-2'>
            <Button type='submit' className='w-full cursor-pointer'>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
