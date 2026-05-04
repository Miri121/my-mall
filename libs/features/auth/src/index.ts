/**
 * Features Auth Library
 *
 * Provides authentication and authorization functionality for the e-commerce platform.
 * Includes auth context, hooks, components, guards, and permission utilities.
 */

// ============================================================================
// Auth Context & Provider
// ============================================================================
export { MyAuthProvider } from './lib/context/AuthContext';

// ============================================================================
// Auth Hooks
// ============================================================================
export { useAuth } from './lib/hooks/useAuth';

// ============================================================================
// Auth Components
// ============================================================================
export { LoginForm } from './lib/components/LoginForm';
export { RegisterForm } from './lib/components/RegisterForm';
export { ForgotPasswordForm } from './lib/components/ForgotPasswordForm';
export { ResetPasswordForm } from './lib/components/ResetPasswordForm';
export { ProfileForm } from './lib/components/ProfileForm';
export { ChangePasswordForm } from './lib/components/ChangePasswordForm';
export { GoogleOAuthButton } from './lib/components/GoogleOAuthButton';

// ============================================================================
// Auth Guards
// ============================================================================
export { RequireAuth } from './lib/guards/RequireAuth';
export { RequireRole } from './lib/guards/RequireRole';
export { GuestOnly } from './lib/guards/GuestOnly';

// ============================================================================
// Permission Utilities
// ============================================================================
export {
  hasPermission,
  hasRole,
  hasAnyRole,
  canAccess,
  canModify,
  canDelete,
  isAdmin,
  getResourcePermissions,
  getAccessibleResources,
} from './lib/utils/permissions';

export type { Permission, Resource } from './lib/utils/permissions';
