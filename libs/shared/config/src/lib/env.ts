/**
 * Environment Configuration Module
 *
 * Centralized environment variable management with validation.
 * Uses Vite's import.meta.env for environment variable access.
 */

/**
 * Backend API base URL
 * @default 'http://localhost:3000/api'
 */
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Current application environment
 * @default 'development'
 */
export const APP_ENV: 'development' | 'staging' | 'production' =
  (import.meta.env.VITE_APP_ENV as 'development' | 'staging' | 'production') ||
  'development';

/**
 * Development mode flag
 * True when running in development environment
 */
export const IS_DEV: boolean = APP_ENV === 'development';

/**
 * Production mode flag
 * True when running in production environment
 */
export const IS_PROD: boolean = APP_ENV === 'production';

/**
 * Enable React Query and Router devtools
 * Automatically disabled in production
 * @default true in development, false in production
 */
export const ENABLE_DEVTOOLS: boolean =
  import.meta.env.VITE_ENABLE_DEVTOOLS === 'true' || IS_DEV;

/**
 * Google OAuth 2.0 Client ID
 * Required in production, optional in development
 * @default '' in development
 */
export const GOOGLE_CLIENT_ID: string =
  import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

/**
 * Validate required environment variables
 *
 * Throws an error if required variables are missing in production.
 * Logs warnings in development mode.
 *
 * @throws {Error} If required environment variables are missing in production
 */
export function validateEnv(): void {
  const errors: string[] = [];

  // Validate Google Client ID in production
  if (IS_PROD && !GOOGLE_CLIENT_ID) {
    errors.push('VITE_GOOGLE_CLIENT_ID is required in production');
  }

  // Validate API Base URL format
  if (API_BASE_URL && !API_BASE_URL.startsWith('http')) {
    errors.push('VITE_API_BASE_URL must start with http:// or https://');
  }

  // Handle validation errors
  if (errors.length > 0) {
    const errorMessage = `Environment validation failed:\n${errors.join('\n')}`;

    if (IS_PROD) {
      throw new Error(errorMessage);
    } else {
      console.warn('⚠️ Environment validation warnings:');
      errors.forEach((error) => console.warn(`  - ${error}`));
    }
  }

  // Log environment info in development
  if (IS_DEV) {
    console.log('🔧 Environment Configuration:', {
      APP_ENV,
      API_BASE_URL,
      ENABLE_DEVTOOLS,
      GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID ? '✓ Set' : '✗ Not Set',
    });
  }
}

// Auto-validate on module import
validateEnv();
