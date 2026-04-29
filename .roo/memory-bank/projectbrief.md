# E-Commerce Platform - Project Brief

## Project Overview

A multi-tenant e-commerce platform with three distinct applications:

- **Mall App**: Customer-facing storefront for browsing stores and products
- **Vendor App**: Dashboard for vendors to manage their products
- **Admin App**: Control panel for platform administrators

## Technology Stack

### Frontend

- **Framework**: React 19 + TypeScript 5.9
- **Build Tool**: Vite 7.x with Nx monorepo
- **Routing**: TanStack Router (type-safe)
- **State Management**: TanStack Query (server state) + Zustand (client state)
- **Forms**: React Hook Form + Zod validation
- **Authentication**: React Auth Kit
- **Styling**: Tailwind CSS with dark mode
- **UI Components**: shadcn/ui (planned)
- **i18n**: React-i18next (English/Hebrew with RTL support)
- **Testing**: Playwright MCP with test containers
- **Storybook**: v9.1.20 for component development

### Backend (Planned - Phase 7)

- **Architecture**: NestJS Microservices
- **Message Broker**: RabbitMQ
- **Cache**: Redis
- **Database**: PostgreSQL (6 databases, one per service)
- **Services**: API Gateway + 6 domain services

## Completed Work

### ✅ Phase 1: Foundation & Infrastructure Setup (100% Complete)

#### Task 1.1: Project Configuration & Dependencies ✅

- Installed all core dependencies (TanStack Query/Router, React Auth Kit, Axios, Zod, etc.)
- Configured Tailwind CSS with dark mode support
- Installed development tools (Storybook v9.1.20, Vitest, Playwright, React Testing Library)
- Set up i18n dependencies for English/Hebrew support
- Updated Nx configuration with caching and task pipelines
- Configured TypeScript strict mode with path mappings
- Created environment configuration files

#### Task 1.2: Workspace Structure Setup ✅

- Generated 3 applications:
  - `@org/mall` (Port 4200) - Customer storefront
  - `@org/vendor` (Port 4201) - Vendor dashboard
  - `@org/admin` (Port 4202) - Admin control panel
- Generated 6 shared libraries:
  - `@org/ui` - Shared UI components
  - `@org/data-access` - API clients & TanStack Query hooks
  - `@org/types` - TypeScript types & Zod schemas
  - `@org/utils` - Utility functions
  - `@org/config` - Configuration management
  - `@org/i18n` - Internationalization
- Generated 6 feature libraries:
  - `@org/auth` - Authentication components
  - `@org/vendors` - Vendor management UI
  - `@org/stores` - Store management UI
  - `@org/products` - Product catalog UI
  - `@org/users` - User management UI
  - `@org/search` - Search functionality
- Generated 3 domain libraries:
  - `@org/customer` - Customer business logic
  - `@org/vendor-domain` - Vendor business logic
  - `@org/admin-domain` - Admin business logic
- Deleted example/template code from initial workspace

**Total Projects**: 18 (3 apps + 15 libraries)

### ✅ Phase 2: Shared Infrastructure - Task 2.1 Complete

#### Task 2.1: Type System & Validation (libs/shared/types) ✅

**Completed Subtasks:**

##### Subtask 2.1.1: Define Core Entity Schemas with Zod ✅

Created comprehensive Zod schemas with runtime validation:

- **user.schema.ts** ✅

  - `UserRole` enum (customer, vendor, admin)
  - `UserSchema` - Base user with common fields
  - `CustomerSchema` - Customer-specific fields (preferredLanguage, phone)
  - `VendorUserSchema` - Vendor user fields (company, phone, vendorId link)
  - `AdminSchema` - Admin fields with permissions array
  - `UserCreateInputSchema` - User registration/creation
  - `UserUpdateInputSchema` - Profile updates

- **vendor.schema.ts** ✅

  - `VendorSchema` - Vendor entity (id, email, name, company, phone, timestamps)
  - `VendorCreateInputSchema` - Admin-only vendor creation with password
  - `VendorUpdateInputSchema` - Admin-only vendor updates
  - `VendorWithStatsSchema` - Vendor with statistics (storeCount, productCount)
  - Email and phone format validation

- **store.schema.ts** ✅

  - `StoreSchema` - Store entity with **REQUIRED url field** for external store links
  - `StoreCreateInputSchema` - Admin-only store creation (url is REQUIRED)
  - `StoreUpdateInputSchema` - Admin-only store updates
  - `StoreWithVendorSchema` - Store with vendor information
  - `StoreWithStatsSchema` - Store with product statistics
  - URL validation and slug format validation

- **product.schema.ts** ✅

  - `ProductSchema` - Product entity (name, description, price, comparePrice, images, category, store)
  - `ProductCreateInputSchema` - Vendor-only product creation
  - `ProductUpdateInputSchema` - Vendor-only product updates
  - `ProductWithDetailsSchema` - Product with category and store details
  - `ProductFiltersSchema` - Search/filter parameters
  - Price validation (price > 0, comparePrice > price)

