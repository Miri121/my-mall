/**
 * SearchFilters Component
 *
 * Filter panel specific to search results with category, price range, store, and sort options.
 */

import { useState, useEffect } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import {
  Button,
  Label,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from '@org/ui';
import { useCategories, useStores } from '@org/data-access';
import { cn } from '@org/utils';
import type { ProductFilters } from '@org/types';

interface SearchFiltersProps {
  filters?: ProductFilters;
  onFiltersChange?: (filters: ProductFilters) => void;
  onSortChange?: (sort: string) => void;
  currentSort?: string;
  className?: string;
  collapsible?: boolean;
}

/**
 * SearchFilters provides filtering and sorting options for search results
 */
export function SearchFilters({
  filters = {},
  onFiltersChange,
  onSortChange,
  currentSort = 'relevance',
  className,
  collapsible = false,
}: SearchFiltersProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsible);
  const [localFilters, setLocalFilters] = useState<ProductFilters>(filters);

  const { data: categoriesData } = useCategories();
  const { data: storesData } = useStores();

  const categories = categoriesData || [];
  const stores = storesData?.data || [];

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value || undefined };
    setLocalFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const handleClearFilters = () => {
    const emptyFilters: ProductFilters = {};
    setLocalFilters(emptyFilters);
    if (onFiltersChange) {
      onFiltersChange(emptyFilters);
    }
  };

  const activeFilterCount = Object.values(localFilters).filter(
    (v) => v !== undefined && v !== null
  ).length;

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </CardTitle>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="h-8"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
          {collapsible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8"
            >
              {isCollapsed ? 'Show' : 'Hide'}
            </Button>
          )}
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="space-y-6">
          {/* Category Filter */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={localFilters.categoryId || 'all'}
              onValueChange={(value) =>
                handleFilterChange('categoryId', value === 'all' ? null : value)
              }
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category: any) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Store Filter */}
          <div className="space-y-2">
            <Label htmlFor="store">Store</Label>
            <Select
              value={localFilters.storeId || 'all'}
              onValueChange={(value) =>
                handleFilterChange('storeId', value === 'all' ? null : value)
              }
            >
              <SelectTrigger id="store">
                <SelectValue placeholder="All Stores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                {stores.map((store: any) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label
                  htmlFor="minPrice"
                  className="text-xs text-muted-foreground"
                >
                  Min Price
                </Label>
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="Min"
                  min={0}
                  step={0.01}
                  value={localFilters.minPrice || ''}
                  onChange={(e) =>
                    handleFilterChange(
                      'minPrice',
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="maxPrice"
                  className="text-xs text-muted-foreground"
                >
                  Max Price
                </Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="Max"
                  min={0}
                  step={0.01}
                  value={localFilters.maxPrice || ''}
                  onChange={(e) =>
                    handleFilterChange(
                      'maxPrice',
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Sort Options */}
          {onSortChange && (
            <div className="space-y-2">
              <Label htmlFor="sort">Sort By</Label>
              <Select value={currentSort} onValueChange={onSortChange}>
                <SelectTrigger id="sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="priceLowHigh">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="priceHighLow">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="nameAZ">Name: A-Z</SelectItem>
                  <SelectItem value="nameZA">Name: Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
