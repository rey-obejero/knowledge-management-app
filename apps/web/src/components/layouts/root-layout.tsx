import { Sidebar } from '../sidebar';

export interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className='bg-background flex h-screen w-screen overflow-hidden'>
      <Sidebar />
      <main className='flex-1 overflow-hidden'>{children}</main>
    </div>
  );
};
