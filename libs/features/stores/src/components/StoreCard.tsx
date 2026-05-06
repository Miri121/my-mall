/**
 * StoreCard Component
 *
 * Displays store information in a card layout with logo, cover image, and actions.
 */

import {
  Edit,
  Eye,
  Trash2,
  ExternalLink,
  Store as StoreIcon,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Skeleton,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@org/ui';
import { cn, truncate } from '@org/utils';
import type { Store, StoreWithVendor } from '@org/types';

interface StoreCardProps {
  store?: Store | StoreWithVendor;
  isLoading?: boolean;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  className?: string;
}

/**
 * StoreCard displays store information in a card layout
 */
export function StoreCard({
  store,
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
  className,
}: StoreCardProps) {
  if (isLoading || !store) {
    return <StoreCardSkeleton className={className} />;
  }

  const hasActions = onView || (canEdit && onEdit) || (canDelete && onDelete);
  const storeWithVendor = store as StoreWithVendor;
  const vendorName = storeWithVendor.vendor?.name;

  return (
    <Card
      className={cn(
        'hover:shadow-lg transition-shadow overflow-hidden',
        className
      )}
    >
      {/* Cover Image Background */}
      {store.coverImage && (
        <div className="h-32 w-full overflow-hidden">
          <img
            src={store.coverImage}
            alt={`${store.name} cover`}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <CardHeader className={cn(!store.coverImage && 'pb-3')}>
        <div className="flex items-start gap-3">
          {/* Store Logo */}
          <Avatar className="h-12 w-12">
            <AvatarImage src={store.logo || undefined} alt={store.name} />
            <AvatarFallback>
              <StoreIcon className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg line-clamp-1">
                {store.name}
              </CardTitle>
              <Badge
                variant={store.isActive ? 'default' : 'secondary'}
                className="shrink-0"
              >
                {store.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            {vendorName && (
              <p className="text-sm text-muted-foreground">{vendorName}</p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {store.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {truncate(store.description, 100)}
          </p>
        )}
        <div className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
          <a
            href={store.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline truncate"
            onClick={(e) => e.stopPropagation()}
          >
            {store.url}
          </a>
        </div>
      </CardContent>

      {hasActions && (
        <CardFooter className="flex gap-2">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(store.id)}
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
              onClick={() => onEdit(store.id)}
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
              onClick={() => onDelete(store.id)}
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
 * StoreCardSkeleton displays a loading skeleton for the store card
 */
function StoreCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <div className="h-32 w-full">
        <Skeleton className="h-full w-full rounded-t-lg rounded-b-none" />
      </div>
      <CardHeader>
        <div className="flex items-start gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </CardFooter>
    </Card>
  );
}
