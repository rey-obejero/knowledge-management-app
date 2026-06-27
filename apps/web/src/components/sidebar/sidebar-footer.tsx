import { Globe } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function SidebarFooter() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  if (isCollapsed) {
    return (
      <div className='flex items-center justify-center p-2'>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className='flex h-7 w-7 shrink-0 cursor-default items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold'>
              U
            </button>
          </TooltipTrigger>
          <TooltipContent side='right' sideOffset={8}>
            User
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-between rounded-2xl border border-border bg-background p-3'>
      <div className='flex items-center gap-2.5'>
        <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold'>
          U
        </div>
        <span className='flex-1 truncate text-sm font-medium text-sidebar-foreground'>
          User
        </span>
      </div>

      <div className='flex shrink-0 gap-1'>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className='hover:bg-sidebar-accent flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors focus:outline-none'>
              <Globe className='text-muted-foreground h-3.5 w-3.5' />
            </button>
          </TooltipTrigger>
          <TooltipContent side='top' sideOffset={4}>
            Open Web
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
