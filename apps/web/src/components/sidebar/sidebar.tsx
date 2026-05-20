import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWorkspace } from '@/features/workspaces/hooks/use-workspace';
import { useWorkspaces } from '@/features/workspaces/hooks/use-workspaces';
import {
  Search,
  Home,
  ChevronDown,
  ChevronRight,
  Plus,
  LogOut,
  Check,
  MessageSquare,
  Settings,
  Globe,
  FileText,
  Trash2,
  Pin,
  SquarePen,
  CodeXml,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useCreateEntry } from '@/features/entries/hooks/use-create-entry';

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
  showAddOnHover?: boolean;
  onAddClick?: () => void;
}

const SidebarNavItem = ({
  icon,
  label,
  count,
  isActive,
  onClick,
  showAddOnHover,
  onAddClick,
}: SidebarNavItemProps) => {
  return (
    <button
      onClick={onClick}
      /* Item Hit Zones: Cleaned padding, explicit font tracking, and dynamic hover contrast
         matching premium SaaS specifications. */
      className={cn(
        'group flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        isActive
          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
          : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
      )}
    >
      <span className='text-muted-foreground group-hover:text-sidebar-accent-foreground flex h-4 w-4 items-center justify-center transition-colors'>
        {icon}
      </span>
      <span className='flex-1 text-left tracking-wide'>{label}</span>
      {showAddOnHover && (
        <span
          className='text-muted-foreground flex hidden h-4 w-4 cursor-pointer items-center justify-center transition-colors group-hover:flex'
          onClick={onAddClick}
        >
          <Plus
            className='hover:text-sidebar-accent-foreground h-3.5 w-3.5'
            strokeWidth={2.5}
          />
        </span>
      )}
      {!showAddOnHover && count !== undefined && (
        /* Structural Counter Capsule: Cleaned layout to render a semantic data badge */
        <span className='text-muted-foreground/60 group-hover:bg-sidebar rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] transition-colors dark:bg-zinc-800'>
          {count}
        </span>
      )}
    </button>
  );
};

interface SidebarProps {
  showEmptyState?: boolean;
}

