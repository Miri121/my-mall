/**
 * StoreDetail Component
 *
 * Displays complete store information with external website iframe and products.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  Edit,
  Trash2,
  Store as StoreIcon,
  Package,
} from 'lucide-react';
import {
  useStore,
  useStoreWithStats,
  useStoreProducts,
} from '@org/data-access';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  Separator,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@org/ui';
import { formatDate, formatNumber } from '@org/utils';

interface StoreDetailProps {
  storeId: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

/**
 * StoreDetail displays complete store information with iframe and related data
 */
export function StoreDetail({
  storeId,
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
}: StoreDetailProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const { data: storeData, isLoading, error } = useStore(storeId);
  const { data: statsData, isLoading: statsLoading } = useStoreWithStats(storeId);
  const { data: productsData, isLoading: productsLoading } = useStoreProducts(storeId);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(storeId);
    } else {
      navigate(`/stores/${storeId}/edit`);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(storeId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading store details..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load store"
        message={error instanceof Error ? error.message : 'An error occurred'}
      />
    );
  }

  const store = storeData;
  const stats = statsData;
  const products = productsData?.data || [];

  if (!store) {
    return (
      <ErrorMessage
        title="Store not found"
        message="This store does not exist"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card with Cover Image */}
      <Card className="overflow-hidden">
        {store.coverImage && (
          <div className="h-48 w-full overflow-hidden">
            <img
              src={store.coverImage}
              alt={`${store.name} cover`}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex items-start gap-4">
              {/* Store Logo */}
              <Avatar className="h-16 w-16">
                <AvatarImage src={store.logo || undefined} alt={store.name} />
                <AvatarFallback>
                  <StoreIcon className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl">{store.name}</CardTitle>
                  <Badge variant={store.isActive ? 'default' : 'secondary'}>
                    {store.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                {store.description && (
                  <p className="text-muted-foreground">{store.description}</p>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {store.url}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {canEdit && (
                <Button variant="outline" onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              )}
              {canDelete && (
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Store ID
              </p>
              <p className="font-mono text-sm mt-1">{store.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Slug
              </p>
              <p className="mt-1">{store.slug}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Created At
              </p>
              <p className="mt-1">{formatDate(store.createdAt, 'PPP')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Updated
              </p>
              <p className="mt-1">{formatDate(store.updatedAt, 'PPP')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Card */}
      {statsLoading ? (
        <Card>
          <CardContent className="py-8">
            <LoadingSpinner text="Loading statistics..." />
          </CardContent>
        </Card>
      ) : stats ? (
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-5 w-5" />
                  <p className="text-sm font-medium">Total Products</p>
                </div>
                <p className="text-3xl font-bold">
                  {formatNumber(stats.productCount)}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-5 w-5" />
                  <p className="text-sm font-medium">Active Products</p>
                </div>
                <p className="text-3xl font-bold">
                  {formatNumber(stats.activeProductCount)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="store">External Store</TabsTrigger>
          <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Details</h4>
                <Separator className="mb-4" />
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Store Name:</dt>
                    <dd className="font-medium">{store.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">URL Slug:</dt>
                    <dd className="font-mono text-sm">{store.slug}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Status:</dt>
                    <dd>
                      <Badge
                        variant={store.isActive ? 'default' : 'secondary'}
                      >
                        {store.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Created:</dt>
                    <dd>{formatDate(store.createdAt, 'MMMM dd, yyyy')}</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="store">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>External Store Website</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <a href={store.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open in New Tab
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative w-full" style={{ height: '600px' }}>
                <iframe
                  src={store.url}
                  className="w-full h-full rounded-lg border"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  title={`${store.name} website`}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Some websites may not allow embedding in iframes due to security policies.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Store Products</CardTitle>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <LoadingSpinner text="Loading products..." />
              ) : products.length === 0 ? (
                <EmptyState
                  icon={Package}
                  title="No products yet"
                  description="This store doesn't have any products listed yet."
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product: any) => (
                    <div
                      key={product.id}
                      className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="space-y-2">
                        <h4 className="font-medium line-clamp-2">{product.name}</h4>
                        {product.price && (
                          <p className="text-lg font-bold">
                            ${product.price.toFixed(2)}
                          </p>
                        )}
                        <Badge variant={product.isActive ? 'default' : 'secondary'}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
