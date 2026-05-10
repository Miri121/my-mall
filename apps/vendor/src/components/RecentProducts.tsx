import { Link } from '@tanstack/react-router';
import { useTranslation } from '@org/i18n';
import { Product } from '@org/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
  Button,
} from '@org/ui';
import { Package } from 'lucide-react';
import { formatCurrency } from '@org/utils';

interface RecentProductsProps {
  products: Product[];
}

export function RecentProducts({ products }: RecentProductsProps) {
  const { t } = useTranslation('common');

  if (!products || products.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {t('dashboard.recentProducts', 'Recent Products')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Package}
            title={t('products.empty', 'No products yet')}
            description={t(
              'products.emptyDesc',
              'Start adding products to see them here'
            )}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {t('dashboard.recentProducts', 'Recent Products')}
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/products">{t('viewAll', 'View All')}</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.slice(0, 5).map((product) => (
            <Link
              key={product.id}
              to="/products/$productId"
              params={{ productId: product.id }}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              )}
              <div className="flex-1">
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
