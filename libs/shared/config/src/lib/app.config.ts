/**
 * Application Configuration Module
 *
 * Application-wide settings and defaults used across all apps.
 * Includes pagination, caching, internationalization, and more.
 */

/**
 * Pagination Configuration
 *
 * Default settings for paginated lists and tables.
 */
export const PAGINATION_CONFIG = {
  /** Default number of items per page */
  defaultPageSize: 20,
  /** Available page size options for user selection */
  pageSizeOptions: [10, 20, 50, 100],
  /** Maximum number of pages to prevent excessive pagination */
  maxPages: 1000,
} as const;

/**
 * TanStack Query Cache Configuration
 *
 * Cache and stale time settings for React Query.
 * Different resources have different cache durations based on update frequency.
 */
export const QUERY_CONFIG = {
  /** Stale time settings per resource type (in milliseconds) */
  staleTime: {
    /** Default stale time for unspecified resources (5 minutes) */
    default: 5 * 60 * 1000,
    /** Vendor data stale time (30 minutes) */
    vendors: 30 * 60 * 1000,
    /** Store data stale time (30 minutes) */
    stores: 30 * 60 * 1000,
    /** Product data stale time (15 minutes) */
    products: 15 * 60 * 1000,
    /** User data stale time (30 minutes) */
    users: 30 * 60 * 1000,
    /** Category data stale time (1 hour) */
    categories: 60 * 60 * 1000,
    /** Search results stale time (5 minutes) */
    search: 5 * 60 * 1000,
  },
  /** Time to keep unused data in cache (10 minutes) */
  cacheTime: 10 * 60 * 1000,
  /** Refetch queries when window regains focus */
  refetchOnWindowFocus: false,
  /** Number of retry attempts for failed queries */
  retry: 1,
} as const;

/**
 * Internationalization Configuration
 *
 * Supported languages and locale settings.
 */
export const I18N_CONFIG = {
  /** Array of supported language codes */
  supportedLanguages: ['en', 'he'] as const,
  /** Default language for new users */
  defaultLanguage: 'en' as const,
  /** Fallback language when translation is missing */
  fallbackLanguage: 'en' as const,
} as const;

/**
 * Supported language type
 * Union type of all supported language codes
 */
export type SupportedLanguage = (typeof I18N_CONFIG.supportedLanguages)[number];

/**
 * Date and Time Format Strings
 *
 * Format strings compatible with date-fns library.
 * @see https://date-fns.org/docs/format
 */
export const DATE_FORMATS = {
  /** Short date format: Jan 1, 2024 */
  short: 'MMM d, yyyy',
  /** Long date format: January 1, 2024 */
  long: 'MMMM d, yyyy',
  /** Full date format: Monday, January 1, 2024 */
  full: 'EEEE, MMMM d, yyyy',
  /** Time format: 3:30 PM */
  time: 'h:mm a',
  /** Date and time format: Jan 1, 2024 3:30 PM */
  datetime: 'MMM d, yyyy h:mm a',
} as const;

/**
 * Currency Configuration
 *
 * Default currency settings and supported currencies.
 */
export const CURRENCY_CONFIG = {
  /** Default currency code (ISO 4217) */
  defaultCurrency: 'USD',
  /** List of supported currency codes */
  supportedCurrencies: ['USD', 'EUR', 'ILS'],
  /** Default locale for currency formatting */
  locale: 'en-US',
} as const;

/**
 * File Upload Configuration
 *
 * Constraints and allowed file types for uploads.
 */
export const UPLOAD_CONFIG = {
  /** Maximum file size in bytes (5MB) */
  maxFileSize: 5 * 1024 * 1024,
  /** Maximum number of files per upload */
  maxFiles: 10,
  /** Allowed MIME types for image uploads */
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  /** Allowed file extensions for image uploads */
  allowedImageExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
} as const;
