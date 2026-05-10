/**
 * StoreList Component
 *
 * Displays stores in a responsive grid layout with search, filters, and actions.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Store as StoreIcon } from 'lucide-react';
import { useStores, useVendors } from '@org/data-access';
import {
  Button,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@org/ui';
import type { StoreWithVendor, Vendor } from '@org/types';
import { StoreCard } from './StoreCard';

interface StoreListProps {
  onCreateClick?: () => void;
  onViewClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  stores?: StoreWithVendor[];
  readOnly?: boolean;
}

/**
 * StoreList displays stores in a responsive grid with search, filters, and actions
 */
export function StoreList({
  onCreateClick,
  onViewClick,
  onEditClick,
  onDeleteClick,
  canCreate = false,
  canEdit = false,
  canDelete = false,
  stores: externalStores,
  readOnly = false,
}: StoreListProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');
  const [vendorFilter, setVendorFilter] = useState<string>('all');

  // Fetch all stores (client-side filtering for better UX) - skip if external stores provided
  const { data: storesData, isLoading, error } = useStores();

  // Fetch vendors for filter dropdown
  const { data: vendorsData } = useVendors();

  // When readOnly is true, disable all edit/create/delete actions
  const effectiveCanCreate = readOnly ? false : canCreate;
  const effectiveCanEdit = readOnly ? false : canEdit;
  const effectiveCanDelete = readOnly ? false : canDelete;

  const handleView = (id: string) => {
    if (onViewClick) {
      onViewClick(id);
    } else {
      navigate(`/stores/${id}`);
    }
  };

  const handleEdit = (id: string) => {
    if (onEditClick) {
      onEditClick(id);
    } else {
      navigate(`/stores/${id}/edit`);
    }
  };

  const handleDelete = (id: string) => {
    if (onDeleteClick) {
      onDeleteClick(id);
    }
  };

  const handleCreate = () => {
    if (onCreateClick) {
      onCreateClick();
    } else {
      navigate('/stores/new');
    }
  };

  // Only show loading/error states if we're fetching data internally
  if (!externalStores && isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading stores..." />
      </div>
    );
  }

  if (!externalStores && error) {
    return (
      <ErrorMessage
        title="Failed to load stores"
        message={error instanceof Error ? error.message : 'An error occurred'}
      />
    );
  }

  // Filter stores client-side
  const allStores = (externalStores ||
    storesData?.data ||
    []) as StoreWithVendor[];
  const stores = allStores.filter((store) => {
    if (
      statusFilter !== 'all' &&
      store.isActive !== (statusFilter === 'active')
    ) {
      return false;
    }
    if (vendorFilter !== 'all' && store.vendorId !== vendorFilter) {
      return false;
    }
    return true;
  });

  const vendors = (vendorsData?.data || []) as Vendor[];

  return (
    <div className="space-y-6">
      {/* Header with filters and actions */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full sm:w-auto">
            <Input
              placeholder="Search stores..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              className="w-full sm:w-[300px]"
            />
            <Select
              value={statusFilter}
              onValueChange={(value: string) =>
                setStatusFilter(value as 'all' | 'active' | 'inactive')
              }
            >
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {vendors.length > 0 && (
              <Select value={vendorFilter} onValueChange={setVendorFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vendors</SelectItem>
                  {vendors.map((vendor: Vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          {effectiveCanCreate && (
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Create Store
            </Button>
          )}
        </div>
      </div>

      {/* Grid or Empty State */}
      {stores.length === 0 ? (
        <EmptyState
          icon={StoreIcon}
          title="No stores found"
          description={
            search || statusFilter !== 'all' || vendorFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first store'
          }
          action={
            effectiveCanCreate &&
            !search &&
            statusFilter === 'all' &&
            vendorFilter === 'all'
              ? {
                  label: 'Create Store',
                  onClick: handleCreate,
                }
              : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store: StoreWithVendor) => (
            <StoreCard
              key={store.id}
              store={store}
              onView={handleView}
              onEdit={effectiveCanEdit ? handleEdit : undefined}
              onDelete={effectiveCanDelete ? handleDelete : undefined}
              canEdit={effectiveCanEdit}
              canDelete={effectiveCanDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
