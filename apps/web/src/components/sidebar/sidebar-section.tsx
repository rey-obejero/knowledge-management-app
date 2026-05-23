import type { ReactNode } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface SidebarSectionProps {
  label: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  actionLabel?: string;
  onActionClick?: () => void;
}

export function SidebarSection({
  label,
  open,
  onOpenChange,
  children,
  actionLabel,
  onActionClick,
}: SidebarSectionProps) {
  return (
    <div className='mt-4'>
      <Collapsible open={open} onOpenChange={onOpenChange}>
        <CollapsibleTrigger className='group/collapsible text-muted-foreground/70 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/40 flex w-full cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-left text-[10px] font-bold tracking-widest uppercase transition-colors select-none focus:outline-none'>
          {open ? (
            <ChevronDown className='h-3 w-3 shrink-0' />
          ) : (
            <ChevronRight className='h-3 w-3 shrink-0' />
          )}
          <span className='flex-1 truncate'>{label}</span>

          {actionLabel && onActionClick && (
            <span
              className='text-muted-foreground/60 hover:text-sidebar-accent-foreground hidden cursor-pointer items-center gap-1 pr-1 text-[10px] font-semibold tracking-normal normal-case transition-colors group-hover/collapsible:flex'
              onClick={(e) => {
                e.stopPropagation();
                onActionClick();
              }}
            >
              <Plus className='h-3 w-3' strokeWidth={2.5} />
              <span>{actionLabel}</span>
            </span>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className='mt-1.5 space-y-0.5 pl-1.5'>{children}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
