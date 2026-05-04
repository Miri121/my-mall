import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChangePasswordFormDataSchema,
  type ChangePasswordFormData,
} from '@org/types';
import { Button, Input, Label, ErrorMessage } from '@org/ui';
import { useChangePassword } from '@org/data-access';
import { useToast } from '@org/ui';
import { useState } from 'react';

interface ChangePasswordFormProps {
  onSuccess?: () => void;
}

// Change password form component
export function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {
  const changePasswordMutation = useChangePassword();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordFormDataSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setError(null);
      await changePasswordMutation.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast({
        title: 'Success',
        description: 'Password changed successfully',
      });
      reset();
      onSuccess?.();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to change password'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          type="password"
          placeholder="Enter your current password"
          {...register('currentPassword')}
          disabled={isSubmitting}
        />
        {errors.currentPassword && (
          <ErrorMessage message={errors.currentPassword.message ?? ''} />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Enter your new password"
          {...register('newPassword')}
          disabled={isSubmitting}
        />
        {errors.newPassword && (
          <ErrorMessage message={errors.newPassword.message ?? ''} />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your new password"
          {...register('confirmPassword')}
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <ErrorMessage message={errors.confirmPassword.message ?? ''} />
        )}
      </div>

      {error && <ErrorMessage message={error} />}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Changing...' : 'Change Password'}
      </Button>
    </form>
  );
}
