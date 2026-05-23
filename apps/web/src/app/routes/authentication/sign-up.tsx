import { paths } from '@/config/paths';
import { SignUpForm } from '@/features/authentication/components/sign-up-form';

export const SignUpRoute = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='text-center'>
        <h1 className='text-2xl font-semibold'>Get Started</h1>
        <p className='text-muted-foreground mt-2 text-sm'>
          Create your account to continue.
        </p>
      </div>
      <SignUpForm />
      <p className='text-muted-foreground text-center text-sm'>
        Already have an account?{' '}
        <a
          href={paths.authentication.signIn.getHref()}
          className='text-foreground hover:text-foreground/75 font-medium duration-250'
        >
          Sign in
        </a>
      </p>
    </div>
  );
};
