import { Search, SquarePen } from 'lucide-react';
import { WorkspaceSwitcher } from '@/features/workspaces/components/workspace-switcher';

interface SidebarHeaderProps {
  onCreateEntry?: () => void;
}

export function SidebarHeader({ onCreateEntry }: SidebarHeaderProps) {
  return (
    <div className='mb-4 flex items-center justify-between gap-1'>
      <div className='min-w-0 flex-1'>
        <WorkspaceSwitcher />
      </div>

      <button className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex shrink-0 cursor-pointer items-center justify-center rounded-lg p-2 transition-colors focus:outline-none'>
        <Search
          strokeWidth={2.5}
          className='text-muted-foreground/80 h-3.5 w-3.5'
        />
      </button>

      <button
        onClick={onCreateEntry}
        className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex shrink-0 cursor-pointer items-center justify-center rounded-lg p-2 transition-colors focus:outline-none'
      >
        <SquarePen
          strokeWidth={2.5}
          className='text-muted-foreground/80 h-3.5 w-3.5'
        />
      </button>
    </div>
  );
}