- **category.schema.ts** ✅
  - `CategorySchema` - Category entity with parent-child hierarchy
  - `CategoryCreateInputSchema` - Admin-only category creation
  - `CategoryUpdateInputSchema` - Admin-only category updates
  - `CategoryWithChildrenSchema` - Recursive category tree structure
  - `CategoryWithCountSchema` - Category with product count
  - Slug format validation

##### Subtask 2.1.2: Define API Response Types ✅

- **api-response.schema.ts** ✅
  - `ApiResponseSchema<T>` - Generic API response wrapper
  - `PaginatedResponseSchema<T>` - Paginated list responses
  - `PaginationMetaSchema` - Pagination metadata
  - `ApiErrorSchema` - Standard error response
  - `ValidationErrorSchema` - Field-level validation errors
  - `QueryParamsSchema` - Common query parameters (page, limit, sort, search)

##### Subtask 2.1.3: Define Form Types ✅

- **forms.schema.ts** ✅
  - `LoginFormDataSchema` - User/vendor/admin login with rememberMe
  - `RegisterFormDataSchema` - Customer registration with password confirmation
  - `ForgotPasswordFormDataSchema` - Password reset request
  - `ResetPasswordFormDataSchema` - New password setup with token
  - `ChangePasswordFormDataSchema` - Password change with validation
  - `ProfileUpdateFormDataSchema` - User profile updates
  - `VendorProfileUpdateFormDataSchema` - Vendor profile with company info
  - Password matching validation and terms acceptance

##### Subtask 2.1.4: Create Index Exports ✅

- **index.ts** ✅
  - Comprehensive exports for all schemas and types
  - Organized by entity (User, Vendor, Store, Product, Category, API, Forms)
  - JSDoc comments for better IDE support
  - Both Zod schemas and TypeScript types exported

**Files Created:**

- `libs/shared/types/src/lib/user.schema.ts`
- `libs/shared/types/src/lib/vendor.schema.ts`
- `libs/shared/types/src/lib/store.schema.ts`
- `libs/shared/types/src/lib/product.schema.ts`
- `libs/shared/types/src/lib/category.schema.ts`
- `libs/shared/types/src/lib/api-response.schema.ts`
- `libs/shared/types/src/lib/forms.schema.ts`
- `libs/shared/types/src/index.ts` (updated with all exports)

**Validation Results:**

- ✅ ESLint: Passed (1 minor warning on `any` type)
- ✅ TypeScript: All types properly inferred from Zod schemas
- ✅ Mall App: Compiled and running successfully on port 4200

### ✅ Phase 2: Shared Infrastructure - Task 2.2 Complete

#### Task 2.2: Utilities Library (libs/shared/utils) ✅

**Completed Subtasks:**

##### Subtask 2.2.1: Format Utilities (format.ts) ✅

- `formatCurrency(amount, currency)` - Formats numbers as currency with Intl.NumberFormat
- `formatDate(date, format)` - Formats dates using date-fns with format tokens
- `formatRelativeTime(date)` - Formats as "2 hours ago", "yesterday" using formatDistanceToNow
- `formatNumber(number)` - Formats numbers with thousands separators
- `formatPercentage(value)` - Formats as percentage (e.g., "25.5%")

##### Subtask 2.2.2: Validation Utilities (validation.ts) ✅

- `isValidEmail(email)` - Email format validation with regex
- `isValidPhone(phone)` - International phone number validation
- `isValidUrl(url)` - URL validation with protocol check
- `isValidSlug(slug)` - Slug validation (lowercase, hyphens, alphanumeric)
- `sanitizeInput(input)` - XSS prevention by escaping HTML special characters

##### Subtask 2.2.3: String Utilities (string.ts) ✅

- `truncate(text, length)` - Truncate with ellipsis
- `slugify(text)` - Convert to URL-safe slug
- `capitalize(text)` - Capitalize first letter
- `pluralize(count, singular, plural)` - Handle singular/plural forms
- `stripHtml(html)` - Remove HTML tags

##### Subtask 2.2.4: Array Utilities (array.ts) ✅

- `groupBy<T>(array, key)` - Group array by property with TypeScript generics
- `sortBy<T>(array, key, order)` - Sort by property (asc/desc)
- `unique<T>(array)` - Remove duplicates (primitives & objects)
- `chunk<T>(array, size)` - Split into chunks

##### Subtask 2.2.5: Object Utilities (object.ts) ✅

- `omit<T>(object, keys)` - Remove properties with type safety
- `pick<T>(object, keys)` - Select properties with type safety
- `isEmpty(value)` - Check if empty (null, undefined, empty object/array/string)
- `deepClone<T>(object)` - Deep clone using structuredClone with JSON fallback

##### Subtask 2.2.6: Class Name Utilities (cn.ts) ✅

- `cn(...inputs)` - Combines clsx and tailwind-merge for intelligent class merging
- Resolves Tailwind CSS conflicts (last class wins)
- Supports conditional classes and modifiers (hover:, focus:, etc.)
- Critical for component library development with className prop overrides

##### Subtask 2.2.7: Error Handling Utilities (error.ts) ✅

- `getErrorMessage(error)` - Safely extract error message from unknown types
- `isApiError(error)` - Type guard for ApiError interface
- `handleApiError(error)` - User-friendly messages for HTTP status codes (400-503)

**Files Created:**

