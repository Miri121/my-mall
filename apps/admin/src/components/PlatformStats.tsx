import { Card, CardContent, CardHeader, CardTitle } from '@org/ui';
import { PlatformStatistics } from '@org/admin-domain';

interface PlatformStatsProps {
  statistics?: PlatformStatistics;
}

export function PlatformStats({ statistics }: PlatformStatsProps) {
  if (!statistics) return null;

  const stats = [
    { label: 'Total Vendors', value: statistics.totalVendors },
    { label: 'Total Stores', value: statistics.totalStores },
    { label: 'Total Products', value: statistics.totalProducts },
    { label: 'Total Users', value: statistics.totalUsers },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <span className="text-sm font-medium">{stat.label}</span>
              <span className="text-2xl font-bold text-primary">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
