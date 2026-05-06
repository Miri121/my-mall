/**
 * VendorCard Component
 *
 * Displays vendor information in a card layout with actions.
 */

import { Edit, Eye, Mail, Phone, Trash2, Building2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Skeleton,
} from '@org/ui';
import { cn } from '@org/utils';
import type { Vendor } from '@org/types';

interface VendorCardProps {
  vendor?: Vendor;
  isLoading?: boolean;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  className?: string;
}

/**
 * VendorCard displays vendor information in a card layout
 */
export function VendorCard({
  vendor,
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
  className,
}: VendorCardProps) {
  if (isLoading || !vendor) {
    return <VendorCardSkeleton className={className} />;
  }

  const hasActions = onView || (canEdit && onEdit) || (canDelete && onDelete);

  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">{vendor.name}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              {vendor.company}
            </div>
          </div>
          <Badge variant={vendor.isActive ? 'default' : 'secondary'}>
            {vendor.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <a
            href={`mailto:${vendor.email}`}
            className="text-primary hover:underline"
          >
            {vendor.email}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <a href={`tel:${vendor.phone}`} className="hover:underline">
            {vendor.phone}
          </a>
        </div>
      </CardContent>

      {hasActions && (
        <CardFooter className="flex gap-2">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(vendor.id)}
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
              onClick={() => onEdit(vendor.id)}
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
              onClick={() => onDelete(vendor.id)}
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
 * VendorCardSkeleton displays a loading skeleton for the vendor card
 */
function VendorCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-6 w-16" />
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
