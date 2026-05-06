/**
 * DeleteProductDialog Component
 *
 * Confirmation dialog for deleting products.
 */

import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useDeleteProduct } from '@org/data-access';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Alert,
  AlertDescription,
  toast,
} from '@org/ui';

interface DeleteProductDialogProps {
  productId: string;
  productName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

/**
 * DeleteProductDialog shows a confirmation dialog for product deletion
 */
export function DeleteProductDialog({
  productId,
  productName,
  open,
  onOpenChange,
  onSuccess,
}: DeleteProductDialogProps) {
  const navigate = useNavigate();
  const deleteProduct = useDeleteProduct();

  const handleDelete = async () => {
    try {
      await deleteProduct.mutateAsync(productId);

      toast({
        title: 'Success',
        description: `Product "${productName}" has been deleted successfully`,
      });

      onOpenChange(false);

      if (onSuccess) {
        onSuccess();
      } else {
        // Navigate back to products list
        navigate('/products');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to delete product',
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete product "{productName}"?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Warning:</strong> This action cannot be undone. The product
            will be permanently removed from your store.
          </AlertDescription>
        </Alert>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteProduct.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteProduct.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteProduct.isPending ? 'Deleting...' : 'Delete Product'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