- `libs/shared/utils/src/lib/format.ts` (5 functions)
- `libs/shared/utils/src/lib/validation.ts` (5 functions)
- `libs/shared/utils/src/lib/string.ts` (5 functions)
- `libs/shared/utils/src/lib/array.ts` (4 functions)
- `libs/shared/utils/src/lib/object.ts` (4 functions)
- `libs/shared/utils/src/lib/cn.ts` (1 critical function)
- `libs/shared/utils/src/lib/error.ts` (3 functions + ApiError interface)
- `libs/shared/utils/src/index.ts` (updated with all exports)

**Total Functions**: 27 utility functions + 1 interface

**Key Features:**

- Full TypeScript type safety with generics
- Comprehensive JSDoc documentation with examples
- Proper error handling and edge cases
- Uses date-fns for date formatting (best practices)
- Uses clsx + tailwind-merge for className utilities
- Support for modern APIs (structuredClone) with fallbacks

**Validation Results:**

- ✅ TypeScript: Compilation successful with noEmit
- ✅ ESLint: All issues resolved
- ✅ Module Resolution: Fixed .js extensions for ESM compatibility

### ✅ Phase 2: Shared Infrastructure - Task 2.3 Complete

#### Task 2.3: Configuration Library (libs/shared/config) ✅

**Completed Subtasks:**

##### Subtask 2.3.1: Environment Configuration (env.ts) ✅

- `API_BASE_URL` - Backend API base URL (default: 'http://localhost:3000/api')
- `APP_ENV` - Current environment ('development' | 'staging' | 'production')
- `IS_DEV` - Development mode flag
- `IS_PROD` - Production mode flag
- `ENABLE_DEVTOOLS` - Enable React Query/Router devtools
- `GOOGLE_CLIENT_ID` - Google OAuth client ID (optional in dev)
- `validateEnv()` - Validates required env vars (throws in production, warns in dev)
- Auto-validates on module import
- Uses `import.meta.env.VITE_*` for Vite environment variables

##### Subtask 2.3.2: API Configuration (api.config.ts) ✅

- `API_ENDPOINTS` - Centralized endpoint constants for all domains:
  - **auth**: login, loginWithGoogle, register, logout, refreshToken, resetPassword, verifyResetToken, updatePassword, me
  - **vendors**: list, detail, create, update, delete, stores, stats
  - **stores**: list, detail, bySlug, create, update, delete, products, uploadLogo, uploadCover
  - **products**: list, detail, create, update, delete, uploadImages, deleteImage
  - **users**: list, detail, me, update, updateMe, delete, deleteMe, uploadAvatar
  - **categories**: list, detail, create, update, delete
  - **search**: products, stores, suggestions
- `REQUEST_CONFIG` - HTTP request settings (timeout: 30s, retries: 3, delay: 1s)
- `RATE_LIMIT_CONFIG` - Client-side rate limits (60/min, 1000/hour)
- `buildEndpoint(template, params)` - Helper to build endpoints with parameters

##### Subtask 2.3.3: App Configuration (app.config.ts) ✅

- `PAGINATION_CONFIG` - Pagination defaults (pageSize: 20, options: [10,20,50,100])
- `QUERY_CONFIG` - TanStack Query cache settings with resource-specific stale times:
  - vendors: 30 min, stores: 30 min, products: 15 min
  - users: 30 min, categories: 1 hour, search: 5 min
  - cacheTime: 10 min, refetchOnWindowFocus: false, retry: 1
- `I18N_CONFIG` - Internationalization (languages: ['en', 'he'], default: 'en')
- `DATE_FORMATS` - date-fns format strings (short, long, full, time, datetime)
- `CURRENCY_CONFIG` - Currency settings (default: USD, supports: USD/EUR/ILS)
- `UPLOAD_CONFIG` - File upload constraints (maxSize: 5MB, maxFiles: 10, image types)

##### Subtask 2.3.4: Route Configuration (routes.config.ts) ✅

- `MALL_ROUTES` - Customer-facing routes (home, login, register, stores, products, search, account)
- `VENDOR_ROUTES` - Vendor dashboard routes (dashboard, products, stores, account)
- `ADMIN_ROUTES` - Admin control panel routes (dashboard, vendors, stores, users, products, analytics, auditLogs)
- `buildMallRoute` - Route builders for mall app (storeDetail, productDetail, resetPassword)
- `buildVendorRoute` - Route builders for vendor app (productDetail, productEdit, storeDetail, resetPassword)
- `buildAdminRoute` - Route builders for admin app (vendorDetail, vendorEdit, storeDetail, storeEdit, userDetail, userEdit, productDetail, resetPassword)

**Files Created:**

- `libs/shared/config/src/lib/env.ts` (6 exports + validateEnv)
- `libs/shared/config/src/lib/api.config.ts` (API_ENDPOINTS, REQUEST_CONFIG, RATE_LIMIT_CONFIG, buildEndpoint)
- `libs/shared/config/src/lib/app.config.ts` (6 config objects + SupportedLanguage type)
- `libs/shared/config/src/lib/routes.config.ts` (3 route objects + 3 builder objects)
- `libs/shared/config/src/vite-env.d.ts` (Vite environment type definitions)
- `libs/shared/config/src/index.ts` (updated with all exports)
- Deleted old `libs/shared/config/src/lib/config.ts`

