import { SignInForm } from '@/features/authentication';
import { paths } from '@/config/paths';

export const SignInRoute = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='text-center'>
        <h1 className='text-2xl font-semibold'>Welcome Back</h1>
        <p className='text-muted-foreground mt-2 text-sm'>
          Sign in to continue your workspace.
        </p>
      </div>
      <SignInForm />
      <p className='text-muted-foreground text-center text-sm'>
        Don't have an account?{' '}
        <a
          href={paths.authentication.signUp.getHref()}
          className='text-foreground hover:text-foreground/75 font-medium duration-250'
        >
          Sign up
        </a>
      </p>
    </div>
  );
};