export const Sidebar = ({ showEmptyState = false }: SidebarProps) => {
  const [isSchemasOpen, setIsSchemasOpen] = useState(true);
  const [isRecentsOpen, setIsRecentsOpen] = useState(true);
  const [isPinnedOpen, setIsPinnedOpen] = useState(true);

  const { data: workspaces, isLoading } = useWorkspaces();

  const { activeWorkspace, selectWorkspace, activeWorkspaceId } =
    useWorkspace();

  const selectedWorkspace = activeWorkspace;

  const navigate = useNavigate();

  const { mutate: createEntry } = useCreateEntry();

  const handleCreateEntry = () => {
    if (!activeWorkspaceId) {
      return;
    }

    createEntry(
      {
        workspaceId: activeWorkspaceId,
        type: 'page',
        title: 'New Entry',
        content: '',
      },
      {
        onSuccess: (entry) => {
          navigate(`/w/${activeWorkspaceId}/entries/${entry.id}`);
        },
      },
    );
  };

  return (
    <aside className='bg-sidebar border-sidebar-border flex h-full w-2xs flex-col justify-between border-r p-3'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex w-full'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='group hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors'>
                <span className='group-hover:text-sidebar-primary-foreground/85 bg-sidebar-primary text-sidebar-primary-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold'>
                  {selectedWorkspace?.name?.charAt(0) ?? 'W'}
                </span>
                <span className='text-sidebar-foreground flex-1 truncate text-left text-sm font-semibold tracking-wide'>
                  {selectedWorkspace?.name ?? 'Select workspace'}
                </span>
                <ChevronDown className='text-muted-foreground/70 h-3.5 w-3.5 shrink-0' />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align='start'
              className='border-sidebar-border w-[236px] rounded-xl shadow-xl'
            >
              {isLoading && (
                <div className='space-y-1 p-2'>
                  <Skeleton className='h-14 w-full rounded-lg' />
                  <Skeleton className='h-14 w-full rounded-lg' />
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

              <DropdownMenuItem className='cursor-pointer gap-3 rounded-lg py-2'>
                <Plus className='text-muted-foreground h-4 w-4' />
                <span className='text-sm'>New workspace</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ml-1 flex shrink-0 cursor-pointer items-center justify-center rounded-lg p-2 transition-colors'>
          <Search
            strokeWidth={2.5}
            className='text-muted-foreground/80 h-3.5 w-3.5'
          />
        </button>

        <button className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ml-1 flex shrink-0 cursor-pointer items-center justify-center rounded-lg p-2 transition-colors'>
          <SquarePen
            strokeWidth={2.5}
            className='text-muted-foreground/80 h-3.5 w-3.5'
          />
        </button>
      </div>

      {!activeWorkspace ? (
        <div className='flex-1' />
      ) : (
        <ScrollArea className='-mx-3 flex-1 px-3'>
          <div className='space-y-0.5'>
            <SidebarNavItem
              icon={<Home className='h-4 w-4' />}
              label='Home'
              isActive
            />
            <SidebarNavItem
              icon={<MessageSquare strokeWidth={2} className='h-4 w-4' />}
              label='Conversations'
            />
          </div>

          {/* Pinned section block */}
          <div className='mt-6'>
            <Collapsible open={isPinnedOpen} onOpenChange={setIsPinnedOpen}>
              <CollapsibleTrigger className='group/collapsible text-muted-foreground/70 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/40 flex w-full cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-left text-[10px] font-bold tracking-widest uppercase transition-colors select-none'>
                {isPinnedOpen ? (
                  <ChevronDown className='h-3 w-3 shrink-0' />
                ) : (
                  <ChevronRight className='h-3 w-3 shrink-0' />
                )}
                <span className='flex-1'>Pinned</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='mt-1.5 space-y-0.5' />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Recent section block */}
          <div className='mt-4'>
            <Collapsible open={isRecentsOpen} onOpenChange={setIsRecentsOpen}>
              <CollapsibleTrigger className='group/collapsible text-muted-foreground/70 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/40 flex w-full cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-left text-[10px] font-bold tracking-widest uppercase transition-colors select-none'>
                {isRecentsOpen ? (
                  <ChevronDown className='h-3 w-3 shrink-0' />
                ) : (
                  <ChevronRight className='h-3 w-3 shrink-0' />
                )}
                <span className='flex-1'>Recents</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='mt-1.5 space-y-0.5' />
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className='mt-4'>
            <Collapsible open={isSchemasOpen} onOpenChange={setIsSchemasOpen}>
              <CollapsibleTrigger className='group/collapsible text-muted-foreground/70 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/40 flex w-full cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-left text-[10px] font-bold tracking-widest uppercase transition-colors select-none'>
                {isSchemasOpen ? (
                  <ChevronDown className='h-3 w-3 shrink-0' />
                ) : (
                  <ChevronRight className='h-3 w-3 shrink-0' />
                )}
                <span className='flex-1'>Schemas</span>
                <span
                  className='text-muted-foreground/60 hover:text-sidebar-accent-foreground hidden cursor-pointer items-center gap-1 pr-1 text-[10px] font-semibold tracking-normal normal-case transition-colors group-hover/collapsible:flex'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Plus className='h-3 w-3' strokeWidth={2.5} />
                  <span>Create a Schema</span>
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='mt-1 space-y-0.5 pl-1.5'>
                  <SidebarNavItem
                    icon={<FileText className='h-4 w-4' />}
                    label='Pages'
                    showAddOnHover
                    onAddClick={handleCreateEntry}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Recycling Bin */}
          <div className='mt-4'>
            <SidebarNavItem
              icon={<Trash2 className='h-4 w-4' />}
              label='Bin'
              onClick={() => {}}
            />
          </div>
        </ScrollArea>
      )}

      <div className='border-sidebar-border mt-auto flex items-center justify-between pt-2'>
        <div className='group hover:bg-sidebar-accent flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 rounded-lg p-1.5 transition-colors'>
          <div className='bg-sidebar-primary text-sidebar-primary-foreground group-hover:bg-sidebar-primary/85 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tracking-wide transition-colors'>
            U
          </div>
          <span className='text-sidebar-foreground flex-1 truncate text-sm font-semibold tracking-wide'>
            User
          </span>
        </div>
        <div className='ml-2 flex shrink-0 gap-1'>
          <button className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors'>
            <Globe className='text-muted-foreground/80 h-3.5 w-3.5' />
          </button>
          <button className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors'>
            <a href='https://github.com/rey-obejero/knowledge-management-app'>
              <CodeXml
                strokeWidth={2.5}
                className='text-muted-foreground/80 h-3.5 w-3.5'
              />
            </a>
          </button>
        </div>
      </div>
    </aside>
  );
};