**Total Exports**: 16 configuration objects + 4 route builders + 2 functions + 1 type

**Key Features:**

- Type-safe environment variable access with validation
- Centralized API endpoint management with parameter substitution
- Resource-specific cache strategies for optimal performance
- Comprehensive route definitions for all three applications
- Full TypeScript type safety with `as const` assertions
- Comprehensive JSDoc documentation

**Validation Results:**

- ✅ TypeScript: Compilation successful with noEmit
- ✅ ESLint: All issues resolved
- ✅ Module Resolution: Fixed .js extensions for ESM compatibility
- ✅ Environment Types: Proper Vite env.d.ts type definitions

## Key Requirements & Design Decisions

### Store URL Field

- **CRITICAL**: Store entities have a **REQUIRED `url` field** for linking to external vendor websites
- Stores display their external websites in iframes within the platform
- URL validation ensures proper format

### Role-Based Permissions

#### Customer

- Browse stores and products
- Manage favorites and browsing history
- Update own profile and preferences
- View product details with store links

#### Vendor

- **Product Management**: Full CRUD on own products only
- **Store Access**: READ-ONLY access to assigned stores
- **Profile**: READ-ONLY for most fields, can only change password
- Cannot create, edit, or delete stores (Admin only)
- Cannot modify vendor profile info (Admin only)

#### Admin

- **Vendor Management**: Full CRUD operations
- **Store Management**: Full CRUD operations (create, assign to vendors, update, delete)
- **User Management**: Full CRUD operations
- **Product Access**: READ-ONLY (vendors manage their own products)
- Full platform analytics and audit logs

### Multi-Language Support

- English (en) and Hebrew (he)
- RTL layout support for Hebrew
- User preference persistence

### Authentication Flow

- JWT-based authentication with refresh tokens
- Redis session management (24h TTL)
- Password reset with email tokens (1h TTL)
- Google OAuth support

### ✅ Phase 2: Shared Infrastructure - Task 2.4 Complete

#### Task 2.4: Internationalization Library (libs/shared/i18n) ✅

**Completed Subtasks:**

##### Subtask 2.4.1: Setup i18next Configuration ✅

- **config.ts** - Configured i18next with react-i18next and language detector:
  - Integrated `i18next`, `react-i18next`, and `i18next-browser-languagedetector`
  - JSON import assertions with `with { type: 'json' }` for NodeNext module compatibility
  - 8 namespaces: common, auth, products, stores, vendors, users, errors, validation
  - Fallback language: English (en)
  - Detection order: localStorage → navigator
  - Automatic language detection and persistence
  - React-safe interpolation (escapeValue: false)

##### Subtask 2.4.2: Create English Translation Files ✅

Created 8 comprehensive JSON translation files in `locales/en/`:

- **common.json** - UI elements (15 buttons, 6 labels, 9 navigation items)
- **auth.json** - Authentication flows (login, register, forgot password, reset password)
- **products.json** - Product management (CRUD, fields, filters, 6 sort options)
- **stores.json** - Store management (CRUD, fields, store actions)
- **vendors.json** - Vendor management (CRUD, fields, store count)
- **users.json** - User management (CRUD, fields, 3 roles, 6 account sections)
- **errors.json** - Error messages (6 error types: network, unauthorized, notFound, serverError, validation, unknown)
- **validation.json** - Form validation (9 validation messages with interpolation support)

##### Subtask 2.4.3: Create Hebrew Translation Files ✅

Created matching 8 Hebrew translation files in `locales/he/`:

- Full Hebrew translations with proper RTL considerations
- Authentic Hebrew UI terminology
- Interpolation variables preserved ({{count}}, {{min}}, {{max}})
- Cultural adaptations for date/number formats

##### Subtask 2.4.4: Create Translation Hooks ✅

- **useTranslation.ts** - Custom hook wrapper for react-i18next:
  - Returns `t` (translation function), `language`, `changeLanguage`, and `isRTL` flag
  - Supports namespace parameter for scoped translations
  - Automatic RTL detection (isRTL: true for Hebrew)
  - Type-safe translation keys (when types are added)

##### Subtask 2.4.5: Create Language Switcher Component ✅

- **LanguageSwitcher.tsx** - React component for language selection:
  - Dropdown selector for English/Hebrew
  - Automatic HTML `dir` attribute update (ltr/rtl)
  - Automatic HTML `lang` attribute update
  - Language persistence in localStorage
  - useEffect hook for RTL layout switching
  - Tailwind CSS styling with border and rounded styles

##### Subtask 2.4.6: Export Structure ✅

- **index.ts** - Clean public API exports:
  - `i18n` - Configured i18next instance
  - `useTranslation` - Custom translation hook
  - `LanguageSwitcher` - Language switcher component
  - Proper `.js` extensions for NodeNext module resolution

##### Subtask 2.4.7: TypeScript Configuration ✅

- Updated **tsconfig.lib.json**:
  - `resolveJsonModule: true` - Enable JSON imports
  - `include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.json"]` - Include JSON files
  - Support for import assertions with NodeNext module system

**Files Created:**

