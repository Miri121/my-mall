/**
 * UserForm Component
 *
 * Edit user form using react-hook-form with Zod validation.
 * Note: No create mode - users register themselves.
 */

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, X } from 'lucide-react';
import { useUpdateUser, useUploadAvatar } from '@org/data-access';
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ImageUpload,
  toast,
  Avatar,
  AvatarImage,
  AvatarFallback,
  RadioGroup,
  RadioGroupItem,
} from '@org/ui';
import {
  UserUpdateInputSchema,
  type User,
  type UserUpdateInput,
} from '@org/types';

interface UserFormProps {
  user: User;
  onSuccess?: (user: User) => void;
  onCancel?: () => void;
  canChangeRole?: boolean; // Only admins can change role
  canChangeStatus?: boolean; // Only admins can change active status
}

/**
 * UserForm handles editing existing users
 */
export function UserForm({
  user,
  onSuccess,
  onCancel,
  canChangeRole = false,
  canChangeStatus = false,
}: UserFormProps) {
  const updateUser = useUpdateUser();
  const uploadAvatar = useUploadAvatar();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(
    user.avatar || null
  );
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<UserUpdateInput>({
    resolver: zodResolver(UserUpdateInputSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone || '',
      avatar: user.avatar || null,
      preferredLanguage: user.preferredLanguage || 'en',
      isActive: user.isActive,
    },
  });

  // Reset form when user changes
  useEffect(() => {
    reset({
      name: user.name,
      phone: user.phone || '',
      avatar: user.avatar || null,
      preferredLanguage: user.preferredLanguage || 'en',
      isActive: user.isActive,
    });
    setCurrentAvatar(user.avatar || null);
    setAvatarFile(null);
  }, [user, reset]);

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      setAvatarFile(file);
      // Preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setCurrentAvatar(null);
    setValue('avatar', null);
  };

  const onSubmit = async (data: UserUpdateInput) => {
    try {
      // Upload avatar first if changed
      if (avatarFile) {
        setIsUploadingAvatar(true);
        const avatarResult = await uploadAvatar.mutateAsync(avatarFile);
        data.avatar = avatarResult.avatar || null;
        setIsUploadingAvatar(false);
      }

      // Update user
      const updatedUser = await updateUser.mutateAsync({
        id: user.id,
        data,
      });

      toast({
        title: 'Success',
        description: 'User updated successfully',
      });

      if (onSuccess) {
        onSuccess(updatedUser);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to update user',
        variant: 'destructive',
      });
    }
  };

  const isLoading = updateUser.isPending || isUploadingAvatar;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit User</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {/* Avatar Upload */}
          <div className="space-y-2">
            <Label>Avatar</Label>
            <div className="flex items-center gap-4">
              {/* Current Avatar Preview */}
              <Avatar className="h-20 w-20">
                <AvatarImage src={currentAvatar || undefined} alt={user.name} />
                <AvatarFallback className="text-xl">{initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                {currentAvatar ? (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveAvatar}
                      disabled={isLoading}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Remove Avatar
                    </Button>
                  </div>
                ) : (
                  <ImageUpload
                    onChange={handleAvatarChange}
                    disabled={isLoading}
                    maxSize={2 * 1024 * 1024}
                    accept="image/*"
                  />
                )}
                <p className="text-xs text-muted-foreground">
                  Upload a profile picture (max 2MB)
                </p>
              </div>
            </div>
          </div>

          {/* Name field */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register('name')}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email field (read-only) */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed
            </p>
          </div>

          {/* Phone field */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 234 567 8900"
              {...register('phone')}
              disabled={isLoading}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Role field (read-only for non-admins) */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            {canChangeRole ? (
              <Select disabled value={user.role}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="role"
                value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                disabled
                className="bg-muted"
              />
            )}
            <p className="text-xs text-muted-foreground">
              Role cannot be changed after user creation
            </p>
          </div>

          {/* Preferred Language */}
          <div className="space-y-2">
            <Label htmlFor="preferredLanguage">Preferred Language</Label>
            <Select
              value={watch('preferredLanguage')}
              onValueChange={(value: string) =>
                setValue('preferredLanguage', value as 'en' | 'he')
              }
              disabled={isLoading}
            >
              <SelectTrigger id="preferredLanguage">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="he">Hebrew</SelectItem>
              </SelectContent>
            </Select>
            {errors.preferredLanguage && (
              <p className="text-sm text-destructive">
                {errors.preferredLanguage.message}
              </p>
            )}
          </div>

          {/* Active Status (Admin only) */}
          {canChangeStatus && (
            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup
                value={watch('isActive') ? 'active' : 'inactive'}
                onValueChange={(value: string) =>
                  setValue('isActive', value === 'active')
                }
                disabled={isLoading}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="font-normal">
                    Active
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="inactive" />
                  <Label htmlFor="inactive" className="font-normal">
                    Inactive
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground">
                Inactive users cannot log in
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex gap-2 justify-end">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update User
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
