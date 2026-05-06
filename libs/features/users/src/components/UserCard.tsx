/**
 * UserCard Component
 *
 * Displays user information in a card layout with avatar and actions.
 */

import { Edit, Eye, Trash2, UserCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Badge,
  Button,
  Skeleton,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@org/ui';
import { cn, formatDate, formatRelativeTime } from '@org/utils';
import type { User } from '@org/types';

interface UserCardProps {
  user?: User;
  isLoading?: boolean;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  className?: string;
}

/**
 * UserCard displays user information in a card layout
 */
export function UserCard({
  user,
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
  className,
}: UserCardProps) {
  if (isLoading || !user) {
    return <UserCardSkeleton className={className} />;
  }

  const hasActions = onView || (canEdit && onEdit) || (canDelete && onDelete);
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const roleVariant =
    user.role === 'admin'
      ? 'destructive'
      : user.role === 'vendor'
      ? 'default'
      : 'secondary';

  return (
    <Card
      className={cn(
        'hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full',
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar || undefined} alt={user.name} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{user.name}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
            <div className="flex gap-2 mt-2">
              <Badge variant={roleVariant}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
              <Badge variant={user.isActive ? 'default' : 'secondary'}>
                {user.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-2 text-sm">
        {/* Phone */}
        {user.phone && (
          <div>
            <span className="text-muted-foreground">Phone:</span>{' '}
            <span>{user.phone}</span>
          </div>
        )}

        {/* Joined Date */}
        <div>
          <span className="text-muted-foreground">Joined:</span>{' '}
          <span>{formatDate(user.createdAt, 'MMM dd, yyyy')}</span>
        </div>

        {/* Last Active */}
        <div>
          <span className="text-muted-foreground">Last active:</span>{' '}
          <span>{formatRelativeTime(user.updatedAt)}</span>
        </div>
      </CardContent>

      {hasActions && (
        <CardFooter className="flex gap-2 pt-2">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(user.id)}
              className="flex-1"
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          )}
          {canEdit && onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(user.id)}
              className="flex-1"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
          {canDelete && onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(user.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

/**
 * UserCardSkeleton displays a loading skeleton for the user card
 */
function UserCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn('overflow-hidden flex flex-col h-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </CardFooter>
    </Card>
  );
}
