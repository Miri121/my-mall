/**
 * SearchResults Component
 *
 * Display search results for both products and stores with tabs and pagination.
 */

import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  EmptyState,
  LoadingSpinner,
  ErrorMessage,
  Button,
} from '@org/ui';
import { useSearchProducts, useSearchStores } from '@org/data-access';
import { ProductCard } from '@org/products';
import { StoreCard } from '@org/stores';
import { cn, pluralize } from '@org/utils';
import type { ProductFilters } from '@org/types';

interface SearchResultsProps {
  query?: string;
  filters?: ProductFilters;
  sort?: string;
  onProductView?: (id: string) => void;
  onStoreView?: (slug: string) => void;
  className?: string;
}

type TabValue = 'all' | 'products' | 'stores';

/**
 * SearchResults displays search results with tabs for products and stores
 */
export function SearchResults({
  query = '',
  filters = {},
  sort = 'relevance',
  onProductView,
  onStoreView,
  className,
}: SearchResultsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabValue>(
    (searchParams.get('tab') as TabValue) || 'all'
  );
  const [productPage, setProductPage] = useState(1);
  const [storePage, setStorePage] = useState(1);

  // Fetch products
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useSearchProducts(
    query,
    {
      ...filters,
      page: productPage,
      limit: 12,
      sortOrder: 'desc',
      sortBy: sort,
    },
    Boolean(query.trim())
  );

  // Fetch stores
  const {
    data: storesData,
    isLoading: isLoadingStores,
    error: storesError,
  } = useSearchStores(
    query,
    {
      page: storePage,
      limit: 12,
      sortOrder: 'desc',
      sortBy: sort,
    },
    Boolean(query.trim())
  );

  const products = productsData?.data || [];
  const stores = storesData?.data || [];
  const productsTotal = productsData?.meta?.total || 0;
  const storesTotal = storesData?.meta?.total || 0;
  const totalResults = productsTotal + storesTotal;

  const isLoading = isLoadingProducts || isLoadingStores;
  const hasError = productsError || storesError;

  // Simple "Did you mean" suggestion (basic implementation)
  const didYouMean = useMemo(() => {
    if (query.length < 3 || totalResults > 0) return null;
    // Simple lowercase suggestion as placeholder
    return query.toLowerCase() !== query ? query.toLowerCase() : null;
  }, [query, totalResults]);

  const handleTabChange = (value: string) => {
    const tabValue = value as TabValue;
    setActiveTab(tabValue);
    setSearchParams({ q: query, tab: tabValue });
  };

  if (!query.trim()) {
    return (
      <EmptyState
        icon={Search}
        title="Enter a search query"
        description="Type something in the search bar to find products and stores"
      />
    );
  }

  if (hasError) {
    return (
      <ErrorMessage
        title="Search failed"
        message="We couldn't complete your search. Please try again."
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Results Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
        <p className="text-muted-foreground">
          Found {productsTotal}{' '}
          {pluralize(productsTotal, 'product', 'products')}
          {' and '}
          {storesTotal} {pluralize(storesTotal, 'store', 'stores')}
        </p>
        {didYouMean && (
          <p className="text-sm text-muted-foreground">
            Did you mean:{' '}
            <button
              onClick={() => setSearchParams({ q: didYouMean })}
              className="text-primary hover:underline"
            >
              {didYouMean}
            </button>
            ?
          </p>
        )}
      </div>

      {/* No Results */}
      {totalResults === 0 && (
        <EmptyState
          icon={Search}
          title="No results found"
          description={`We couldn't find anything matching "${query}". Try different keywords or check your spelling.`}
        />
      )}

      {/* Tabs */}
      {totalResults > 0 && (
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
            <TabsTrigger value="products">
              Products ({productsTotal})
            </TabsTrigger>
            <TabsTrigger value="stores">Stores ({storesTotal})</TabsTrigger>
          </TabsList>

          {/* All Tab */}
          <TabsContent value="all" className="space-y-8 mt-6">
            {/* Products Section */}
            {products.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.slice(0, 8).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onView={onProductView}
                    />
                  ))}
                </div>
                {productsTotal > 8 && (
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('products')}
                  >
                    View all {productsTotal} products
                  </Button>
                )}
              </div>
            )}

            {/* Stores Section */}
            {stores.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Stores</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stores.slice(0, 6).map((store) => (
                    <StoreCard
                      key={store.id}
                      store={store}
                      onView={onStoreView}
                    />
                  ))}
                </div>
                {storesTotal > 6 && (
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('stores')}
                  >
                    View all {storesTotal} stores
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-6">
            {products.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onView={onProductView}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {productsData?.meta && productsData.meta.totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                      disabled={productPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="flex items-center px-4">
                      Page {productPage} of {productsData.meta.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setProductPage((p) => p + 1)}
                      disabled={productPage === productsData.meta.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <EmptyState
                icon={Search}
                title="No products found"
                description={`No products match "${query}"`}
              />
            )}
          </TabsContent>

          {/* Stores Tab */}
          <TabsContent value="stores" className="mt-6">
            {stores.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stores.map((store) => (
                    <StoreCard
                      key={store.id}
                      store={store}
                      onView={onStoreView}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {storesData?.meta && storesData.meta.totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setStorePage((p) => Math.max(1, p - 1))}
                      disabled={storePage === 1}
                    >
                      Previous
                    </Button>
                    <span className="flex items-center px-4">
                      Page {storePage} of {storesData.meta.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setStorePage((p) => p + 1)}
                      disabled={storePage === storesData.meta.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <EmptyState
                icon={Search}
                title="No stores found"
                description={`No stores match "${query}"`}
              />
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
