import { ChevronDown, FileText, SquarePen } from 'lucide-react';
import { WorkspaceSwitcher } from '@/features/workspaces/components/workspace-switcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar, SidebarTrigger } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SidebarHeaderProps {
  onCreateEntry?: () => void;
  activeWorkspaceId?: string | null;
  workspaceName?: string;
}

export function SidebarHeader({
  onCreateEntry,
  activeWorkspaceId,
  workspaceName,
}: SidebarHeaderProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <div className='mb-4 flex items-center justify-between gap-1'>
      <div className='flex min-w-0 flex-1 items-center'>
        {!isCollapsed && <WorkspaceSwitcher />}
      </div>

      {!isCollapsed && activeWorkspaceId && (
        <div className='flex items-center rounded-full border border-input'>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onCreateEntry}
                className='hover:bg-sidebar-accent flex shrink-0 cursor-pointer items-center justify-center rounded-l-full p-2 transition-colors focus:outline-none'
              >
                <SquarePen
                  strokeWidth={2.5}
                  className='text-muted-foreground h-3.5 w-3.5'
                />
              </button>
            </TooltipTrigger>
            <TooltipContent side='bottom' sideOffset={4}>
              Create New
            </TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='hover:bg-sidebar-accent flex shrink-0 cursor-pointer items-center justify-center rounded-r-full p-2 transition-colors focus:outline-none'>
                <ChevronDown className='text-muted-foreground h-3 w-3' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <div className='text-muted-foreground px-3 py-2 text-[10px] font-bold tracking-widest uppercase'>
                Your Schemas
              </div>
              <DropdownMenuItem
                onSelect={onCreateEntry}
                className='flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5'
              >
                <FileText className='text-muted-foreground h-4 w-4' />
                <span className='text-sm'>Page</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <SidebarTrigger />
    </div>
  );
}
