import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Check, Plus } from 'lucide-react';
import { useWorkspaces } from '../hooks/use-workspaces';
import { useWorkspace } from '../hooks/use-workspace';
import { CreateWorkspaceDialog } from './create-workspace-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function WorkspaceSwitcher() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { data: workspaces, isLoading } = useWorkspaces();
  const { activeWorkspace, selectWorkspace, activeWorkspaceId } =
    useWorkspace();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='hover:bg-sidebar-accent flex w-full cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition-colors mb-3 focus:outline-none'>
            <span className='bg-sidebar-primary text-sidebar-primary-foreground flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-xs font-semibold'>
              {activeWorkspace?.name?.charAt(0) ?? 'W'}
            </span>
            <span className='text-sidebar-foreground flex-1 truncate text-left text-sm font-medium'>
              {activeWorkspace?.name ?? 'Select workspace'}
            </span>
            <ChevronDown className='text-muted-foreground h-3 w-3 shrink-0' />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align='start'
          className='border-sidebar-border w-[236px] rounded-xl shadow-xl'
        >
          {isLoading && (
            <div className='space-y-1 p-2'>
              <Skeleton className='h-10 w-full rounded-lg' />
              <Skeleton className='h-10 w-full rounded-lg' />
            </div>
          )}

          {workspaces?.map((ws) => (
            <DropdownMenuItem
              key={ws.id}
              onClick={() => {
                selectWorkspace(ws);
                navigate(`/w/${ws.id}`);
              }}
              className='flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5'
            >
              <span className='bg-sidebar-primary text-sidebar-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-base font-semibold'>
                {ws.name.charAt(0)}
              </span>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-semibold'>{ws.name}</p>
                <p className='text-muted-foreground mt-0.5 text-xs'>
                  Personal · Just you
                </p>
              </div>
              {ws.id === activeWorkspaceId && (
                <Check className='text-sidebar-primary h-4 w-4 shrink-0' />
              )}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className='text-sidebar-foreground cursor-pointer gap-3 rounded-lg py-2'
            onSelect={() => setCreateDialogOpen(true)}
          >
            <Plus className='text-muted-foreground h-4 w-4' />
            <span className='text-sm font-medium'>New workspace</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateWorkspaceDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </>
  );
}
