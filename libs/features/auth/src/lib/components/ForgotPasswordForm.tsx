import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ForgotPasswordFormDataSchema,
  type ForgotPasswordFormData,
} from '@org/shared/types';
import { Button, Input, Label, ErrorMessage } from '@org/shared/ui';
import { useResetPassword } from '@org/shared/data-access';
import { useState } from 'react';

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onBackToLogin?: () => void;
}

// Password reset request form component
export function ForgotPasswordForm({
  onSuccess,
  onBackToLogin,
}: ForgotPasswordFormProps) {
  const resetPasswordMutation = useResetPassword();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordFormDataSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setError(null);
      setSuccessMessage(null);
      await resetPasswordMutation.mutateAsync(data);
      setSuccessMessage('Check your email for a password reset link');
      onSuccess?.();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to send reset email'
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
          placeholder="Enter your email address"
          {...register('email')}
          disabled={isSubmitting}
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
      </div>

      {successMessage && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
          {successMessage}
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
      </Button>

      {onBackToLogin && (
        <div className="text-center text-sm">
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-primary hover:underline"
          >
            Back to Login
          </button>
        </div>
      )}
    </form>
  );
}
