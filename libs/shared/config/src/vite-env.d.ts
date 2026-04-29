/// <reference types="vite/client" />

/**
 * Vite Environment Variables Type Definitions
 *
 * Extends ImportMeta.env with custom environment variables.
 * All custom variables must be prefixed with VITE_ to be exposed to the client.
 */
interface ImportMetaEnv {
  /** Backend API base URL */
  readonly VITE_API_BASE_URL?: string;
  /** Application environment (development, staging, production) */
  readonly VITE_APP_ENV?: 'development' | 'staging' | 'production';
  /** Enable development tools flag */
  readonly VITE_ENABLE_DEVTOOLS?: string;
  /** Google OAuth 2.0 Client ID */
  readonly VITE_GOOGLE_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