- `libs/shared/i18n/src/lib/config.ts` (i18next setup)
- `libs/shared/i18n/src/lib/hooks/useTranslation.ts` (custom hook)
- `libs/shared/i18n/src/lib/components/LanguageSwitcher.tsx` (UI component)
- `libs/shared/i18n/src/locales/en/common.json` (30 translations)
- `libs/shared/i18n/src/locales/en/auth.json` (32 translations)
- `libs/shared/i18n/src/locales/en/products.json` (20 translations)
- `libs/shared/i18n/src/locales/en/stores.json` (10 translations)
- `libs/shared/i18n/src/locales/en/vendors.json` (6 translations)
- `libs/shared/i18n/src/locales/en/users.json` (15 translations)
- `libs/shared/i18n/src/locales/en/errors.json` (6 translations)
- `libs/shared/i18n/src/locales/en/validation.json` (9 translations)
- `libs/shared/i18n/src/locales/he/common.json` (30 Hebrew translations)
- `libs/shared/i18n/src/locales/he/auth.json` (32 Hebrew translations)
- `libs/shared/i18n/src/locales/he/products.json` (20 Hebrew translations)
- `libs/shared/i18n/src/locales/he/stores.json` (10 Hebrew translations)
- `libs/shared/i18n/src/locales/he/vendors.json` (6 Hebrew translations)
- `libs/shared/i18n/src/locales/he/users.json` (15 Hebrew translations)
- `libs/shared/i18n/src/locales/he/errors.json` (6 Hebrew translations)
- `libs/shared/i18n/src/locales/he/validation.json` (9 Hebrew translations)
- `libs/shared/i18n/src/index.ts` (updated exports)
- `libs/shared/i18n/tsconfig.lib.json` (updated configuration)
- Deleted: `libs/shared/i18n/src/lib/i18n.ts` (old placeholder)

**Total Translations**: 128 English keys + 128 Hebrew keys = 256 translation strings

**Key Features:**

- Complete bilingual support (English + Hebrew)
- RTL layout support with automatic HTML dir/lang switching
- Browser language detection with localStorage persistence
- 8 domain-specific translation namespaces
- Interpolation support for dynamic values (counts, min/max, etc.)
- Type-safe with modern import assertions
- React component for easy language switching
- ESM module system compatibility with NodeNext

**Usage Example:**

```typescript
// In a component
import { useTranslation, LanguageSwitcher } from '@org/i18n';

function MyComponent() {
  const { t, isRTL } = useTranslation('common');

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <LanguageSwitcher />
      <button>{t('buttons.save')}</button>
      <h1>{t('navigation.products')}</h1>
    </div>
  );
}
```

**Validation Results:**

- ✅ All 16 JSON files created with valid syntax
- ✅ TypeScript: JSON imports properly configured
- ✅ Module Resolution: ESM compatibility with .js extensions
- ✅ RTL Support: Automatic layout switching for Hebrew
- ✅ Translation Coverage: All application domains covered

### ✅ Phase 2: Shared Infrastructure - Task 2.5 Complete

#### Task 2.5: Data Access Layer (libs/shared/data-access) ✅

**This is the LARGEST task in Phase 2** - Complete implementation of HTTP client, API services, TanStack Query configuration, and React hooks for all entities.

**Completed Subtasks:**

##### Subtask 2.5.1: Setup Axios HTTP Client ✅

- **http-client.ts** - Configured Axios instance:
  - Base URL from `API_BASE_URL` config
  - 30-second timeout
  - Automatic Content-Type: application/json
  - Request interceptor: Attaches Bearer token from localStorage
  - Response interceptor: Global error handling with 401 auto-redirect
  - Development logging for all requests
  - Error message extraction using `getErrorMessage` utility

##### Subtask 2.5.2: Create API Services ✅

Created 7 comprehensive service modules in `services/`:

- **auth.service.ts** - Authentication API (8 methods):

  - `login(data)` - Email/password authentication
  - `loginWithGoogle(token)` - Google OAuth authentication
  - `register(data)` - User registration
  - `logout()` - Session termination
  - `refreshToken()` - Token renewal
  - `resetPassword(email)` - Password reset request
  - `updatePassword(token, password)` - Password update with token
  - `getCurrentUser()` - Fetch current user profile

- **vendor.service.ts** - Vendor management (7 methods):

  - `list(params)` - Paginated vendor list with filters
  - `getById(id)` - Vendor details
  - `getStats(id)` - Vendor with statistics (store/product counts)
  - `getStores(id, params)` - Vendor's stores
  - `create(data)` - Create vendor (Admin only)
  - `update(id, data)` - Update vendor (Admin only)
  - `delete(id)` - Delete vendor (Admin only)

- **store.service.ts** - Store management (10 methods):

  - `list(params)` - Paginated store list
  - `getById(id)` - Store details with vendor
  - `getBySlug(slug)` - Store lookup by URL slug
  - `getWithStats(id)` - Store with statistics
  - `getProducts(id, params)` - Store's products
  - `create(data)` - Create store (Admin only)
  - `update(id, data)` - Update store (Admin only)
  - `delete(id)` - Delete store (Admin only)
  - `uploadLogo(id, file)` - Logo upload with FormData
  - `uploadCover(id, file)` - Cover image upload

