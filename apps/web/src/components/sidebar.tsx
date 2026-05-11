import type { Workspace } from '@/types/api';
import { cn } from '@/lib/utils';
import { useWorkspaces } from '@/features/workspaces';
import { Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area'
import { paths } from '@/config/paths';

interface WorkspaceItemProps {
  workspace: Workspace;
  isActive?: boolean;
  onClick: () => void;
};

const WorkspaceItem = ({ workspace, isActive, onClick }: WorkspaceItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors',
        isActive
          ? 'bg-accent text-accent-foreground font-medium'
          : 'text-foreground hover:bg-accent/50 hover:text-foreground',
      )}>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm">
        {workspace.name.charAt(0).toUpperCase()}
      </span>
      <span className='flex-1 truncate text-left'>{workspace.name}</span>
    </button>
  );
};

export const Sidebar = () => {
  const { data: workspaces, isLoading, isError, error } = useWorkspaces();

  return (
    <aside className='flex h-full w-[280px] flex-col bg-muted/30 rounded-2xl'>
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wide">Workspaces</span>
          <div className="flex items-center gap-1">
            <button className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-accent">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-3">
        {isLoading && (
          <div className="space-y-1">
            <Skeleton className="h-9 w-full rounded-lg" />
            <Skeleton className="h-9 w-full rounded-lg" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        )}

        {isError && (
          <div className="px-2 py-2 text-xs text-destructive">
            Failed to load workspaces.
          </div>
        )}

        <div className="space-y-0.5">
          {workspaces?.map((workspace) => (
            <WorkspaceItem
              key={workspace.id}
              workspace={workspace}
              isActive={false}
              onClick={() => window.location.href = paths.app.workspaces.getHref(workspace.id)}
            />
          ))}
        </div>

        <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent/50">
          <Plus className="h-4 w-4" />
          <span>New workspace</span>
        </button>
      </ScrollArea>
    </aside>
  );
};
