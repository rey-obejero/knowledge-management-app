import { z } from 'zod';
import { useAuth } from "../hooks/use-auth";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { paths } from '@/config/paths';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="relative">
        <Input
          id="email"
          type="email"
          placeholder="Please enter your email..."
          className="h-12 rounded-full border-0 bg-muted px-6 text-center text-sm placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-primary/20"
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1.5 text-center text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="relative">
        <Input
          id="password"
          type="password"
          placeholder="Please enter your password..."
          className="h-12 rounded-full border-0 bg-muted px-6 text-center text-sm placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-primary/20"
          {...register('password')}
        />
        {errors.password && (
          <p className="mt-1.5 text-center text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <p className="text-center text-xs text-destructive">{error}</p>
      )}

      <Button
        type="submit"
        className="h-11 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};
