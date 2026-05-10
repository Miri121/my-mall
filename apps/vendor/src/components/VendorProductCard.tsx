import { Link } from '@tanstack/react-router';
import { Product } from '@org/types';
import { Card, CardContent, Button } from '@org/ui';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@org/utils';
import { useTranslation } from '@org/i18n';

interface VendorProductCardProps {
  product: Product;
  onDelete?: (id: string) => void;
}

export function VendorProductCard({
  product,
  onDelete,
}: VendorProductCardProps) {
  const { t } = useTranslation('products');

  return (
    <Card>
      <CardContent className="p-4">
        {product.images && product.images.length > 0 && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-sm line-through text-muted-foreground">
                {formatCurrency(product.comparePrice)}
              </span>
            )}
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link
                to="/products/$productId/edit"
                params={{ productId: product.id }}
              >
                <Edit className="h-4 w-4 mr-1" />
                {t('edit', 'Edit')}
              </Link>
            </Button>
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
