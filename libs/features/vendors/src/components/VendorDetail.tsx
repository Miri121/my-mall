/**
 * VendorDetail Component
 *
 * Displays complete vendor information with stores and statistics.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Mail,
  Phone,
  Edit,
  Trash2,
  Store,
  Package,
} from 'lucide-react';
import {
  useVendor,
  useVendorStats,
  useVendorStores,
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
} from '@org/ui';
import { formatDate, formatNumber } from '@org/utils';

interface VendorDetailProps {
  vendorId: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

/**
 * VendorDetail displays complete vendor information with related data
 */
export function VendorDetail({
  vendorId,
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
}: VendorDetailProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const { data: vendorData, isLoading, error } = useVendor(vendorId);
  const { data: statsData, isLoading: statsLoading } = useVendorStats(vendorId);
  const { data: storesData, isLoading: storesLoading } =
    useVendorStores(vendorId);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(vendorId);
    } else {
      navigate(`/vendors/${vendorId}/edit`);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(vendorId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading vendor details..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load vendor"
        message={error instanceof Error ? error.message : 'An error occurred'}
      />
    );
  }

  const vendor = vendorData;
  const stats = statsData;
  const stores = storesData?.data || [];

  if (!vendor) {
    return (
      <ErrorMessage
        title="Vendor not found"
        message="This vendor does not exist"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl">{vendor.name}</CardTitle>
                <Badge variant={vendor.isActive ? 'default' : 'secondary'}>
                  {vendor.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>{vendor.company}</span>
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
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${vendor.email}`}
                    className="text-primary hover:underline"
                  >
                    {vendor.email}
                  </a>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Phone
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${vendor.phone}`} className="hover:underline">
                    {vendor.phone}
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Created At
                </p>
                <p className="mt-1">{formatDate(vendor.createdAt, 'PPP')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </p>
                <p className="mt-1">{formatDate(vendor.updatedAt, 'PPP')}</p>
              </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Store className="h-5 w-5" />
                  <p className="text-sm font-medium">Total Stores</p>
                </div>
                <p className="text-3xl font-bold">
                  {formatNumber(stats.storeCount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.activeStoreCount} active
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-5 w-5" />
                  <p className="text-sm font-medium">Total Products</p>
                </div>
                <p className="text-3xl font-bold">
                  {formatNumber(stats.productCount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Across all stores
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Store className="h-5 w-5" />
                  <p className="text-sm font-medium">Active Stores</p>
                </div>
                <p className="text-3xl font-bold">
                  {formatNumber(stats.activeStoreCount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Currently operating
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
          <TabsTrigger value="stores">Stores ({stores.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Account Details</h4>
                <Separator className="mb-4" />
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Vendor ID:</dt>
                    <dd className="font-mono text-sm">{vendor.id}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Status:</dt>
                    <dd>
                      <Badge
                        variant={vendor.isActive ? 'default' : 'secondary'}
                      >
                        {vendor.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Member Since:</dt>
                    <dd>{formatDate(vendor.createdAt, 'MMMM yyyy')}</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stores">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Stores</CardTitle>
            </CardHeader>
            <CardContent>
              {storesLoading ? (
                <LoadingSpinner text="Loading stores..." />
              ) : stores.length === 0 ? (
                <EmptyState
                  icon={Store}
                  title="No stores yet"
                  description="This vendor doesn't have any stores assigned yet."
                />
              ) : (
                <div className="space-y-3">
                  {stores.map((store: any) => (
                    <div
                      key={store.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{store.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {store.description}
                        </p>
                      </div>
                      <Badge variant={store.isActive ? 'default' : 'secondary'}>
                        {store.isActive ? 'Active' : 'Inactive'}
                      </Badge>
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
