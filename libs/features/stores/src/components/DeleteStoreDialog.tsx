/**
 * DeleteStoreDialog Component
 *
 * Confirmation dialog for deleting stores with cascade warning.
 */

import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useDeleteStore } from '@org/data-access';
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

interface DeleteStoreDialogProps {
  storeId: string;
  storeName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

/**
 * DeleteStoreDialog shows a confirmation dialog with cascade warnings
 */
export function DeleteStoreDialog({
  storeId,
  storeName,
  open,
  onOpenChange,
  onSuccess,
}: DeleteStoreDialogProps) {
  const navigate = useNavigate();
  const deleteStore = useDeleteStore();

  const handleDelete = async () => {
    try {
      await deleteStore.mutateAsync(storeId);

      toast({
        title: 'Success',
        description: `Store "${storeName}" has been deleted successfully`,
      });

      onOpenChange(false);

      if (onSuccess) {
        onSuccess();
      } else {
        // Navigate back to stores list
        navigate('/stores');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to delete store',
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Store</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete store "{storeName}"?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Warning:</strong> This action cannot be undone. Deleting
            this store will also delete:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>All products in this store</li>
              <li>All related data and relationships</li>
            </ul>
          </AlertDescription>
        </Alert>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteStore.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteStore.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteStore.isPending ? 'Deleting...' : 'Delete Store'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