- **product.service.ts** - Product management (8 methods):

  - `list(params)` - Paginated product list
  - `filter(filters)` - Filtered product search
  - `getById(id)` - Product details with category/store
  - `create(data)` - Create product (Vendor only)
  - `update(id, data)` - Update product (Vendor only)
  - `delete(id)` - Delete product (Vendor only)
  - `uploadImages(id, files)` - Multi-image upload
  - `deleteImage(id, imageId)` - Remove product image

- **user.service.ts** - User management (9 methods):

  - `list(params)` - Paginated user list (Admin only)
  - `getById(id)` - User details (Admin only)
  - `getMe()` - Current user profile
  - `create(data)` - Create user (Admin only)
  - `update(id, data)` - Update user (Admin only)
  - `updateMe(data)` - Update own profile
  - `delete(id)` - Delete user (Admin only)
  - `deleteMe()` - Delete own account
  - `uploadAvatar(file)` - Avatar upload

- **category.service.ts** - Category management (7 methods):

  - `list()` - All categories (flat list)
  - `listWithChildren()` - Hierarchical category tree
  - `listWithCounts()` - Categories with product counts
  - `getById(id)` - Category details with children
  - `create(data)` - Create category (Admin only)
  - `update(id, data)` - Update category (Admin only)
  - `delete(id)` - Delete category (Admin only)

- **search.service.ts** - Search operations (3 methods):
  - `searchProducts(query, params)` - Product search with filters
  - `searchStores(query, params)` - Store search
  - `getSuggestions(query)` - Auto-complete suggestions

**Total Service Methods**: 52 API methods across 7 services

##### Subtask 2.5.3: Setup TanStack Query ✅

- **query-client.ts** - QueryClient configuration:
  - Default stale time from `QUERY_CONFIG.staleTime.default` (5 minutes)
  - GC time from `QUERY_CONFIG.cacheTime` (10 minutes)
  - `refetchOnWindowFocus: false` for better UX
  - Retry: 1 attempt for failed queries
  - Consistent settings for queries and mutations

##### Subtask 2.5.4: Create Query Keys Factory ✅

- **query-keys.ts** - Hierarchical query key structure:
  - **auth**: me (current user)
  - **vendors**: all, lists, list(params), details, detail(id), stores(id, params), stats(id)
  - **stores**: all, lists, list(params), details, detail(id), bySlug(slug), products(id, params), withStats(id)
  - **products**: all, lists, list(params), filtered(filters), details, detail(id)
  - **users**: all, lists, list(params), details, detail(id), me
  - **categories**: all, lists, list(), withChildren(), withCounts(), details, detail(id)
  - **search**: products(query, params), stores(query, params), suggestions(query)
  - Type-safe with `as const` assertions
  - Proper cache invalidation hierarchy

##### Subtask 2.5.5: Create TanStack Query Hooks ✅

Created 7 comprehensive hook modules in `hooks/`:

- **useAuth.ts** - Authentication hooks (8 hooks):

  - `useLogin()` - Login mutation with token caching
  - `useLoginWithGoogle()` - Google OAuth mutation
  - `useRegister()` - Registration mutation
  - `useLogout()` - Logout mutation with cache clearing
  - `useResetPassword()` - Password reset request
  - `useUpdatePassword()` - Password update mutation
  - `useCurrentUser()` - Current user query (enabled when token exists)
  - `useRefreshToken()` - Token refresh mutation

- **useVendors.ts** - Vendor hooks (7 hooks):

  - `useVendors(params)` - Vendor list query with 30min stale time
  - `useVendor(id)` - Vendor detail query
  - `useVendorStats(id)` - Vendor statistics query
  - `useVendorStores(id, params)` - Vendor's stores query
  - `useCreateVendor()` - Create mutation with list invalidation
  - `useUpdateVendor()` - Update mutation with optimistic updates
  - `useDeleteVendor()` - Delete mutation with cache removal

- **useStores.ts** - Store hooks (9 hooks):

  - `useStores(params)` - Store list query with 30min stale time
  - `useStore(id)` - Store detail query
  - `useStoreBySlug(slug)` - Store by slug query
  - `useStoreWithStats(id)` - Store statistics query
  - `useStoreProducts(id, params)` - Store products query
  - `useCreateStore()` - Create mutation
  - `useUpdateStore()` - Update mutation with optimistic updates
  - `useDeleteStore()` - Delete mutation
  - `useUploadStoreLogo()` - Logo upload mutation
  - `useUploadStoreCover()` - Cover upload mutation

- **useProducts.ts** - Product hooks (8 hooks):

  - `useProducts(params)` - Product list query with 15min stale time
  - `useFilteredProducts(filters)` - Filtered product query
  - `useProduct(id)` - Product detail query
  - `useCreateProduct()` - Create mutation
  - `useUpdateProduct()` - Update mutation with optimistic updates
  - `useDeleteProduct()` - Delete mutation
  - `useUploadProductImages()` - Multi-image upload mutation
  - `useDeleteProductImage()` - Image deletion mutation

