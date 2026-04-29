import * as React from 'react';
import { cn } from '../../lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthLayout({
  children,
  title,
  description,
  logo,
  footer,
  className,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className={cn('w-full max-w-md space-y-6', className)}>
        {logo && <div className="flex justify-center">{logo}</div>}

        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>

        {footer && (
          <div className="text-center text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
