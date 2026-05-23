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
    // Add mutation submission logic here
  };

  // Safe interceptor to clear fields when dismissed
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      reset(); // Resets error messages and field values cleanly
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
              {...register('name', {
                required: 'Workspace identity requires an alphanumeric title.',
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