- **useUsers.ts** - User hooks (9 hooks):

  - `useUsers(params)` - User list query with 30min stale time
  - `useUser(id)` - User detail query
  - `useUserProfile()` - Current user profile query
  - `useCreateUser()` - Create mutation (Admin only)
  - `useUpdateUser()` - Update mutation with optimistic updates
  - `useUpdateProfile()` - Profile update mutation
  - `useDeleteUser()` - Delete mutation (Admin only)
  - `useDeleteAccount()` - Account deletion with cache clearing
  - `useUploadAvatar()` - Avatar upload mutation

- **useCategories.ts** - Category hooks (7 hooks):

  - `useCategories()` - Flat category list with 1h stale time
  - `useCategoriesWithChildren()` - Hierarchical category tree
  - `useCategoriesWithCounts()` - Categories with product counts
  - `useCategory(id)` - Category detail query
  - `useCreateCategory()` - Create mutation with tree invalidation
  - `useUpdateCategory()` - Update mutation with optimistic updates
  - `useDeleteCategory()` - Delete mutation with tree invalidation

- **useSearch.ts** - Search hooks (3 hooks):
  - `useSearchProducts(query, params, enabled)` - Product search with 5min stale time
  - `useSearchStores(query, params, enabled)` - Store search
  - `useSearchSuggestions(query, enabled)` - Auto-complete (min 2 chars)

**Total Hooks**: 51 custom hooks (8 auth + 7 vendors + 9 stores + 8 products + 9 users + 7 categories + 3 search)

##### Subtask 2.5.6: Export Everything ✅

- **index.ts** - Comprehensive public API:
  - HTTP Client: `httpClient`
  - TanStack Query: `queryClient`, `queryKeys`
  - All 7 services exported (auth, vendor, store, product, user, category, search)
  - All 51 hooks exported with organized groups
  - `SearchSuggestion` type export
  - Proper `.js` extensions for ESM compatibility

**Files Created:**

- `libs/shared/data-access/src/lib/http-client.ts`
- `libs/shared/data-access/src/lib/query-client.ts`
- `libs/shared/data-access/src/lib/query-keys.ts`
- `libs/shared/data-access/src/lib/services/auth.service.ts`
- `libs/shared/data-access/src/lib/services/vendor.service.ts`
- `libs/shared/data-access/src/lib/services/store.service.ts`
- `libs/shared/data-access/src/lib/services/product.service.ts`
- `libs/shared/data-access/src/lib/services/user.service.ts`
- `libs/shared/data-access/src/lib/services/category.service.ts`
- `libs/shared/data-access/src/lib/services/search.service.ts`
- `libs/shared/data-access/src/lib/hooks/useAuth.ts`
- `libs/shared/data-access/src/lib/hooks/useVendors.ts`
- `libs/shared/data-access/src/lib/hooks/useStores.ts`
- `libs/shared/data-access/src/lib/hooks/useProducts.ts`
- `libs/shared/data-access/src/lib/hooks/useUsers.ts`
- `libs/shared/data-access/src/lib/hooks/useCategories.ts`
- `libs/shared/data-access/src/lib/hooks/useSearch.ts`
- `libs/shared/data-access/src/index.ts` (updated)
- Deleted: `libs/shared/data-access/src/lib/data-access.ts` (old placeholder)

**Total Files**: 18 new files (1 HTTP client + 1 query config + 1 query keys + 7 services + 7 hooks + 1 index)

**Key Features:**

- **Optimistic Updates**: Immediate UI feedback with rollback on error (vendors, stores, products, users, categories)
- **Cache Invalidation**: Proper query invalidation after mutations
- **Resource-Specific Stale Times**: Optimized cache duration per entity type
- **Error Handling**: Global error interceptor with 401 auto-redirect
- **Type Safety**: Full TypeScript typing using `@org/types`
- **File Uploads**: Proper FormData handling for images (stores, products, users)
- **Hierarchical Query Keys**: Efficient cache invalidation with nested key structure
- **Authentication Integration**: Automatic token attachment to requests
- **Development Logging**: HTTP request logging in dev mode

**Validation Results:**

- ✅ ESLint: All code passes linting with no errors
- ✅ Module Resolution: All ESM imports use `.js` extensions
- ✅ Type Safety: Full TypeScript compatibility with @org/types, @org/config, @org/utils
- ✅ Query Pattern: Follows TanStack Query best practices from official docs
- ✅ Axios Pattern: Interceptors configured per Axios documentation

**Usage Example:**

```typescript
// In a React component
import { useProducts, useCreateProduct } from '@org/data-access';

function ProductList() {
  // Query with automatic caching
  const { data, isLoading } = useProducts({ page: 1, limit: 20 });

  // Mutation with optimistic updates
  const createProduct = useCreateProduct();

  const handleCreate = (newProduct) => {
    createProduct.mutate(newProduct, {
      onSuccess: () => {
        // List automatically refetched
      },
    });
  };

  return <div>{isLoading ? 'Loading...' : data?.data.map((product) => <div key={product.id}>{product.name}</div>)}</div>;
}
```

#### Task 2.6: UI Component Library - ✅ COMPLETE

**Completed**: 2026-04-29 11:05:00 UTC+3

##### Subtask 2.6.1: Setup shadcn/ui

