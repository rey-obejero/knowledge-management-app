import { LoginForm } from '@/features/auth';

export const LoginRoute = () => {
  return (
    <div className='flex min-h-screen flex-col bg-muted/50'>
      <main className='flex flex-col flex-1 items-center justify-center px-4 py-12'>
        <div className="w-full max-w-[400px] text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access your account.
          </p>
        </div>

        <div className="mt-8 w-full max-w-[400px]">
          <LoginForm />
        </div>

        <p className='mt-6 text-center text-sm text-muted-foreground'>Don't have an account? {' '}
          <a href='#' className='hover:text-foreground'>Sign up</a>
        </p>
      </main>
    </div>
  );
}
