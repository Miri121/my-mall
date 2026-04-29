import * as React from 'react';
import { cn } from '../../lib/utils';
import { Header } from './header';
import { Footer } from './footer';
import { Sidebar, SidebarSection } from './sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  header?: React.ComponentProps<typeof Header>;
  footer?: React.ComponentProps<typeof Footer>;
  sidebar?: {
    sections: SidebarSection[];
  };
  className?: string;
}

export function MainLayout({
  children,
  header,
  footer,
  sidebar,
  className,
}: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <div className="relative flex min-h-screen flex-col">
      {header && (
        <Header
          {...header}
          onMenuClick={
            sidebar ? () => setMobileSidebarOpen(!mobileSidebarOpen) : undefined
          }
        />
      )}

      <div className="flex flex-1">
        {sidebar && (
          <>
            <div className="hidden md:block">
              <Sidebar
                sections={sidebar.sections}
                collapsed={sidebarCollapsed}
                onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
            </div>

            {mobileSidebarOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/50 md:hidden"
                  onClick={() => setMobileSidebarOpen(false)}
                />
                <div className="fixed inset-y-0 left-0 z-50 md:hidden">
                  <Sidebar sections={sidebar.sections} className="h-full" />
                </div>
              </>
            )}
          </>
        )}

        <main className={cn('flex-1 overflow-auto', className)}>
          {children}
        </main>
      </div>

      {footer && <Footer {...footer} />}
    </div>
  );
}
