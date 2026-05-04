import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ResetPasswordFormDataSchema,
  type ResetPasswordFormData,
} from '@org/types';
import { Button, Input, Label, ErrorMessage } from '@org/ui';
import { useUpdatePassword } from '@org/data-access';
import { useState } from 'react';

interface ResetPasswordFormProps {
  token: string;
  onSuccess?: () => void;
}

// New password form component after reset request
export function ResetPasswordForm({
  token,
  onSuccess,
}: ResetPasswordFormProps) {
  const updatePasswordMutation = useUpdatePassword();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordFormDataSchema),
    defaultValues: {
      token,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setError(null);
      await updatePasswordMutation.mutateAsync(data);
      onSuccess?.();
      window.location.href = '/login';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register('token')} />

      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your new password"
          {...register('password')}
          disabled={isSubmitting}
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your new password"
          {...register('confirmPassword')}
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <ErrorMessage message={errors.confirmPassword.message} />
        )}
      </div>

      {error && <ErrorMessage message={error} />}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Resetting...' : 'Reset Password'}
      </Button>
    </form>
  );
}
