import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@org/ui';
import { formatDistanceToNow } from 'date-fns';

interface RecentItem {
  id: string;
  name: string;
  type: 'vendor' | 'store' | 'product' | 'user';
  createdAt: Date;
}

interface RecentActivityProps {
  recentItems?: {
    vendors: RecentItem[];
    stores: RecentItem[];
    products: RecentItem[];
    users: RecentItem[];
  };
}

export function RecentActivity({ recentItems }: RecentActivityProps) {
  if (!recentItems) return null;

  const allItems = [
    ...recentItems.vendors.map((item) => ({
      ...item,
      type: 'vendor' as const,
    })),
    ...recentItems.stores.map((item) => ({ ...item, type: 'store' as const })),
    ...recentItems.products.map((item) => ({
      ...item,
      type: 'product' as const,
    })),
    ...recentItems.users.map((item) => ({ ...item, type: 'user' as const })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10);

  const getLink = (item: RecentItem) => {
    switch (item.type) {
      case 'vendor':
        return `/vendors/${item.id}`;
      case 'store':
        return `/stores/${item.id}`;
      case 'product':
        return `/products/${item.id}`;
      case 'user':
        return `/users/${item.id}`;
      default:
        return '/';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {allItems.map((item) => (
            <Link
              key={`${item.type}-${item.id}`}
              to={getLink(item)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(item.createdAt, { addSuffix: true })}
                </p>
              </div>
              <Badge variant="outline" className="capitalize">
                {item.type}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
