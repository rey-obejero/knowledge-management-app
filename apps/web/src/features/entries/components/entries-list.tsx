import { File, Plus } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import type { Entry } from '@/types/api';
import { Skeleton } from '@/components/ui/skeleton';

interface EntriesListProps {
  entries?: Entry[];
  isLoading: boolean;
  schemaTitle: string;
  onCreateClick: () => void;
}

export const EntriesList = ({
  entries,
  isLoading,
  schemaTitle,
  onCreateClick,
}: EntriesListProps) => {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  if (isLoading) {
    return (
      <div className='mt-4 space-y-2'>
        <Skeleton className='h-8 w-full rounded-md' />
        <Skeleton className='h-8 w-full rounded-md' />
        <Skeleton className='h-8 w-full rounded-md' />
      </div>
    );
  }

  return (
    <div className='w-full text-sm'>
      <div className='border-border/60 text-muted-foreground/60 grid grid-cols-[1fr_auto] border-b px-2 pb-2 text-xs font-medium tracking-wide select-none'>
        <div className='hover:text-foreground flex cursor-pointer items-center gap-1 transition-colors'>
          <span>Name</span>
        </div>
        <div className='pr-4'>
          <Plus className='text-muted-foreground/40 hover:text-foreground h-3.5 w-3.5 cursor-pointer' />
        </div>
      </div>

      {!entries || entries.length === 0 ? (
        <div className='border-border/80 flex flex-col items-center justify-center border-b border-dashed py-20 text-center'>
          <p className='text-muted-foreground text-sm font-medium'>
            No components registered inside {schemaTitle} yet.
          </p>
          <button
            onClick={onCreateClick}
            className='text-primary mt-1.5 flex items-center gap-1 text-xs font-semibold hover:underline'
          >
            Create your first entry{' '}
            <Plus className='h-3 w-3' strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <div className='divide-border/30 divide-y'>
          {entries.map((entry) => (
            <Link
              key={entry.id}
              to={`/w/${workspaceId}/entries/${entry.id}`}
              className='group grid grid-cols-[1fr_auto] items-center px-2 py-2.5 transition-colors hover:bg-neutral-50'
            >
              <div className='flex min-w-0 items-center gap-3'>
                <span className='shrink-0'>
                  <File className='text-muted-foreground h-4 w-4' />
                </span>
                <span className='text-foreground/90 group-hover:text-foreground truncate font-medium tracking-wide'>
                  {entry.title || 'Untitled object'}
                </span>
              </div>
              <div className='text-muted-foreground/40 pr-4 text-xs'></div>
            </Link>
          ))}

          <button
            onClick={onCreateClick}
            className='text-muted-foreground/50 hover:text-muted-foreground flex w-full cursor-pointer items-center gap-3 px-2 py-2.5 text-left transition-colors'
          >
            <Plus className='h-4 w-4' />
            <span className='text-xs tracking-wide'>New Entry</span>
          </button>
        </div>
      )}
    </div>
  );
};
