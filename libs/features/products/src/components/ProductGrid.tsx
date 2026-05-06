/**
 * ProductGrid Component
 *
 * Displays products in a responsive grid layout with loading and empty states.
 */

import { useProducts } from '@org/data-access';
import { EmptyState } from '@org/ui';
import { Package } from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { QueryParams } from '@org/types';

interface ProductGridProps {
  params?: QueryParams;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onFavorite?: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  showFavorite?: boolean;
  getFavorited?: (id: string) => boolean;
  className?: string;
}

/**
 * ProductGrid displays products in a responsive grid layout
 */
export function ProductGrid({
  params,
  onView,
  onEdit,
  onDelete,
  onFavorite,
  canEdit = false,
  canDelete = false,
  showFavorite = false,
  getFavorited,
  className,
}: ProductGridProps) {
  const { data, isLoading, error } = useProducts(params);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCard key={index} isLoading />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={Package}
        title="Error Loading Products"
        description={
          error instanceof Error ? error.message : 'Failed to load products'
        }
      />
    );
  }

  const products = data?.data || [];

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No Products Found"
        description="There are no products available at the moment."
      />
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onFavorite={onFavorite}
            canEdit={canEdit}
            canDelete={canDelete}
            showFavorite={showFavorite}
            isFavorited={getFavorited ? getFavorited(product.id) : false}
          />
        ))}
      </div>

      {/* Pagination could be added here */}
      {data?.meta && (
        <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
          Showing {products.length} of {data.meta.total} products
        </div>
      )}
    </div>
  );
}