- ✅ Created `components.json` configuration
- ✅ Set up `globals.css` with CSS variables for theming
- ✅ Configured TypeScript path aliases
- ✅ Created local cn() utility

##### Subtask 2.6.2: Install shadcn/ui Base Components (19 components)

- ✅ Button, Input, Label, Card
- ✅ Dialog, AlertDialog, DropdownMenu, Select
- ✅ Checkbox, RadioGroup, Textarea
- ✅ Toast/Toaster with useToast hook
- ✅ Table, Tabs, Avatar, Badge
- ✅ Separator, Skeleton, Alert

##### Subtask 2.6.3: Create Custom Components (11 components)

- ✅ LoadingSpinner, ErrorMessage, EmptyState
- ✅ PageHeader, PageContainer
- ✅ DataTable (with sorting, pagination, search)
- ✅ SearchBar, FilterPanel
- ✅ ImageUpload (drag & drop with preview)
- ✅ ConfirmDialog, Breadcrumbs

##### Subtask 2.6.4: Create Layout Components (5 components)

- ✅ Header (logo, navigation, user menu)
- ✅ Footer (sections, copyright)
- ✅ Sidebar (collapsible with icons)
- ✅ MainLayout (Header + Sidebar + Content + Footer)
- ✅ AuthLayout (centered authentication layout)

**Dependencies Installed**: All Radix UI primitives, class-variance-authority

**Files Created**:

- 19 shadcn/ui components in `libs/shared/ui/src/components/ui/`
- 11 custom components in `libs/shared/ui/src/components/custom/`
- 5 layout components in `libs/shared/ui/src/components/layouts/`
- `components.json`, `globals.css`, `utils.ts`

---

#### Task 2.7: Storybook Setup - ✅ COMPLETE

**Completed**: 2026-04-29 11:22:00 UTC+3

##### Subtask 2.7.1: Configure Storybook

- ✅ Created `.storybook/main.ts` with Vite integration
- ✅ Created `.storybook/preview.tsx` with global decorators
- ✅ Configured Tailwind CSS integration
- ✅ Added dark mode support
- ✅ Configured viewport controls
- ✅ Added Nx Storybook targets to `project.json`

##### Subtask 2.7.2: Create Stories (35 stories total)

- ✅ 19 shadcn/ui component stories
- ✅ 11 custom component stories
- ✅ 5 layout component stories
- ✅ All stories use CSF3 format with TypeScript
- ✅ Interactive controls with args
- ✅ Automatic documentation with autodocs
- ✅ Dark mode variants
- ✅ Realistic sample data

**Run Storybook**: `nx storybook shared-ui` → http://localhost:4400/

---

### 📊 Phase 2 Summary - ✅ 100% COMPLETE

**Status**: All 7 tasks completed successfully

| Task              | Status      | Components/Features                             |
| ----------------- | ----------- | ----------------------------------------------- |
| 2.1 Type System   | ✅ Complete | 6 entity schemas, API responses, forms          |
| 2.2 Utilities     | ✅ Complete | 27 utility functions across 7 modules           |
| 2.3 Configuration | ✅ Complete | Environment, API, app, routes config            |
| 2.4 i18n          | ✅ Complete | English/Hebrew translations, RTL support        |
| 2.5 Data Access   | ✅ Complete | HTTP client, 7 services, 51 hooks               |
| 2.6 UI Components | ✅ Complete | 35 components (19 base + 11 custom + 5 layouts) |
| 2.7 Storybook     | ✅ Complete | 35 stories, dark mode, autodocs                 |

**Total Components**: 35 UI components with 35 Storybook stories
**Total Hooks**: 51 TanStack Query hooks
**Total Services**: 52 API methods across 7 services
**Total Utilities**: 27 utility functions
**Total Translations**: 256 strings (English + Hebrew)

**Libraries Ready**:

- ✅ `@org/types` - Type system with Zod validation
- ✅ `@org/utils` - Utility functions
- ✅ `@org/config` - Configuration management
- ✅ `@org/i18n` - Internationalization
- ✅ `@org/data-access` - API layer with TanStack Query
- ✅ `@org/ui` - Complete UI component library with Storybook

**Next Phase**: Phase 3 - Authentication & Authorization

---

## Next Steps

### Immediate Next Phase: Phase 3

**Authentication & Authorization**

- Implement authentication flows (login, register, password reset)
- Set up React Auth Kit integration
- Create protected route guards
- Implement role-based access control (Customer, Vendor, Admin)
- Create auth pages and components

### Upcoming Phases

- Phase 4: Feature Libraries (vendors, stores, products, users, search)
- Phase 5: Application Shells (Mall, Vendor, Admin apps)
- Phase 6: Testing & Quality Assurance
- Phase 7: Backend Development (NestJS Microservices)

## Project Status

- **Phase 1**: ✅ 100% Complete (2/2 tasks) - Foundation & Infrastructure
- **Phase 2**: ✅ 100% Complete (7/7 tasks) - Shared Infrastructure
- **Phase 3**: ⏳ Not Started - Authentication & Authorization
- **Overall Progress**: ~20% (9 of ~42 major tasks across 10 phases)

**Last Updated**: 2026-04-29 11:30:00 UTC+3
