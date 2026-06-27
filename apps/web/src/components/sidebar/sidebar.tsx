import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Home,
  MessageSquare,
  FileText,
  Trash2,
  Search,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { SidebarHeader } from './sidebar-header';
import { SidebarFooter } from './sidebar-footer';

import { useWorkspace } from '@/features/workspaces/hooks/use-workspace';
import { useCreateEntry } from '@/features/entries/hooks/use-create-entry';

export function Sidebar() {
  const [isSchemasOpen, setIsSchemasOpen] = useState(true);

  const navigate = useNavigate();
  const { activeWorkspaceId, activeWorkspace } = useWorkspace();
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
    <SidebarRoot collapsible='icon'>
      <SidebarHeader
        onCreateEntry={handleCreateEntry}
        activeWorkspaceId={activeWorkspaceId}
        workspaceName={activeWorkspace?.name}
      />

      <div className='group-data-[collapsible=icon]:hidden mb-9 px-2'>
        <button className='hover:bg-background hover:border-ring border-input text-muted-foreground flex w-full cursor-pointer items-center gap-2.5 rounded-full border bg-transparent px-4 py-2.5 text-left text-sm transition-all'>
          <Search strokeWidth={2.5} className='h-3.5 w-3.5' />
          <span>Search Index...</span>
        </button>
      </div>

      <SidebarContent className='gap-6 group-data-[collapsible=icon]:gap-2'>
        {activeWorkspaceId && (
          <>
            <div className='group-data-[collapsible=icon]:hidden rounded-2xl bg-sidebar-accent p-3'>
              <SidebarGroup className='!p-0'>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className='hover:bg-background data-active:bg-background' isActive>
                      <Home className='h-4 w-4' />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className='hover:bg-background'>
                      <MessageSquare strokeWidth={2} className='h-4 w-4' />
                      <span>Conversations</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </div>

            <div className='group-data-[collapsible=icon]:hidden rounded-2xl bg-sidebar-accent p-3'>
              <SidebarGroup className='!p-0'>
                <Collapsible open={isSchemasOpen} onOpenChange={setIsSchemasOpen}>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className='flex w-full cursor-pointer items-center gap-1.5 text-left select-none'>
                      {isSchemasOpen ? (
                        <ChevronDown className='h-3 w-3 shrink-0' />
                      ) : (
                        <ChevronRight className='h-3 w-3 shrink-0' />
                      )}
                      <span>Schemas</span>
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            className='hover:bg-background data-active:bg-background'
                            onClick={() => {
                              navigate(`/w/${activeWorkspaceId}/entries?=page`);
                            }}
                          >
                            <FileText className='h-4 w-4' />
                            <span>Pages</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarGroup>
            </div>

            <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className='hover:bg-sidebar-accent' onClick={() => {}}>
                    <Trash2 className='h-4 w-4' />
                    <span>Bin</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter />
    </SidebarRoot>
  );
}
