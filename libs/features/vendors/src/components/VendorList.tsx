/**
 * VendorList Component
 *
 * Displays vendors in a responsive DataTable with search, filters, and actions.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Eye, Trash2, Plus, Store } from 'lucide-react';
import { useVendors } from '@org/data-access';
import {
  DataTable,
  Button,
  Badge,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@org/ui';
import { formatDate } from '@org/utils';
import type { Vendor } from '@org/types';
import type { ColumnDef } from '@org/ui';

interface VendorListProps {
  onCreateClick?: () => void;
  onViewClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

/**
 * VendorList displays vendors in a table with search, filters, and actions
 */
export function VendorList({
  onCreateClick,
  onViewClick,
  onEditClick,
  onDeleteClick,
  canCreate = false,
  canEdit = false,
  canDelete = false,
}: VendorListProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');

  // Fetch all vendors (client-side filtering for better UX)
  const { data, isLoading, error } = useVendors();

  const handleView = (id: string) => {
    if (onViewClick) {
      onViewClick(id);
    } else {
      navigate(`/vendors/${id}`);
    }
  };

  const handleEdit = (id: string) => {
    if (onEditClick) {
      onEditClick(id);
    } else {
      navigate(`/vendors/${id}/edit`);
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
      navigate('/vendors/new');
    }
  };

  // Define table columns
  const columns: ColumnDef<Vendor>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      sortable: true,
    },
    {
      header: 'Email',
      accessorKey: 'email',
      sortable: true,
    },
    {
      header: 'Company',
      accessorKey: 'company',
      sortable: true,
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
    },
    {
      header: 'Status',
      accessorKey: 'isActive',
      cell: (value) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      header: 'Created',
      accessorKey: 'createdAt',
      sortable: true,
      cell: (value) => formatDate(value as Date, 'MMM dd, yyyy'),
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (value, row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleView(value as string)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            {canEdit && (
              <DropdownMenuItem onClick={() => handleEdit(value as string)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            )}
            {canDelete && (
              <DropdownMenuItem
                onClick={() => handleDelete(value as string)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading vendors..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load vendors"
        message={error instanceof Error ? error.message : 'An error occurred'}
      />
    );
  }

  // Filter vendors client-side
  const allVendors = data?.data || [];
  const vendors = allVendors.filter((vendor) => {
    // Status filter
    if (
      statusFilter !== 'all' &&
      vendor.isActive !== (statusFilter === 'active')
    ) {
      return false;
    }
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        vendor.name.toLowerCase().includes(searchLower) ||
        vendor.email.toLowerCase().includes(searchLower) ||
        vendor.company?.toLowerCase().includes(searchLower) ||
        vendor.phone?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header with filters and actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full sm:w-auto">
          <Input
            placeholder="Search vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-[300px]"
          />
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value as 'all' | 'active' | 'inactive')
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {canCreate && (
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create Vendor
          </Button>
        )}
      </div>

      {/* Table or Empty State */}
      {vendors.length === 0 ? (
        <EmptyState
          icon={Store}
          title="No vendors found"
          description={
            search || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first vendor'
          }
          action={
            canCreate && !search && statusFilter === 'all'
              ? {
                  label: 'Create Vendor',
                  onClick: handleCreate,
                }
              : undefined
          }
        />
      ) : (
        <DataTable columns={columns} data={vendors} />
      )}
    </div>
  );
}
