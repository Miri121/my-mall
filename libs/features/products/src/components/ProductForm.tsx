/**
 * ProductForm Component
 *
 * Create/Edit product form using react-hook-form with Zod validation.
 */

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, X } from 'lucide-react';
import {
  useCreateProduct,
  useUpdateProduct,
  useUploadProductImages,
  useCategories,
  useStores,
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
  ProductCreateInputSchema,
  ProductUpdateInputSchema,
  type Product,
  type ProductCreateInput,
  type ProductUpdateInput,
  type Category,
  type Store,
} from '@org/types';

interface ProductFormProps {
  product?: Product;
  mode?: 'create' | 'edit';
  onSuccess?: (product: Product) => void;
  onCancel?: () => void;
  vendorStoreId?: string; // Pre-select store for vendor
}

/**
 * ProductForm handles creating and editing products
 */
export function ProductForm({
  product,
  mode = 'create',
  onSuccess,
  onCancel,
  vendorStoreId,
}: ProductFormProps) {
  const isEditMode = mode === 'edit' && product;
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const uploadImages = useUploadProductImages();

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    product?.images || []
  );

  // Fetch categories and stores for dropdowns
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();
  const { data: storesData, isLoading: storesLoading } = useStores();

  // Determine schema based on mode
  const schema = isEditMode
    ? ProductUpdateInputSchema
    : ProductCreateInputSchema;

  type FormData = typeof isEditMode extends true
    ? ProductUpdateInput
    : ProductCreateInput;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: isEditMode
      ? ({
          name: product.name,
          description: product.description || '',
          price: product.price,
          comparePrice: product.comparePrice || undefined,
          categoryId: product.categoryId || undefined,
          storeId: product.storeId,
        } as any)
      : ({
          name: '',
          description: '',
          price: 0,
          comparePrice: undefined,
          categoryId: undefined,
          storeId: vendorStoreId || '',
          isActive: true,
        } as any),
  });

  const priceValue = watch('price' as any);
  const comparePriceValue = watch('comparePrice' as any);

  // Reset form when product changes
  useEffect(() => {
    if (isEditMode) {
      reset({
        name: product.name,
        description: product.description || '',
        price: product.price,
        comparePrice: product.comparePrice || undefined,
        categoryId: product.categoryId || undefined,
        storeId: product.storeId,
      } as any);
      setExistingImages(product.images || []);
    }
  }, [product, isEditMode, reset]);

  const handleImageAdd = (file: File | null) => {
    if (!file) return;

    if (imageFiles.length + existingImages.length < 5) {
      setImageFiles([...imageFiles, file]);
    } else {
      toast({
        title: 'Maximum images reached',
        description: 'You can only upload up to 5 images per product',
        variant: 'destructive',
      });
    }
  };

  const handleImageRemove = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleExistingImageRemove = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    try {
      // Validate price comparison
      if (data.comparePrice && data.comparePrice <= data.price) {
        toast({
          title: 'Validation Error',
          description: 'Compare price must be greater than price',
          variant: 'destructive',
        });
        return;
      }

      let resultProduct: Product;

      if (isEditMode) {
        // Update product
        const updateData: ProductUpdateInput = {
          name: data.name,
          description: data.description || null,
          price: parseFloat(data.price),
          comparePrice: data.comparePrice
            ? parseFloat(data.comparePrice)
            : null,
          categoryId: data.categoryId || null,
          storeId: data.storeId,
        };

        resultProduct = await updateProduct.mutateAsync({
          id: product.id,
          data: updateData,
        });

        // Upload new images if provided
        if (imageFiles.length > 0) {
          await uploadImages.mutateAsync({
            id: product.id,
            files: imageFiles,
          });
        }

        toast({
          title: 'Success',
          description: 'Product updated successfully',
        });
      } else {
        // Create product
        const createData: ProductCreateInput = {
          name: data.name,
          description: data.description || undefined,
          price: parseFloat(data.price),
          comparePrice: data.comparePrice
            ? parseFloat(data.comparePrice)
            : undefined,
          categoryId: data.categoryId || undefined,
          storeId: data.storeId,
          images: [],
          isActive: data.isActive ?? true,
        };

        resultProduct = await createProduct.mutateAsync(createData);

        // Upload images if provided
        if (imageFiles.length > 0) {
          await uploadImages.mutateAsync({
            id: resultProduct.id,
            files: imageFiles,
          });
        }

        toast({
          title: 'Success',
          description: 'Product created successfully',
        });

        reset();
        setImageFiles([]);
        setExistingImages([]);
      }

      if (onSuccess) {
        onSuccess(resultProduct);
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
    createProduct.isPending ||
    updateProduct.isPending ||
    uploadImages.isPending;

  if (categoriesLoading || storesLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <LoadingSpinner text="Loading form..." />
        </CardContent>
      </Card>
    );
  }

  const categories = (categoriesData || []) as Category[];
  const stores = (storesData?.data || []) as Store[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditMode ? 'Edit Product' : 'Create New Product'}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {/* Name field */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Product Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Nike Air Max"
              {...register('name' as any)}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Description field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Product description..."
              rows={4}
              {...register('description' as any)}
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">
                Price <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="99.99"
                {...register('price' as any, { valueAsNumber: true })}
                disabled={isLoading}
              />
              {errors.price && (
                <p className="text-sm text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="comparePrice">Compare at Price (Optional)</Label>
              <Input
                id="comparePrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="149.99"
                {...register('comparePrice' as any, { valueAsNumber: true })}
                disabled={isLoading}
              />
              {errors.comparePrice && (
                <p className="text-sm text-destructive">
                  {errors.comparePrice.message}
                </p>
              )}
              {comparePriceValue &&
                priceValue &&
                comparePriceValue <= priceValue && (
                  <p className="text-sm text-destructive">
                    Compare price must be greater than price
                  </p>
                )}
            </div>
          </div>

          {/* Category dropdown */}
          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <Select
              value={watch('categoryId' as any) || 'none'}
              onValueChange={(value: string) =>
                setValue('categoryId' as any, value === 'none' ? null : value)
              }
              disabled={isLoading}
            >
              <SelectTrigger id="categoryId">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Category</SelectItem>
                {categories.map((category: Category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-sm text-destructive">
                {(errors.categoryId as any).message}
              </p>
            )}
          </div>

          {/* Store dropdown */}
          <div className="space-y-2">
            <Label htmlFor="storeId">
              Store <span className="text-destructive">*</span>
            </Label>
            <Select
              value={watch('storeId' as any) || ''}
              onValueChange={(value: string) =>
                setValue('storeId' as any, value)
              }
              disabled={
                isLoading || (isEditMode ? true : false) || !!vendorStoreId
              }
            >
              <SelectTrigger id="storeId">
                <SelectValue placeholder="Select a store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store: Store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.storeId && (
              <p className="text-sm text-destructive">
                {(errors.storeId as any).message}
              </p>
            )}
            {isEditMode && (
              <p className="text-xs text-muted-foreground">
                Store cannot be changed after product creation
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Product Images (Up to 5)</Label>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                {existingImages.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => handleExistingImageRemove(index)}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* New Image Uploads */}
            {imageFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                {imageFiles.map((file, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => handleImageRemove(index)}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            {imageFiles.length + existingImages.length < 5 && (
              <ImageUpload
                onChange={handleImageAdd}
                disabled={isLoading}
                maxSize={5 * 1024 * 1024}
              />
            )}

            <p className="text-xs text-muted-foreground">
              You can upload up to 5 images. Max size: 5MB per image.
            </p>
          </div>
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
            {isEditMode ? 'Update' : 'Create'} Product
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
