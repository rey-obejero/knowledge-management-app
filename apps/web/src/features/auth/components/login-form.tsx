import { z } from 'zod';
import { useAuth } from "../hooks/use-auth";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { paths } from '@/config/paths';

const loginSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const response = await login(data);
    if (response?.success) {
      window.location.href = paths.app.home.getHref();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-[360px] space-y-5'>
      <div className='space-y-1.5'>
        <Input
          id='email'
          type='email'
          placeholder='Enter your email...'
          className='p-5'
          {...register('email')}
        />
        {
          errors.email && (
            <p className='text-sm text-destructive'>{errors.email.message}</p>
          )
        }
      </div>
      <div className='space-y-1.5'>
        <Input
          id='password'
          type='password'
          placeholder='Enter your password...'
          className='p-5'
          {...register('password')}
        />
        {
          errors.password && (
            <p className='text-sm text-destructive'>{errors.password.message}</p>
          )
        }
      </div>
      {error && (
        <p className='text-sm text-destructive'>{error}</p>
      )}
      <Button type='submit' className='w-full p-5' disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};
