import { Outlet } from 'react-router-dom';

export const WorkspacesRoute = () => {
  return (
    <main className='bg-background relative flex-1 overflow-auto'>
      <Outlet />
    </main>
  );
};
