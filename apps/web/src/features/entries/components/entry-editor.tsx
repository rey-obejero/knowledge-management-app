import { useState, useEffect, useCallback } from 'react';
import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/shadcn';
import '@blocknote/shadcn/style.css';
import { Input } from '@/components/ui/input';
import { useUpdateEntry } from '@/features/entries/hooks/use-update-entry';

interface EntryEditorProps {
  entryId: string;
  entryType: string;
  initialTitle?: string;
  initialContent?: object;
}

export const EntryEditor = ({
  entryId,
  entryType,
  initialTitle = '',
  initialContent,
}: EntryEditorProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [isDirty, setIsDirty] = useState(false);
  const { mutate: updateEntry } = useUpdateEntry();

  const { audio, file, image, video, ...remainingBlockSpecs } =
    defaultBlockSpecs;

  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...remainingBlockSpecs,
    },
  });

  const editor = useCreateBlockNote({
    schema,
    initialContent: initialContent ? (initialContent as any[]) : undefined,
  });

  // Sync initial content when it changes
  useEffect(() => {
    if (initialContent && editor) {
      editor.replaceBlocks(editor.document, initialContent as any[]);
      setTitle(initialTitle);
      setIsDirty(false);
    }
  }, [initialContent, initialTitle, editor]);

  // Debounced auto-save
  useEffect(() => {
    console.log('Effect running, isDirty:', isDirty, 'entryId:', entryId);

    if (!isDirty || !entryId) {
      console.log('Skipping save — not dirty or no entryId');
      return;
    }

    const timeout = setTimeout(() => {
      console.log('Timer fired, saving...');

      if (!editor) {
        console.log('No editor, aborting');
        return;
      }

      const content = editor.document;
      console.log('Content:', content);

      updateEntry({
        id: entryId,
        type: entryType,
        title: title || 'Untitled',
        content: JSON.stringify(content),
      });

      setIsDirty(false);
    }, 1000);

    return () => {
      console.log('Cleanup: clearing timeout');
      clearTimeout(timeout);
    };
  }, [title, editor, isDirty, entryId, entryType, updateEntry]);

  const handleTitleChange = useCallback((value: string) => {
    console.log('Title changed:', value);
    setTitle(value);
    setIsDirty(true);
  }, []);

  // Listen to BlockNote editor changes
  useEffect(() => {
    if (!editor) return;

    const unsubscribe = editor.onChange(() => {
      console.log('Editor changed');
      setIsDirty(true);
    });

    return () => {
      unsubscribe();
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className='bg-background flex h-full flex-col overflow-auto selection:bg-zinc-200/60 dark:selection:bg-zinc-800/60'>
      <div className='mx-auto w-full max-w-[740px] flex-1 px-12 pt-24 pb-32'>
        <Input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder='Untitled'
          className='text-foreground mb-10 h-auto border-0 bg-transparent px-0 py-0 text-4xl font-extrabold tracking-tight transition-all placeholder:text-zinc-300 focus-visible:ring-0 dark:placeholder:text-zinc-700'
        />

        <BlockNoteView editor={editor} className='w-full' />
      </div>
    </div>
  );
};
