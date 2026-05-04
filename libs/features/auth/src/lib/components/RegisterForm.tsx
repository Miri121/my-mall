import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterFormDataSchema,
  type RegisterFormData,
} from '@org/shared/types';
import { Button, Input, Label, ErrorMessage } from '@org/shared/ui';
import { useRegister } from '@org/shared/data-access';
import { useState } from 'react';

interface RegisterFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

// User registration form component
export function RegisterForm({ onSuccess, onLoginClick }: RegisterFormProps) {
  const registerMutation = useRegister();
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormDataSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      preferredLanguage: 'en',
      acceptTerms: false,
    },
  });

  const password = watch('password');

  // Calculate password strength
  const calculatePasswordStrength = (pwd: string): string => {
    if (!pwd) return '';
    if (pwd.length < 8) return 'weak';

    let strength = 0;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;

    if (strength <= 1) return 'weak';
    if (strength === 2) return 'medium';
    return 'strong';
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      await registerMutation.mutateAsync(data);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          {...register('name')}
          disabled={isSubmitting}
        />
        {errors.name && <ErrorMessage message={errors.name.message} />}
      </div>

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
        <Label htmlFor="phone">Phone (Optional)</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          {...register('phone')}
          disabled={isSubmitting}
        />
        {errors.phone && <ErrorMessage message={errors.phone.message} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register('password', {
            onChange: (e) =>
              setPasswordStrength(calculatePasswordStrength(e.target.value)),
          })}
          disabled={isSubmitting}
        />
        {password && (
          <div className="flex gap-1">
            <div
              className={`h-2 flex-1 rounded ${
                passwordStrength === 'weak' ? 'bg-red-500' : 'bg-gray-200'
              }`}
            />
            <div
              className={`h-2 flex-1 rounded ${
                passwordStrength === 'medium' || passwordStrength === 'strong'
                  ? 'bg-yellow-500'
                  : 'bg-gray-200'
              }`}
            />
            <div
              className={`h-2 flex-1 rounded ${
                passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          </div>
        )}
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          {...register('confirmPassword')}
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <ErrorMessage message={errors.confirmPassword.message} />
        )}
      </div>

      <div className="flex items-start space-x-2">
        <input
          id="acceptTerms"
          type="checkbox"
          {...register('acceptTerms')}
          disabled={isSubmitting}
          className="mt-1 h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="acceptTerms" className="font-normal text-sm">
          I accept the terms and conditions
        </Label>
      </div>
      {errors.acceptTerms && (
        <ErrorMessage message={errors.acceptTerms.message} />
      )}

      {error && <ErrorMessage message={error} />}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>

      {onLoginClick && (
        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{' '}
          </span>
          <button
            type="button"
            onClick={onLoginClick}
            className="text-primary hover:underline"
          >
            Login
          </button>
        </div>
      )}
    </form>
  );
}
