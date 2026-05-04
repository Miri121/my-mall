import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormDataSchema, type LoginFormData } from '@org/types';
import { Button, Input, Label, ErrorMessage } from '@org/ui';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPasswordClick?: () => void;
  onRegisterClick?: () => void;
}

// Email/password login form component
export function LoginForm({
  onSuccess,
  onForgotPasswordClick,
  onRegisterClick,
}: LoginFormProps) {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormDataSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      const success = await login(data);
      if (success) {
        onSuccess?.();
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during login'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          disabled={isSubmitting}
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          disabled={isSubmitting}
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="rememberMe"
          type="checkbox"
          {...register('rememberMe')}
          disabled={isSubmitting}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="rememberMe" className="font-normal">
          Remember me
        </Label>
      </div>

      {error && <ErrorMessage message={error} />}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>

      <div className="space-y-2 text-center text-sm">
        {onForgotPasswordClick && (
          <button
            type="button"
            onClick={onForgotPasswordClick}
            className="text-primary hover:underline"
          >
            Forgot Password?
          </button>
        )}
        {onRegisterClick && (
          <div>
            <span className="text-muted-foreground">
              Don't have an account?{' '}
            </span>
            <button
              type="button"
              onClick={onRegisterClick}
              className="text-primary hover:underline"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
