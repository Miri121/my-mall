/**
 * VendorForm Component
 *
 * Create/Edit vendor form using react-hook-form with Zod validation.
 */

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useCreateVendor, useUpdateVendor } from '@org/data-access';
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
  toast,
} from '@org/ui';
import {
  VendorCreateInputSchema,
  VendorUpdateInputSchema,
  type Vendor,
  type VendorCreateInput,
  type VendorUpdateInput,
} from '@org/types';

interface VendorFormProps {
  vendor?: Vendor;
  mode?: 'create' | 'edit';
  onSuccess?: (vendor: Vendor) => void;
  onCancel?: () => void;
  canManageStatus?: boolean;
}

type FormData = VendorCreateInput & { isActive?: boolean };

/**
 * VendorForm handles creating and editing vendors
 */
export function VendorForm({
  vendor,
  mode = 'create',
  onSuccess,
  onCancel,
  canManageStatus = false,
}: VendorFormProps) {
  const isEditMode = mode === 'edit' && vendor;
  const createVendor = useCreateVendor();
  const updateVendor = useUpdateVendor();

  // Determine schema based on mode
  const schema = isEditMode
    ? VendorUpdateInputSchema.extend({
        isActive: VendorUpdateInputSchema.shape.isActive,
      })
    : VendorCreateInputSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: isEditMode
      ? {
          name: vendor.name,
          company: vendor.company,
          phone: vendor.phone,
          isActive: vendor.isActive,
        }
      : {
          email: '',
          name: '',
          company: '',
          phone: '',
          password: '',
        },
  });

  const isActiveValue = watch('isActive');

  // Reset form when vendor changes
  useEffect(() => {
    if (isEditMode) {
      reset({
        name: vendor.name,
        company: vendor.company,
        phone: vendor.phone,
        isActive: vendor.isActive,
      });
    }
  }, [vendor, isEditMode, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditMode) {
        // Update vendor
        const updateData: VendorUpdateInput = {
          name: data.name,
          company: data.company,
          phone: data.phone,
          ...(canManageStatus && { isActive: data.isActive }),
        };

        const result = await updateVendor.mutateAsync({
          id: vendor.id,
          data: updateData,
        });

        toast({
          title: 'Success',
          description: 'Vendor updated successfully',
        });

        if (onSuccess) {
          onSuccess(result);
        }
      } else {
        // Create vendor
        const createData: VendorCreateInput = {
          email: data.email,
          name: data.name,
          company: data.company,
          phone: data.phone,
          password: data.password,
        };

        const result = await createVendor.mutateAsync(createData);

        toast({
          title: 'Success',
          description: 'Vendor created successfully',
        });

        reset();

        if (onSuccess) {
          onSuccess(result);
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const isLoading = createVendor.isPending || updateVendor.isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditMode ? 'Edit Vendor' : 'Create New Vendor'}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Email field (create only) */}
          {!isEditMode && (
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="vendor@example.com"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          )}

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

          {/* Company field */}
          <div className="space-y-2">
            <Label htmlFor="company">
              Company <span className="text-destructive">*</span>
            </Label>
            <Input
              id="company"
              type="text"
              placeholder="Company Name Inc."
              {...register('company')}
              disabled={isLoading}
            />
            {errors.company && (
              <p className="text-sm text-destructive">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* Phone field */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register('phone')}
              disabled={isLoading}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Password field (create only) */}
          {!isEditMode && (
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters
              </p>
            </div>
          )}

          {/* Status field (edit only, admin only) */}
          {isEditMode && canManageStatus && (
            <div className="space-y-2">
              <Label htmlFor="isActive">Status</Label>
              <Select
                value={isActiveValue ? 'active' : 'inactive'}
                onValueChange={(value) =>
                  setValue('isActive', value === 'active')
                }
                disabled={isLoading}
              >
                <SelectTrigger id="isActive">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.isActive && (
                <p className="text-sm text-destructive">
                  {errors.isActive.message}
                </p>
              )}
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
            {isEditMode ? 'Update' : 'Create'} Vendor
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
