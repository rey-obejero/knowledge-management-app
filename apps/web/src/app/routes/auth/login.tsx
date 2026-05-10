import { LoginForm } from '@/features/auth';

export const LoginRoute = () => {
  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <main className='flex flex-col flex-1 items-center justify-center px-4 py-12'>
        <div className='text-center'>
          <div className='mb-8 text-center'>
            <h1 className='text-4xl font-semibold tracking-tight'>
              Login
            </h1>
            <p className='mt-2 text-sm text-muted-foreground'>Log in to your account.</p>
          </div>
        </div>
        <LoginForm />
        <p className='mt-6 text-center text-sm text-muted-foreground'>Don't have an account? {' '}
          <a href='#' className='font-medium'>Sign up</a>
        </p>
      </main>
    </div>
  );
}
