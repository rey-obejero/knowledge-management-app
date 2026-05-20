import { useNavigate } from 'react-router-dom';

export const HomeRoute = () => {
  const navigate = useNavigate();

  return (
    <div className='flex h-full'>
      <main className='flex flex-1 items-center justify-center'>
        <div className='text-muted-foreground text-center'>
          <p className='text-sm font-medium'>Welcome</p>
          <p className='mt-1 text-xs'>Select a workspace to get started.</p>
        </div>
      </main>
    </div>
  );
};
