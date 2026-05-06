/**
 * DeleteVendorDialog Component
 * 
 * Confirmation dialog for deleting vendors with cascade warning.
 */

import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useDeleteVendor } from '@org/data-access';
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

interface DeleteVendorDialogProps {
  vendorId: string;
  vendorName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

/**
 * DeleteVendorDialog shows a confirmation dialog with cascade warnings
 */
export function DeleteVendorDialog({
  vendorId,
  vendorName,
  open,
  onOpenChange,
  onSuccess,
}: DeleteVendorDialogProps) {
  const navigate = useNavigate();
  const deleteVendor = useDeleteVendor();

  const handleDelete = async () => {
    try {
      await deleteVendor.mutateAsync(vendorId);

      toast({
        title: 'Success',
        description: `Vendor "${vendorName}" has been deleted successfully`,
      });

      onOpenChange(false);

      if (onSuccess) {
        onSuccess();
      } else {
        // Navigate back to vendors list
        navigate('/vendors');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to delete vendor',
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Vendor</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete vendor "{vendorName}"?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Warning:</strong> This action cannot be undone. Deleting this
            vendor will also delete:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>All stores owned by this vendor</li>
              <li>All products in those stores</li>
              <li>All related data and relationships</li>
            </ul>
          </AlertDescription>
        </Alert>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteVendor.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteVendor.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteVendor.isPending ? 'Deleting...' : 'Delete Vendor'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
