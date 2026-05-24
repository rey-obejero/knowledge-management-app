import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { useEntries } from '@/features/entries/hooks/use-entries';
import { useCreateEntry } from '@/features/entries/hooks/use-create-entry';
import { EntriesList } from '@/features/entries/components/entries-list';
import { Button } from '@/components/ui/button';
import { File } from 'lucide-react';

export const EntriesRoute = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [searchParams] = useSearchParams();

  const schemaParam = searchParams.get('schema') || 'Pages';
  const formatSchemaTitle =
    schemaParam.charAt(0).toUpperCase() + schemaParam.slice(1);

  const { data: entries, isLoading } = useEntries({
    workspaceId: workspaceId || '',
    schema: schemaParam,
  });

  const { mutate: createEntry } = useCreateEntry();

  const handleCreateEntry = () => {
    if (!workspaceId) return;
    createEntry(
      {
        workspaceId,
        type: schemaParam.toLowerCase(),
        title: `New Entry`,
        content: '',
      },
      {
        onSuccess: (newEntry) => {
          navigate(`/w/${workspaceId}/entries/${newEntry.id}`);
        },
      },
    );
  };

  return (
    <div className='bg-background flex h-full flex-1 flex-col overflow-hidden px-8 py-6 select-none'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <File className='text-muted-foreground h-6 w-6' strokeWidth={2.5} />
          <h1 className='text-foreground text-2xl font-bold tracking-tight'>
            {formatSchemaTitle}
          </h1>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='h-8 gap-1.5 text-xs font-medium'
          >
            Edit Schema
          </Button>
        </div>
      </div>

      <div className='border-border/40 mb-4 flex items-center justify-between border-b pb-4'>
        <div className='text-foreground text-sm font-semibold tracking-wide'>
          All
        </div>
        <div className='text-muted-foreground/70 flex items-center gap-3'>
          <div className='bg-border/60 h-3.5 w-[1px]' />

          <div className='flex items-center'>
            <Button
              onClick={handleCreateEntry}
              size='sm'
              className='bg-primary h-7 cursor-pointer rounded-full px-5 py-4 text-xs font-medium text-white transition-colors'
            >
              New
            </Button>
          </div>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto'>
        <EntriesList
          entries={entries}
          isLoading={isLoading}
          schemaTitle={formatSchemaTitle}
          onCreateClick={handleCreateEntry}
        />
      </div>
    </div>
  );
};
