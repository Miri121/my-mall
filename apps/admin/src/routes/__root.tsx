import { createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { MyAuthProvider } from '@org/auth';
import { queryClient } from '@org/data-access';
import { i18n } from '@org/i18n';
import { Toaster } from '@org/ui';
import { AdminHeader } from '../components/AdminHeader';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminFooter } from '../components/AdminFooter';
import { useEffect } from 'react';

function RootComponent() {
  // Apply RTL direction for Hebrew
  useEffect(() => {
    const direction = i18n.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;
  }, []);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      const direction = lng === 'he' ? 'rtl' : 'ltr';
      document.documentElement.dir = direction;
      document.documentElement.lang = lng;
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <MyAuthProvider>
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
            <AdminHeader />
            <div className="flex flex-1">
              <AdminSidebar />
              <main className="flex-1 p-6">
                <Outlet />
              </main>
            </div>
            <AdminFooter />
          </div>
          <Toaster />
          <TanStackRouterDevtools />
        </MyAuthProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ({ error }) => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
        <a href="/" className="text-primary hover:underline">
          Go back home
        </a>
      </div>
    </div>
  ),
});
