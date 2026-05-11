import { Sidebar } from "../sidebar";

export interface RootLayoutProps {
  children: React.ReactNode;
};

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className='flex h-screen w-screen bg-background p-2'>
      <Sidebar />
      <main className='flex-1 overflow-auto bg-background'>
        {children}
      </main>
    </div>
  );
}
