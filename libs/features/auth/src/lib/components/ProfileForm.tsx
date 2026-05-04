import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProfileUpdateFormDataSchema,
  type ProfileUpdateFormData,
} from '@org/types';
import { Button, Input, Label, ErrorMessage, ImageUpload } from '@org/ui';
import { useUpdateProfile, useUploadAvatar } from '@org/data-access';
import { useToast } from '@org/ui';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface ProfileFormProps {
  onSuccess?: () => void;
}

// User profile editing form component
export function ProfileForm({ onSuccess }: ProfileFormProps) {
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfile();
  const uploadAvatarMutation = useUploadAvatar();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(ProfileUpdateFormDataSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      avatar: user?.avatar || null,
      preferredLanguage: user?.preferredLanguage || 'en',
    },
  });
  const avatar = watch('avatar');

  const handleAvatarUpload = async (file: File | null) => {
    try {
      if (!file) return;
      const response = await uploadAvatarMutation.mutateAsync(file);
      setValue('avatar', response.avatar);
      toast({
        title: 'Success',
        description: 'Avatar uploaded successfully',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to upload avatar',
        variant: 'destructive',
      });
    }
  };

  const onSubmit = async (data: ProfileUpdateFormData) => {
    try {
      setError(null);
      await updateProfileMutation.mutateAsync(data);
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label>Avatar</Label>
        <ImageUpload
          value={avatar || undefined}
          onChange={handleAvatarUpload}
          disabled={uploadAvatarMutation.isPending || isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          {...register('name')}
          disabled={uploadAvatarMutation.isPending || isSubmitting}
        />
        {errors.name && <ErrorMessage message={errors.name.message ?? ''} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={user?.email || ''}
          disabled
          className="bg-muted"
        />
        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          {...register('phone')}
          disabled={uploadAvatarMutation.isPending || isSubmitting}
        />
        {errors.phone && <ErrorMessage message={errors.phone.message ?? ''} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredLanguage">Preferred Language</Label>
        <select
          id="preferredLanguage"
          {...register('preferredLanguage')}
          disabled={uploadAvatarMutation.isPending || isSubmitting}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="en">English</option>
          <option value="he">עברית</option>
        </select>
        {errors.preferredLanguage && (
          <ErrorMessage message={errors.preferredLanguage.message ?? ''} />
        )}
      </div>

      {error && <ErrorMessage message={error} />}

      <Button
        type="submit"
        disabled={uploadAvatarMutation.isPending || isSubmitting}
        className="w-full"
      >
        {uploadAvatarMutation.isPending
          ? 'Uploading Avatar...'
          : isSubmitting
          ? 'Updating...'
          : 'Update Profile'}
      </Button>
    </form>
  );
}
