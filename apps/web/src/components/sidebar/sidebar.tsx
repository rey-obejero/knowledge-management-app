import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, MessageSquare, FileText, Trash2 } from 'lucide-react';

import { SidebarHeader } from './sidebar-header';
import { SidebarFooter } from './sidebar-footer';
import { SidebarNavItem } from './sidebar-nav-item';
import { SidebarSection } from './sidebar-section';

import { useWorkspace } from '@/features/workspaces/hooks/use-workspace';
import { useCreateEntry } from '@/features/entries/hooks/use-create-entry';

export function Sidebar() {
  const [isSchemasOpen, setIsSchemasOpen] = useState(true);
  const [isRecentsOpen, setIsRecentsOpen] = useState(true);
  const [isPinnedOpen, setIsPinnedOpen] = useState(true);

  const navigate = useNavigate();
  const { activeWorkspace, activeWorkspaceId } = useWorkspace();
  const { mutate: createEntry } = useCreateEntry();

  const handleCreateEntry = () => {
    if (!activeWorkspaceId) return;

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
    <aside className='bg-sidebar border-sidebar-border flex h-full w-2xs flex-col border-r p-3'>
      <SidebarHeader onCreateEntry={handleCreateEntry} />

      {!activeWorkspace ? (
        <div className='text-muted-foreground/70 flex flex-1 items-center justify-center p-4 text-center text-xs'></div>
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

          <SidebarSection
            label='Pinned'
            open={isPinnedOpen}
            onOpenChange={setIsPinnedOpen}
          >
            <></>
          </SidebarSection>

          <SidebarSection
            label='Recents'
            open={isRecentsOpen}
            onOpenChange={setIsRecentsOpen}
          >
            <></>
          </SidebarSection>

          <SidebarSection
            label='Schemas'
            open={isSchemasOpen}
            onOpenChange={setIsSchemasOpen}
            actionLabel='Create a Schema'
            onActionClick={() => {}}
          >
            <SidebarNavItem
              icon={<FileText className='h-4 w-4' />}
              label='Pages'
              showAddOnHover
              onAddClick={handleCreateEntry}
              onClick={() => {
                navigate(`/w/${activeWorkspaceId}/entries?=page`);
              }}
            />
          </SidebarSection>

          <div className='mt-4'>
            <SidebarNavItem
              icon={<Trash2 className='h-4 w-4' />}
              label='Bin'
              onClick={() => {}}
            />
          </div>
        </ScrollArea>
      )}

      <SidebarFooter />
    </aside>
  );
}
