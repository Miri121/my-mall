import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useAdminDashboard, useAdminAnalytics } from '@org/admin-domain';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  LoadingSpinner,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@org/ui';

function AnalyticsPage() {
  const { t } = useTranslation('common');
  const {
    totalVendors,
    totalUsers,
    totalStores,
    totalProducts,
    isLoading: loadingDashboard,
  } = useAdminDashboard();

  // Create statistics object for easier access in JSX
  const statistics = {
    totalVendors,
    totalUsers,
    totalStores,
    totalProducts,
  };

  const {
    vendorGrowth,
    userGrowth,
    storeGrowth,
    productGrowth,
    topStores,
    isLoading: loadingAnalytics,
    error,
  } = useAdminAnalytics();

  const isLoading = loadingDashboard || loadingAnalytics;

  if (isLoading) {
    return (
      <RequireAuth>
        <RequireRole allowedRoles={['admin']}>
          <LoadingSpinner />
        </RequireRole>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['admin']}>
        <PageContainer>
          <PageHeader
            title={t('analytics.title', 'Analytics')}
            description={t(
              'analytics.description',
              'Platform performance metrics'
            )}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('analytics.growth', 'Growth Metrics')}</CardTitle>
              </CardHeader>
              <CardContent>
                {error ? (
                  <p className="text-destructive">
                    {t('analytics.error', 'Failed to load analytics data')}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {[
                      { type: 'vendors', metric: vendorGrowth },
                      { type: 'users', metric: userGrowth },
                      { type: 'stores', metric: storeGrowth },
                      { type: 'products', metric: productGrowth },
                    ].map(({ type, metric }) => (
                      <div
                        key={type}
                        className="flex items-center justify-between"
                      >
                        <span className="font-medium capitalize">{type}</span>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{metric.current}</p>
                          {metric.percentage !== undefined && (
                            <p
                              className={`text-sm ${
                                metric.percentage >= 0
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {metric.percentage >= 0 ? '+' : ''}
                              {metric.percentage}%
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('analytics.topStores', 'Top Stores')}</CardTitle>
              </CardHeader>
              <CardContent>
                {topStores && topStores.length > 0 ? (
                  <div className="space-y-3">
                    {topStores.map((store, index) => (
                      <div
                        key={store.storeId}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            #{index + 1} {store.storeName}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-primary">
                          {store.productCount} products
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {t('analytics.noStores', 'No store data available')}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {t('analytics.overview', 'Platform Overview')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-3xl font-bold text-primary">
                    {statistics?.totalVendors || 0}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('dashboard.vendors', 'Vendors')}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-3xl font-bold text-primary">
                    {statistics?.totalStores || 0}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('dashboard.stores', 'Stores')}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-3xl font-bold text-primary">
                    {statistics?.totalProducts || 0}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('dashboard.products', 'Products')}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-3xl font-bold text-primary">
                    {statistics?.totalUsers || 0}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('dashboard.users', 'Users')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/analytics')({
  component: AnalyticsPage,
});
