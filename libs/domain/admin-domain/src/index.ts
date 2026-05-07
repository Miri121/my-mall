/**
 * Admin Domain Library
 *
 * Custom React hooks for admin-specific business logic.
 * Provides aggregated dashboard statistics and analytics for platform admins.
 */

// Hooks
export { useAdminDashboard } from './lib/hooks/useAdminDashboard.js';
export { useAdminAnalytics } from './lib/hooks/useAdminAnalytics.js';

// Types
export type {
  GrowthMetric,
  TopStore,
  PlatformStatistics,
} from './lib/types/analytics.types.js';
export type { UseAdminDashboardReturn } from './lib/hooks/useAdminDashboard.js';
export type { UseAdminAnalyticsReturn } from './lib/hooks/useAdminAnalytics.js';
