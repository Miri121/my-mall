import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth } from '@org/auth';
import { useFavoritesStore } from '@org/customer';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  EmptyState,
  Card,
  CardContent,
  Button,
} from '@org/ui';
import { Heart, Trash2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';

function FavoritesPage() {
  const { t } = useTranslation('common');
  const { favorites, removeItem } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <RequireAuth>
        <PageContainer>
          <PageHeader
            title={t('favorites.title', 'Favorites')}
            description={t(
              'favorites.description',
              'Your favorite stores and products'
            )}
          />
          <EmptyState
            icon={Heart}
            title={t('favorites.empty', 'No favorites yet')}
            description={t(
              'favorites.emptyDesc',
              'Start adding items to your favorites to see them here'
            )}
          />
        </PageContainer>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <PageContainer>
        <PageHeader
          title={t('favorites.title', 'Favorites')}
          description={t(
            'favorites.description',
            'Your favorite stores and products'
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 capitalize">
                  {item.type}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    {item.type === 'product' ? (
                      <Link
                        to="/products/$productId"
                        params={{ productId: item.id }}
                      >
                        {t('favorites.view', 'View')}
                      </Link>
                    ) : (
                      <Link
                        to="/stores/$storeSlug"
                        params={{ storeSlug: item.slug || '' }}
                      >
                        {t('favorites.view', 'View')}
                      </Link>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContainer>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/account/favorites')({
  component: FavoritesPage,
});
