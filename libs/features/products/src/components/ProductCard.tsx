/**
 * ProductCard Component
 *
 * Displays product information in a card layout with image, pricing, and actions.
 */

import { Edit, Eye, Trash2, Heart, Store as StoreIcon } from 'lucide-react';
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
import { cn, formatCurrency } from '@org/utils';
import type { Product, ProductWithDetails } from '@org/types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product?: Product | ProductWithDetails;
  isLoading?: boolean;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onFavorite?: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  showFavorite?: boolean;
  isFavorited?: boolean;
  className?: string;
}

/**
 * ProductCard displays product information in a card layout
 */
export function ProductCard({
  product,
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  onFavorite,
  canEdit = false,
  canDelete = false,
  showFavorite = false,
  isFavorited = false,
  className,
}: ProductCardProps) {
  if (isLoading || !product) {
    return <ProductCardSkeleton className={className} />;
  }

  const hasActions = onView || (canEdit && onEdit) || (canDelete && onDelete);
  const productWithDetails = product as ProductWithDetails;
  const storeName = productWithDetails.store?.name;
  const categoryName = productWithDetails.category?.name;
  const firstImage = product.images?.[0];

  // Calculate discount percentage
  const discountPercentage =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(
          ((product.comparePrice - product.price) / product.comparePrice) * 100
        )
      : 0;
  const hasDiscount = discountPercentage > 0;

  return (
    <Card
      className={cn(
        'hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full',
        className
      )}
    >
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {firstImage ? (
          <img
            src={firstImage}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground">
            <StoreIcon className="h-16 w-16" />
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            -{discountPercentage}%
          </Badge>
        )}

        {/* Favorite Button */}
        {showFavorite && onFavorite && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(product.id);
            }}
          >
            <Heart
              className={cn(
                'h-4 w-4',
                isFavorited && 'fill-red-500 text-red-500'
              )}
            />
          </Button>
        )}
      </div>

      <CardHeader className="pb-3 flex-1">
        <div className="space-y-2">
          <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>

          {/* Store Name Link */}
          {storeName && (
            <Link
              to={`/stores/${productWithDetails.store.slug}`}
              className="text-sm text-muted-foreground hover:text-primary hover:underline inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              {storeName}
            </Link>
          )}

          {/* Category Badge */}
          {categoryName && (
            <Badge variant="secondary" className="text-xs">
              {categoryName}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            {formatCurrency(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.comparePrice)}
            </span>
          )}
        </div>
      </CardContent>

      {hasActions && (
        <CardFooter className="flex gap-2 pt-2">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(product.id)}
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
              onClick={() => onEdit(product.id)}
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
              onClick={() => onDelete(product.id)}
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
 * ProductCardSkeleton displays a loading skeleton for the product card
 */
function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn('overflow-hidden flex flex-col h-full', className)}>
      <Skeleton className="h-48 w-full rounded-t-lg rounded-b-none" />
      <CardHeader className="flex-1">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-5 w-20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-8 w-24" />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </CardFooter>
    </Card>
  );
}
