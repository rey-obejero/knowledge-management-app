import { Globe, CodeXml } from 'lucide-react';

export function SidebarFooter() {
  return (
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
        <button className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors focus:outline-none'>
          <Globe className='text-muted-foreground/80 h-3.5 w-3.5' />
        </button>
        <button className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors focus:outline-none'>
          <a
            href='https://github.com/rey-obejero/knowledge-management-app'
            target='_blank'
            rel='noreferrer'
          >
            <CodeXml
              strokeWidth={2.5}
              className='text-muted-foreground/80 h-3.5 w-3.5'
            />
          </a>
        </button>
      </div>
    </div>
  );
}
