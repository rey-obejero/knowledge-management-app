export type AuthenticationLayoutProps = {
  children: React.ReactNode;
};

export const AuthenticationLayout = ({
  children,
}: AuthenticationLayoutProps) => {
  return (
    <div className='bg-muted flex h-screen flex-col items-center justify-center'>
      <div className='w-sm'>{children}</div>
    </div>
  );
};
