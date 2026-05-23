import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  icon: ReactNode;
  label: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
  showAddOnHover?: boolean;
  onAddClick?: (e: React.MouseEvent) => void;
}

export function SidebarNavItem({
  icon,
  label,
  count,
  isActive,
  onClick,
  showAddOnHover,
  onAddClick,
}: SidebarNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none',
        isActive
          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
          : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
      )}
    >
      <span className='text-muted-foreground group-hover:text-sidebar-accent-foreground flex h-4 w-4 items-center justify-center transition-colors'>
        {icon}
      </span>
      <span className='flex-1 truncate text-left tracking-wide'>{label}</span>

      {showAddOnHover && onAddClick && (
        <span
          className='text-muted-foreground hidden h-4 w-4 cursor-pointer items-center justify-center transition-colors group-hover:flex'
          onClick={(e) => {
            e.stopPropagation();
            onAddClick(e);
          }}
        >
          <Plus
            className='hover:text-sidebar-accent-foreground h-3.5 w-3.5'
            strokeWidth={2.5}
          />
        </span>
      )}

      {!showAddOnHover && count !== undefined && (
        <span className='text-muted-foreground/60 group-hover:bg-sidebar rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] transition-colors dark:bg-zinc-800'>
          {count}
        </span>
      )}
    </button>
  );
}
