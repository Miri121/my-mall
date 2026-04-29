/**
 * API Configuration Module
 *
 * Centralized API endpoint constants and request configuration.
 * Provides type-safe endpoint definitions and helper functions.
 */

/**
 * API Endpoint Constants
 *
 * Organized by domain with parameterized routes using :param syntax.
 * Use buildEndpoint() to replace parameters with actual values.
 */
export const API_ENDPOINTS = {
  /** Authentication endpoints */
  auth: {
    /** Login with email/password */
    login: '/auth/login',
    /** Login with Google OAuth */
    loginWithGoogle: '/auth/google',
    /** Register new user account */
    register: '/auth/register',
    /** Logout current user */
    logout: '/auth/logout',
    /** Refresh authentication token */
    refreshToken: '/auth/refresh',
    /** Request password reset email */
    resetPassword: '/auth/reset-password',
    /** Verify password reset token */
    verifyResetToken: '/auth/verify-reset/:token',
    /** Update password with reset token */
    updatePassword: '/auth/update-password',
    /** Get current authenticated user */
    me: '/auth/me',
  },

  /** Vendor management endpoints */
  vendors: {
    /** List all vendors with pagination */
    list: '/vendors',
    /** Get vendor details by ID */
    detail: '/vendors/:id',
    /** Create new vendor */
    create: '/vendors',
    /** Update vendor by ID */
    update: '/vendors/:id',
    /** Delete vendor by ID */
    delete: '/vendors/:id',
    /** Get vendor's stores */
    stores: '/vendors/:id/stores',
    /** Get vendor statistics */
    stats: '/vendors/:id/stats',
  },

  /** Store management endpoints */
  stores: {
    /** List all stores with pagination */
    list: '/stores',
    /** Get store details by ID */
    detail: '/stores/:id',
    /** Get store by URL slug */
    bySlug: '/stores/slug/:slug',
    /** Create new store */
    create: '/stores',
    /** Update store by ID */
    update: '/stores/:id',
    /** Delete store by ID */
    delete: '/stores/:id',
    /** Get store's products */
    products: '/stores/:id/products',
    /** Upload store logo image */
    uploadLogo: '/stores/:id/logo',
    /** Upload store cover image */
    uploadCover: '/stores/:id/cover',
  },

  /** Product management endpoints */
  products: {
    /** List all products with pagination */
    list: '/products',
    /** Get product details by ID */
    detail: '/products/:id',
    /** Create new product */
    create: '/products',
    /** Update product by ID */
    update: '/products/:id',
    /** Delete product by ID */
    delete: '/products/:id',
    /** Upload product images */
    uploadImages: '/products/:id/images',
    /** Delete product image */
    deleteImage: '/products/:id/images/:imageId',
  },

  /** User management endpoints */
  users: {
    /** List all users with pagination */
    list: '/users',
    /** Get user details by ID */
    detail: '/users/:id',
    /** Get current user profile */
    me: '/users/me',
    /** Update user by ID */
    update: '/users/:id',
    /** Update current user profile */
    updateMe: '/users/me',
    /** Delete user by ID */
    delete: '/users/:id',
    /** Delete current user account */
    deleteMe: '/users/me',
    /** Upload user avatar */
    uploadAvatar: '/users/me/avatar',
  },

  /** Category management endpoints */
  categories: {
    /** List all categories */
    list: '/categories',
    /** Get category details by ID */
    detail: '/categories/:id',
    /** Create new category */
    create: '/categories',
    /** Update category by ID */
    update: '/categories/:id',
    /** Delete category by ID */
    delete: '/categories/:id',
  },

  /** Search endpoints */
  search: {
    /** Search products */
    products: '/search/products',
    /** Search stores */
    stores: '/search/stores',
    /** Get search suggestions */
    suggestions: '/search/suggestions',
  },
} as const;

/**
 * HTTP Request Configuration
 *
 * Default settings for API requests including timeouts and retry logic.
 */
export const REQUEST_CONFIG = {
  /** Request timeout in milliseconds (30 seconds) */
  timeout: 30000,
  /** Number of retry attempts for failed requests */
  retryAttempts: 3,
  /** Delay between retry attempts in milliseconds (1 second) */
  retryDelay: 1000,
} as const;

/**
 * Rate Limiting Configuration
 *
 * Client-side rate limiting to prevent excessive API calls.
 */
export const RATE_LIMIT_CONFIG = {
  /** Maximum requests allowed per minute */
  maxRequestsPerMinute: 60,
  /** Maximum requests allowed per hour */
  maxRequestsPerHour: 1000,
} as const;

/**
 * Build API endpoint with parameters
 *
 * Replaces :param placeholders in endpoint templates with actual values.
 *
 * @param template - Endpoint template with :param placeholders
 * @param params - Object mapping parameter names to values
 * @returns Endpoint string with parameters replaced
 *
 * @example
 * ```typescript
 * buildEndpoint('/vendors/:id', { id: '123' })
 * // => '/vendors/123'
 *
 * buildEndpoint('/products/:id/images/:imageId', { id: '456', imageId: '789' })
 * // => '/products/456/images/789'
 * ```
 */
export function buildEndpoint(
  template: string,
  params?: Record<string, string>
): string {
  if (!params) {
    return template;
  }

  let endpoint = template;

  for (const [key, value] of Object.entries(params)) {
    endpoint = endpoint.replace(`:${key}`, encodeURIComponent(value));
  }

  return endpoint;
}
