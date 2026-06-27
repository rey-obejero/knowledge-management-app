import { z } from 'zod';
import { useAuthentication } from '../hooks/use-authentication';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const signInSchema = z.object({
  email: z.email('Email address is invalid.'),
  password: z.string().min(1, 'Password is required.'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const { signIn, isLoading, error } = useAuthentication();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    const response = await signIn(data);
    if (response?.success) {
      const navigate = useNavigate();
      navigate(paths.app.home.getHref());
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
      <div className='space-y-1.5'>
        <Input
          id='email'
          type='email'
          placeholder='Enter your email'
          className='bg-background h-11'
          {...register('email')}
        />
        {errors.email && (
          <p className='text-destructive text-xs'>{errors.email.message}</p>
        )}
      </div>

      <div className='space-y-1.5'>
        <Input
          id='password'
          type='password'
          placeholder='Enter your password'
          className='bg-background h-11'
          {...register('password')}
        />
        <div className='flex items-center justify-end'>
          <a
            href='#'
            className='flex-start text-muted-foreground hover:text-foreground text-xs duration-250'
          >
            Forgot password?
          </a>
        </div>
        {errors.password && (
          <p className='text-destructive text-xs'>{errors.password.message}</p>
        )}
      </div>

      {error && <p className='text-destructive text-sm'>{error}</p>}

      <Button
        type='submit'
        className='bg-primary text-primary-foreground hover:bg-primary/75 h-11 w-full cursor-pointer duration-250'
        disabled={isLoading}
      >
        {isLoading ? <LoaderCircle className='animate-spin' /> : 'Sign In'}
      </Button>
    </form>
  );
};
