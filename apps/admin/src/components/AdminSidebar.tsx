import { Link, useRouterState } from '@tanstack/react-router';
import { useTranslation } from '@org/i18n';
import { cn } from '@org/utils';
import {
  LayoutDashboard,
  UserCog,
  Store,
  Users,
  Package,
  BarChart3,
  FileText,
} from 'lucide-react';

export function AdminSidebar() {
  const { t } = useTranslation('common');
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const menuItems = [
    {
      to: '/dashboard',
      icon: LayoutDashboard,
      label: t('navigation.dashboard', 'Dashboard'),
    },
    {
      to: '/vendors',
      icon: UserCog,
      label: t('navigation.vendors', 'Vendors'),
    },
    {
      to: '/stores',
      icon: Store,
      label: t('navigation.stores', 'Stores'),
    },
    {
      to: '/users',
      icon: Users,
      label: t('navigation.users', 'Users'),
    },
    {
      to: '/products',
      icon: Package,
      label: t('navigation.products', 'Products'),
    },
    {
      to: '/analytics',
      icon: BarChart3,
      label: t('navigation.analytics', 'Analytics'),
    },
    {
      to: '/audit-logs',
      icon: FileText,
      label: t('navigation.auditLogs', 'Audit Logs'),
    },
  ];

  return (
    <aside className="hidden md:flex w-64 border-r bg-background">
      <nav className="flex flex-col gap-2 p-4 w-full">
        {menuItems.map((item) => {
          const isActive = currentPath.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
