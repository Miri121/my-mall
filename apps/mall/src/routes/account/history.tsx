import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth } from '@org/auth';
import { useBrowsingHistoryStore } from '@org/customer';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  EmptyState,
  Card,
  CardContent,
  Button,
} from '@org/ui';
import { History, Trash2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { formatDistanceToNow } from 'date-fns';

function HistoryPage() {
  const { t } = useTranslation('common');
  const { history, removeItem, clearHistory } = useBrowsingHistoryStore();

  if (history.length === 0) {
    return (
      <RequireAuth>
        <PageContainer>
          <PageHeader
            title={t('history.title', 'Browsing History')}
            description={t('history.description', 'Recently viewed items')}
          />
          <EmptyState
            icon={History}
            title={t('history.empty', 'No history yet')}
            description={t(
              'history.emptyDesc',
              'Items you view will appear here'
            )}
          />
        </PageContainer>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <PageContainer>
        <div className="flex items-center justify-between mb-6">
          <PageHeader
            title={t('history.title', 'Browsing History')}
            description={t('history.description', 'Recently viewed items')}
          />
          <Button variant="outline" onClick={clearHistory}>
            {t('history.clearAll', 'Clear All')}
          </Button>
        </div>

        <div className="space-y-4">
          {history.map((item) => (
            <Card key={`${item.id}-${item.timestamp}`}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 capitalize">
                      {item.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('history.viewed', 'Viewed')}{' '}
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        to={
                          item.type === 'product'
                            ? '/products/$productId'
                            : '/stores/$storeSlug'
                        }
                        params={
                          item.type === 'product'
                            ? { productId: item.id }
                            : { storeSlug: item.slug || item.id }
                        }
                      >
                        {t('history.view', 'View')}
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContainer>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/account/history')({
  component: HistoryPage,
});
