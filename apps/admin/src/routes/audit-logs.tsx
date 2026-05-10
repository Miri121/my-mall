import { createFileRoute } from '@tanstack/react-router';
import { RequireAuth, RequireRole } from '@org/auth';
import { useTranslation } from '@org/i18n';
import {
  PageHeader,
  PageContainer,
  Card,
  CardContent,
  Badge,
  EmptyState,
} from '@org/ui';
import { FileText } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  type: string;
  description: string;
  timestamp: string;
}

function AuditLogsPage() {
  const { t } = useTranslation('common');

  // Placeholder: In a real app, this would fetch from an audit log API
  const auditLogs: AuditLog[] = [];

  return (
    <RequireAuth>
      <RequireRole allowedRoles={['admin']}>
        <PageContainer>
          <PageHeader
            title={t('auditLogs.title', 'Audit Logs')}
            description={t(
              'auditLogs.description',
              'System activity and change history'
            )}
          />

          {auditLogs.length === 0 ? (
            <EmptyState
              icon={FileText}
              title={t('auditLogs.empty', 'No audit logs')}
              description={t(
                'auditLogs.emptyDesc',
                'Audit logs will appear here when system activities are recorded'
              )}
            />
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{log.action}</span>
                        <Badge variant="outline">{log.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {log.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {log.timestamp}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </PageContainer>
      </RequireRole>
    </RequireAuth>
  );
}

export const Route = createFileRoute('/audit-logs')({
  component: AuditLogsPage,
});
