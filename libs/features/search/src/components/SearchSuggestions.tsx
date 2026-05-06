/**
 * SearchSuggestions Component
 *
 * Dropdown showing search suggestions with separate sections for products and stores.
 */

import { Link } from 'react-router-dom';
import { Store as StoreIcon, Package } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback, Skeleton } from '@org/ui';
import { cn, formatCurrency } from '@org/utils';
import type { Product, Store } from '@org/types';

interface SearchSuggestionsProps {
  products?: Product[];
  stores?: Store[];
  isLoading?: boolean;
  query?: string;
  onProductClick?: (productId: string) => void;
  onStoreClick?: (storeSlug: string) => void;
  onViewAll?: () => void;
  className?: string;
}

/**
 * SearchSuggestions displays search suggestions with products and stores
 */
export function SearchSuggestions({
  products = [],
  stores = [],
  isLoading = false,
  query = '',
  onProductClick,
  onStoreClick,
  onViewAll,
  className,
}: SearchSuggestionsProps) {
  const hasProducts = products.length > 0;
  const hasStores = stores.length > 0;
  const hasResults = hasProducts || hasStores;

  if (isLoading) {
    return (
      <div className={cn('py-2', className)}>
        <SearchSuggestionsSkeleton />
      </div>
    );
  }

  if (!hasResults && query) {
    return (
      <div
        className={cn(
          'py-6 text-center text-sm text-muted-foreground',
          className
        )}
      >
        No suggestions found
      </div>
    );
  }

  if (!hasResults) {
    return null;
  }

  const highlightMatch = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className={cn('py-2', className)}>
      {/* Products Section */}
      {hasProducts && (
        <div className="mb-2">
          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
            Products
          </div>
          <div>
            {products.slice(0, 5).map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="flex items-center gap-3 px-3 py-2 hover:bg-accent cursor-pointer transition-colors"
                onClick={() => onProductClick?.(product.id)}
              >
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-10 w-10 rounded object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm line-clamp-1">
                    {highlightMatch(product.name)}
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    {formatCurrency(product.price)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Stores Section */}
      {hasStores && (
        <div className="mb-2">
          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
            Stores
          </div>
          <div>
            {stores.slice(0, 5).map((store) => (
              <Link
                key={store.id}
                to={`/stores/${store.slug}`}
                className="flex items-center gap-3 px-3 py-2 hover:bg-accent cursor-pointer transition-colors"
                onClick={() => onStoreClick?.(store.slug)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={store.logo || undefined} alt={store.name} />
                  <AvatarFallback>
                    <StoreIcon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm line-clamp-1">
                    {highlightMatch(store.name)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* View All Results */}
      {onViewAll && (
        <div className="border-t pt-2 mt-2">
          <button
            onClick={onViewAll}
            className="w-full px-3 py-2 text-sm text-center text-primary hover:bg-accent transition-colors"
          >
            View all results for "{query}"
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * SearchSuggestionsSkeleton displays loading skeleton
 */
function SearchSuggestionsSkeleton() {
  return (
    <div className="space-y-4">
      <div>
        <div className="px-3 py-2">
          <Skeleton className="h-3 w-16" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2">
            <Skeleton className="h-10 w-10 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
