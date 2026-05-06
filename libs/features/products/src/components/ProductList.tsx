/**
 * ProductList Component
 *
 * Displays products in a table layout with search, filters, and actions.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Package, Eye, Edit, Trash2 } from 'lucide-react';
import { useProducts, useCategories, useStores } from '@org/data-access';
import {
  Button,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@org/ui';
import { formatCurrency, formatDate } from '@org/utils';
import type { ProductWithDetails, Category } from '@org/types';

interface ProductListProps {
  onCreateClick?: () => void;
  onViewClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  vendorId?: string; // Filter by vendor (for vendor dashboard)
  storeId?: string; // Filter by store
}

/**
 * ProductList displays products in a table with search, filters, and actions
 */
export function ProductList({
  onCreateClick,
  onViewClick,
  onEditClick,
  onDeleteClick,
  canCreate = false,
  canEdit = false,
  canDelete = false,
  vendorId,
  storeId,
}: ProductListProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [storeFilter, setStoreFilter] = useState<string>(storeId || 'all');
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>('all');

  // Fetch products
  const { data: productsData, isLoading, error } = useProducts();

  // Fetch categories and stores for filters
  const { data: categoriesData } = useCategories();
  const { data: storesData } = useStores();

  const handleView = (id: string) => {
    if (onViewClick) {
      onViewClick(id);
    } else {
      navigate(`/products/${id}`);
    }
  };

  const handleEdit = (id: string) => {
    if (onEditClick) {
      onEditClick(id);
    } else {
      navigate(`/products/${id}/edit`);
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
      navigate('/products/new');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load products"
        message={error instanceof Error ? error.message : 'An error occurred'}
      />
    );
  }

  // Filter products client-side
  const allProducts = (productsData?.data || []) as ProductWithDetails[];
  const products = allProducts.filter((product) => {
    // Vendor filter
    if (vendorId && product.vendorId !== vendorId) return false;

    // Store filter (from prop)
    if (storeId && product.storeId !== storeId) return false;

    // Search filter
    if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    // Category filter
    if (categoryFilter !== 'all' && product.categoryId !== categoryFilter) {
      return false;
    }

    // Store filter
    if (storeFilter !== 'all' && product.storeId !== storeFilter) {
      return false;
    }

    // Price range filter
    if (priceRangeFilter === 'under25' && product.price >= 25) return false;
    if (
      priceRangeFilter === '25-50' &&
      (product.price < 25 || product.price > 50)
    )
      return false;
    if (
      priceRangeFilter === '50-100' &&
      (product.price < 50 || product.price > 100)
    )
      return false;
    if (priceRangeFilter === 'over100' && product.price <= 100) return false;

    return true;
  });

  const categories = (categoriesData || []) as Category[];
  const stores = storesData?.data || [];

  return (
    <div className="space-y-6">
      {/* Header with filters and actions */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full sm:w-auto">
            <Input
              placeholder="Search products by name..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              className="w-full sm:w-[300px]"
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!storeId && stores.length > 0 && (
              <Select value={storeFilter} onValueChange={setStoreFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by store" />
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
            )}
            <Select
              value={priceRangeFilter}
              onValueChange={setPriceRangeFilter}
            >
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under25">Under $25</SelectItem>
                <SelectItem value="25-50">$25 - $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="over100">Over $100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {canCreate && (
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Create Product
            </Button>
          )}
        </div>
      </div>

      {/* Table or Empty State */}
      {products.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No products found"
          description={
            search ||
            categoryFilter !== 'all' ||
            storeFilter !== 'all' ||
            priceRangeFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first product'
          }
          action={
            canCreate &&
            !search &&
            categoryFilter === 'all' &&
            storeFilter === 'all' &&
            priceRangeFilter === 'all'
              ? {
                  label: 'Create Product',
                  onClick: handleCreate,
                }
              : undefined
          }
        />
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={product.images?.[0]}
                        alt={product.name}
                      />
                      <AvatarFallback>
                        <Package className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {formatCurrency(product.price)}
                      </span>
                      {product.comparePrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatCurrency(product.comparePrice)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {product.category ? (
                      <Badge variant="secondary">{product.category.name}</Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {product.store ? (
                      <span className="text-sm">{product.store.name}</span>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(product.createdAt, 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(product.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(product.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Results count */}
      {products.length > 0 && (
        <div className="text-sm text-muted-foreground text-center">
          Showing {products.length} of {allProducts.length} products
        </div>
      )}
    </div>
  );
}
