/**
 * StoreForm Component
 *
 * Create/Edit store form using react-hook-form with Zod validation.
 * IMPORTANT: url field is REQUIRED for external vendor website links.
 */

import { useEffect, useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import {
  useCreateStore,
  useUpdateStore,
  useUploadStoreLogo,
  useUploadStoreCover,
  useVendors,
} from '@org/data-access';
import {
  Button,
  Input,
  Label,
  Textarea,
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
  LoadingSpinner,
  toast,
} from '@org/ui';
import {
  StoreCreateInputSchema,
  StoreUpdateInputSchema,
  type Store,
  type StoreCreateInput,
  type StoreUpdateInput,
  type Vendor,
} from '@org/types';
import { slugify } from '@org/utils';

interface StoreFormProps {
  store?: Store;
  mode?: 'create' | 'edit';
  onSuccess?: (store: Store) => void;
  onCancel?: () => void;
  canManageStatus?: boolean;
}

/**
 * StoreForm handles creating and editing stores
 */
export function StoreForm({
  store,
  mode = 'create',
  onSuccess,
  onCancel,
  canManageStatus = false,
}: StoreFormProps) {
  const isEditMode = mode === 'edit' && store;
  const createStore = useCreateStore();
  const updateStore = useUpdateStore();
  const uploadLogo = useUploadStoreLogo();
  const uploadCover = useUploadStoreCover();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  // Fetch vendors for dropdown
  const { data: vendorsData, isLoading: vendorsLoading } = useVendors();

  // Define FormData type that includes all possible fields from both create and update modes
  type FormData = {
    name: string;
    slug: string;
    url: string;
    description?: string;
    vendorId?: string; // Only required in create mode
    isActive?: boolean;
  };

  // Determine schema based on mode
  const schema = isEditMode ? StoreUpdateInputSchema : StoreCreateInputSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(
      schema
    ) as Resolver<FormData>,
    defaultValues: isEditMode
      ? {
          name: store.name,
          slug: store.slug,
          url: store.url,
          description: store.description || '',
          isActive: store.isActive,
        }
      : {
          name: '',
          slug: '',
          url: '',
          description: '',
          vendorId: '',
          isActive: true,
        },
  });

  const nameValue = watch('name');
  const isActiveValue = watch('isActive');

  // Auto-generate slug from name
  useEffect(() => {
    if (!isEditMode && nameValue) {
      const generatedSlug = slugify(nameValue);
      setValue('slug', generatedSlug);
    }
  }, [nameValue, isEditMode, setValue]);

  // Reset form when store changes
  useEffect(() => {
    if (isEditMode) {
      reset({
        name: store.name,
        slug: store.slug,
        url: store.url,
        description: store.description || '',
        isActive: store.isActive,
      });
    }
  }, [store, isEditMode, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      let resultStore: Store;

      if (isEditMode) {
        // Update store
        const updateData: StoreUpdateInput = {
          name: data.name,
          slug: data.slug,
          url: data.url,
          description: data.description || null,
          ...(canManageStatus && { isActive: data.isActive }),
        };

        resultStore = await updateStore.mutateAsync({
          id: store.id,
          data: updateData,
        });

        // Upload images if provided
        if (logoFile) {
          await uploadLogo.mutateAsync({ id: store.id, file: logoFile });
        }
        if (coverFile) {
          await uploadCover.mutateAsync({ id: store.id, file: coverFile });
        }

        toast({
          title: 'Success',
          description: 'Store updated successfully',
        });
      } else {
        // Create store
        // Ensure vendorId is present (should be validated by form, but TypeScript needs the check)
        if (!data.vendorId) {
          toast({
            title: 'Error',
            description: 'Vendor is required',
            variant: 'destructive',
          });
          return;
        }

        const createData: StoreCreateInput = {
          name: data.name,
          slug: data.slug,
          url: data.url,
          description: data.description,
          vendorId: data.vendorId,
          isActive: data.isActive ?? true,
        };

        resultStore = await createStore.mutateAsync(createData);

        // Upload images if provided
        if (logoFile) {
          await uploadLogo.mutateAsync({ id: resultStore.id, file: logoFile });
        }
        if (coverFile) {
          await uploadCover.mutateAsync({
            id: resultStore.id,
            file: coverFile,
          });
        }

        toast({
          title: 'Success',
          description: 'Store created successfully',
        });

        reset();
        setLogoFile(null);
        setCoverFile(null);
      }

      if (onSuccess) {
        onSuccess(resultStore);
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

  const isLoading =
    createStore.isPending ||
    updateStore.isPending ||
    uploadLogo.isPending ||
    uploadCover.isPending;

  if (vendorsLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <LoadingSpinner text="Loading form..." />
        </CardContent>
      </Card>
    );
  }

  const vendors = (vendorsData?.data || []) as Vendor[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? 'Edit Store' : 'Create New Store'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {/* Name field */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Store Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Nike Store"
              {...register('name')}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Slug field */}
          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="text-destructive">*</span>
            </Label>
            <Input
              id="slug"
              type="text"
              placeholder="nike-store"
              {...register('slug')}
              disabled={isLoading}
            />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Auto-generated from name. URL-safe identifier for the store.
            </p>
          </div>

          {/* URL field - REQUIRED */}
          <div className="space-y-2">
            <Label htmlFor="url">
              Store URL <span className="text-destructive">*</span>
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="https://store.example.com"
              {...register('url')}
              disabled={isLoading}
            />
            {errors.url && (
              <p className="text-sm text-destructive">{errors.url.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              External website URL for this store (will be displayed in iframe)
            </p>
          </div>

          {/* Description field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the store..."
              rows={4}
              {...register('description')}
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Vendor dropdown (create only) */}
          {!isEditMode && (
            <div className="space-y-2">
              <Label htmlFor="vendorId">
                Vendor <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watch('vendorId') || ''}
                onValueChange={(value: string) => setValue('vendorId', value)}
                disabled={isLoading}
              >
                <SelectTrigger id="vendorId">
                  <SelectValue placeholder="Select a vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((vendor: Vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name} ({vendor.company})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vendorId && (
                <p className="text-sm text-destructive">
                  {errors.vendorId.message}
                </p>
              )}
            </div>
          )}

          {/* Logo Upload */}
          <div className="space-y-2">
            <Label>Store Logo</Label>
            <ImageUpload
              value={store?.logo || undefined}
              onChange={setLogoFile}
              disabled={isLoading}
              maxSize={2 * 1024 * 1024}
            />
            <p className="text-xs text-muted-foreground">
              Recommended: Square image, max 2MB
            </p>
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <ImageUpload
              value={store?.coverImage || undefined}
              onChange={setCoverFile}
              disabled={isLoading}
              maxSize={5 * 1024 * 1024}
            />
            <p className="text-xs text-muted-foreground">
              Recommended: Wide image (16:9), max 5MB
            </p>
          </div>

          {/* Status field (edit only, admin only) */}
          {isEditMode && canManageStatus && (
            <div className="space-y-2">
              <Label htmlFor="isActive">Status</Label>
              <Select
                value={isActiveValue ? 'active' : 'inactive'}
                onValueChange={(value: string) =>
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
            {isEditMode ? 'Update' : 'Create'} Store
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
