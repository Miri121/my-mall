/**
 * UserList Component
 *
 * Displays users in a responsive DataTable with search, filters, and actions.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Eye, Trash2, Plus, Users as UsersIcon } from 'lucide-react';
import { useUsers } from '@org/data-access';
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
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@org/ui';
import { formatDate } from '@org/utils';
import type { User } from '@org/types';
import type { ColumnDef } from '@org/ui';

interface UserListProps {
  onCreateClick?: () => void;
  onViewClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

/**
 * UserList displays users in a table with search, filters, and actions
 */
export function UserList({
  onCreateClick,
  onViewClick,
  onEditClick,
  onDeleteClick,
  canCreate = false,
  canEdit = false,
  canDelete = false,
}: UserListProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<
    'all' | 'customer' | 'vendor' | 'admin'
  >('all');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');

  // Fetch all users
  const { data, isLoading, error } = useUsers();

  const handleView = (id: string) => {
    if (onViewClick) {
      onViewClick(id);
    } else {
      navigate(`/users/${id}`);
    }
  };

  const handleEdit = (id: string) => {
    if (onEditClick) {
      onEditClick(id);
    } else {
      navigate(`/users/${id}/edit`);
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
      navigate('/users/new');
    }
  };

  // Define table columns
  const columns: ColumnDef<User>[] = [
    {
      header: 'Avatar',
      accessorKey: 'avatar',
      cell: (value: unknown, row: User) => (
        <Avatar className="h-10 w-10">
          <AvatarImage src={value as string | undefined} alt={row.name} />
          <AvatarFallback>
            {row.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      ),
    },
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
      header: 'Role',
      accessorKey: 'role',
      sortable: true,
      cell: (value: unknown) => {
        const role = value as string;
        const variant =
          role === 'admin'
            ? 'destructive'
            : role === 'vendor'
            ? 'default'
            : 'secondary';

        return (
          <Badge variant={variant}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Badge>
        );
      },
    },
    {
      header: 'Status',
      accessorKey: 'isActive',
      cell: (value: unknown) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      header: 'Created',
      accessorKey: 'createdAt',
      sortable: true,
      cell: (value: unknown) => formatDate(value as Date, 'MMM dd, yyyy'),
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (value: unknown, row: User) => (
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
        <LoadingSpinner size="lg" text="Loading users..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load users"
        message={error instanceof Error ? error.message : 'An error occurred'}
      />
    );
  }

  // Filter users client-side
  const allUsers = data?.data || [];
  const users = allUsers.filter((user) => {
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesName = user.name.toLowerCase().includes(searchLower);
      const matchesEmail = user.email.toLowerCase().includes(searchLower);
      if (!matchesName && !matchesEmail) return false;
    }

    // Role filter
    if (roleFilter !== 'all' && user.role !== roleFilter) {
      return false;
    }

    // Status filter
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      if (user.isActive !== isActive) return false;
    }

    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header with filters and actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full sm:w-auto">
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className="w-full sm:w-[300px]"
          />
          <Select
            value={roleFilter}
            onValueChange={(value: string) =>
              setRoleFilter(value as 'all' | 'customer' | 'vendor' | 'admin')
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(value: string) =>
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
            Create User
          </Button>
        )}
      </div>

      {/* Table or Empty State */}
      {users.length === 0 ? (
        <EmptyState
          icon={UsersIcon}
          title="No users found"
          description={
            search || roleFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first user'
          }
          action={
            canCreate &&
            !search &&
            roleFilter === 'all' &&
            statusFilter === 'all'
              ? {
                  label: 'Create User',
                  onClick: handleCreate,
                }
              : undefined
          }
        />
      ) : (
        <DataTable columns={columns} data={users} />
      )}
    </div>
  );
}
