# E-Commerce Platform - Master Implementation Tasks for Orchestrator Mode

> **Complete Task List for Orchestrator Mode**
>
> This document contains ALL tasks and subtasks needed to build the e-commerce platform from end to end.
> Each task is organized by phase with clear dependencies and execution order.

---

## 📋 Table of Contents

1. [Phase 1: Foundation & Infrastructure Setup](#phase-1-foundation--infrastructure-setup)
2. [Phase 2: Shared Infrastructure](#phase-2-shared-infrastructure)
3. [Phase 3: Authentication & Authorization](#phase-3-authentication--authorization)
4. [Phase 4: Feature Libraries](#phase-4-feature-libraries)
5. [Phase 5: Domain Libraries](#phase-5-domain-libraries)
6. [Phase 6: Application Development](#phase-6-application-development)
7. [Phase 7: Backend API Development](#phase-7-backend-api-development)
8. [Phase 8: Testing](#phase-8-testing)
9. [Phase 9: Deployment & DevOps](#phase-9-deployment--devops)
10. [Phase 10: Documentation & Handoff](#phase-10-documentation--handoff)

---

## Phase 1: Foundation & Infrastructure Setup

### Task 1.1: Project Configuration & Dependencies

#### Subtask 1.1.1: Install Core Dependencies

- Install TanStack Query packages
  - `@tanstack/react-query`
  - `@tanstack/react-query-devtools`
- Install TanStack Router packages
  - `@tanstack/react-router`
  - `@tanstack/router-devtools`
- Install react-auth-kit for authentication
- Install Axios for HTTP client
- Install Zod for schema validation
- Install react-hook-form and @hookform/resolvers
- Install Zustand for state management
- Install date-fns for date utilities
- Install lucide-react for icons
- Install clsx and tailwind-merge for className utilities
- Install concurrently for running multiple dev servers

#### Subtask 1.1.2: Install UI & Styling Dependencies

- Install Tailwind CSS with postcss and autoprefixer
- Install class-variance-authority for component variants
- Configure Tailwind CSS in workspace root
- Set up global CSS variables for theming
- Configure dark mode support

#### Subtask 1.1.3: Install Development & Testing Tools

- Install Storybook packages
  - `@storybook/react-vite`
  - `@storybook/addon-essentials`
- Install Vitest for unit testing
  - `vitest`
  - `@vitest/ui`
- Install React Testing Library
  - `@testing-library/react`
  - `@testing-library/jest-dom`
- Install Playwright for E2E testing
- Configure test setup files

#### Subtask 1.1.4: Install i18n Dependencies

- Install react-i18next and i18next
- Install i18next-browser-languagedetector
- Install i18next-http-backend for loading translations

#### Subtask 1.1.5: Update Nx Configuration

- Update nx.json with proper target defaults
- Configure affected command settings
- Set up caching strategies for builds and tests
- Configure task pipeline dependencies

#### Subtask 1.1.6: Update TypeScript Configuration

- Update tsconfig.base.json with path mappings for all libraries
- Configure strict mode settings
- Set up proper module resolution
- Add DOM types for React apps

#### Subtask 1.1.7: Environment Configuration

- Create .env.example files for each app
- Set up environment variable handling with Vite
- Configure API base URLs for different environments
- Set up environment-specific configurations

### Task 1.2: Workspace Structure Setup

#### Subtask 1.2.1: Generate Applications

- Generate Mall app with Vite bundler and routing
- Generate Vendor app with Vite bundler and routing
- Generate Admin app with Vite bundler and routing
- Configure each app's vite.config.ts
- Set up proper ports (Mall: 4200, Vendor: 4201, Admin: 4202)

#### Subtask 1.2.2: Generate Shared Libraries

- Generate shared/ui library with Vite bundler
- Generate shared/data-access library
- Generate shared/types library
- Generate shared/utils library
- Generate shared/config library
- Generate shared/i18n library

#### Subtask 1.2.3: Generate Feature Libraries

- Generate features/auth library with Vite bundler
- Generate features/vendors library with Vite bundler
- Generate features/stores library with Vite bundler
- Generate features/products library with Vite bundler
- Generate features/users library with Vite bundler
- Generate features/search library with Vite bundler

#### Subtask 1.2.4: Generate Domain Libraries

- Generate domain/customer library with Vite bundler
- Generate domain/vendor library with Vite bundler
- Generate domain/admin library with Vite bundler

#### Subtask 1.2.5: Delete Existing Example Code

- Delete apps/shop directory and all contents
- Delete libs/shop directory and all contents
- Delete libs/api/products directory
- Delete libs/shared/models directory
- Clean up any remaining example files

---

## Phase 2: Shared Infrastructure

### Task 2.1: Type System & Validation (libs/shared/types)

#### Subtask 2.1.1: Define Core Entity Schemas with Zod

- Create user.schema.ts
  - Define UserRole enum (customer, vendor, admin)
  - Define base User schema with Zod
  - Define Customer-specific fields
  - Define Vendor-specific fields
  - Define Admin-specific fields
  - Export TypeScript types from Zod schemas
- Create vendor.schema.ts
  - Define Vendor schema (id, email, name, company, phone, timestamps)
  - Define VendorCreateInput schema
  - Define VendorUpdateInput schema
  - Add validation rules (email format, phone format)
  - Export TypeScript types
- Create store.schema.ts
  - Define Store schema (id, name, slug, url, description, logo, coverImage, vendorId, isActive)
  - Define StoreCreateInput schema with REQUIRED url field
  - Define StoreUpdateInput schema
  - Add validation rules (slug format, URL validation)
  - Export TypeScript types
- Create product.schema.ts
  - Define Product schema (id, name, description, price, comparePrice, images, category, storeId)
  - Define ProductCreateInput schema
  - Define ProductUpdateInput schema
  - Add validation rules (price > 0, comparePrice > price)
  - Export TypeScript types
- Create category.schema.ts
  - Define Category schema (id, name, slug, description, parentId)
  - Define CategoryCreateInput schema
  - Define CategoryUpdateInput schema
  - Export TypeScript types

#### Subtask 2.1.2: Define API Response Types

- Create api-response.schema.ts
  - Define ApiResponse<T> generic type
  - Define PaginatedResponse<T> type
  - Define ApiError type
  - Define ValidationError type

#### Subtask 2.1.3: Define Form Types

- Create forms.schema.ts
  - Define LoginFormData schema
  - Define RegisterFormData schema
  - Define PasswordResetFormData schema
  - Define ProfileUpdateFormData schema
  - Export TypeScript types

#### Subtask 2.1.4: Create Index Exports

- Create comprehensive index.ts exporting all schemas and types
- Organize exports by entity
- Add JSDoc comments for better IDE support

### Task 2.2: Utilities Library (libs/shared/utils)

#### Subtask 2.2.1: Create Formatting Utilities

- Create format.ts
  - Implement formatCurrency(amount, currency)
  - Implement formatDate(date, format) using date-fns
  - Implement formatRelativeTime(date)
  - Implement formatNumber(number)
  - Implement formatPercentage(value)

#### Subtask 2.2.2: Create Validation Utilities

- Create validation.ts
  - Implement isValidEmail(email)
  - Implement isValidPhone(phone)
  - Implement isValidUrl(url)
  - Implement isValidSlug(slug)
  - Implement sanitizeInput(input)

#### Subtask 2.2.3: Create String Utilities

- Create string.ts
  - Implement truncate(text, length)
  - Implement slugify(text)
  - Implement capitalize(text)
  - Implement pluralize(count, singular, plural)
  - Implement stripHtml(html)

#### Subtask 2.2.4: Create Array Utilities

- Create array.ts
  - Implement groupBy(array, key)
  - Implement sortBy(array, key, order)
  - Implement unique(array)
  - Implement chunk(array, size)

#### Subtask 2.2.5: Create Object Utilities

- Create object.ts
  - Implement omit(object, keys)
  - Implement pick(object, keys)
  - Implement isEmpty(value)
  - Implement deepClone(object)

#### Subtask 2.2.6: Create Class Name Utilities

- Create cn.ts
  - Export cn() function using clsx and tailwind-merge
  - Add TypeScript types for className handling

#### Subtask 2.2.7: Create Error Handling Utilities

- Create error.ts
  - Implement getErrorMessage(error)
  - Implement isApiError(error) type guard
  - Implement handleApiError(error)

### Task 2.3: Configuration Library (libs/shared/config)

#### Subtask 2.3.1: Create Environment Configuration

- Create env.ts
  - Define environment variables interface
  - Export API_BASE_URL
  - Export APP_ENV (development, staging, production)
  - Export feature flags
  - Add validation for required env vars

#### Subtask 2.3.2: Create API Configuration

- Create api.config.ts
  - Define API endpoints constants
  - Define request timeout settings
  - Define retry configuration
  - Define rate limiting settings

#### Subtask 2.3.3: Create App Configuration

- Create app.config.ts
  - Define pagination defaults (page size, max pages)
  - Define cache durations for TanStack Query
  - Define supported languages
  - Define date/time formats
  - Define currency settings

#### Subtask 2.3.4: Create Route Configuration

- Create routes.config.ts
  - Define route paths for Mall app
  - Define route paths for Vendor app
  - Define route paths for Admin app
  - Export route builder functions

### Task 2.4: Internationalization (libs/shared/i18n)

#### Subtask 2.4.1: Setup i18next Configuration

- Create i18n.config.ts
  - Configure i18next with react-i18next
  - Set up language detection
  - Configure fallback language (English)
  - Set up namespace loading

#### Subtask 2.4.2: Create English Translation Files

- Create locales/en/common.json (buttons, labels, etc.)
- Create locales/en/auth.json (authentication translations)
- Create locales/en/products.json (product-related translations)
- Create locales/en/stores.json (store-related translations)
- Create locales/en/vendors.json (vendor-related translations)
- Create locales/en/users.json (user-related translations)
- Create locales/en/errors.json (error messages)
- Create locales/en/validation.json (validation messages)

#### Subtask 2.4.3: Create Hebrew Translation Files

- Create locales/he/ directory
- Mirror all English translation files
- Add RTL-specific translations
- Translate all strings to Hebrew

#### Subtask 2.4.4: Create Translation Hooks

- Create hooks/useTranslation.ts
  - Wrap i18next useTranslation hook
  - Add type safety for translation keys
  - Export useTranslation hook

#### Subtask 2.4.5: Create Language Switcher Component

- Create LanguageSwitcher.tsx component
  - Dropdown to select language (English/Hebrew)
  - Persist language preference to localStorage
  - Update HTML dir attribute for RTL

### Task 2.5: Data Access Layer (libs/shared/data-access)

#### Subtask 2.5.1: Setup Axios HTTP Client

- Create http-client.ts
  - Configure Axios instance with base URL
  - Add request interceptor to attach auth tokens
  - Add response interceptor for error handling
  - Add request/response logging in development
  - Handle token refresh logic
  - Handle network errors gracefully

#### Subtask 2.5.2: Create API Services

- Create services/auth.service.ts
  - Implement login(email, password)
  - Implement loginWithGoogle(token)
  - Implement register(data)
  - Implement logout()
  - Implement refreshToken()
  - Implement resetPassword(email)
  - Implement verifyResetToken(token)
  - Implement updatePassword(token, password)
- Create services/vendor.service.ts
  - Implement getVendors(params)
  - Implement getVendor(id)
  - Implement createVendor(data)
  - Implement updateVendor(id, data)
  - Implement deleteVendor(id)
  - Implement getVendorStores(id)
  - Implement getVendorStats(id)
- Create services/store.service.ts
  - Implement getStores(params)
  - Implement getStore(id)
  - Implement getStoreBySlug(slug)
  - Implement createStore(data)
  - Implement updateStore(id, data)
  - Implement deleteStore(id)
  - Implement getStoreProducts(id, params)
  - Implement uploadStoreLogo(id, file)
  - Implement uploadStoreCover(id, file)
- Create services/product.service.ts
  - Implement getProducts(params)
  - Implement getProduct(id)
  - Implement createProduct(data)
  - Implement updateProduct(id, data)
  - Implement deleteProduct(id)
  - Implement uploadProductImages(id, files)
  - Implement deleteProductImage(id, imageId)
- Create services/user.service.ts
  - Implement getUsers(params)
  - Implement getUser(id)
  - Implement getCurrentUser()
  - Implement updateUser(id, data)
  - Implement updateCurrentUser(data)
  - Implement deleteUser(id)
  - Implement deleteCurrentUser()
  - Implement uploadAvatar(file)
- Create services/category.service.ts
  - Implement getCategories()
  - Implement getCategory(id)
  - Implement createCategory(data)
  - Implement updateCategory(id, data)
  - Implement deleteCategory(id)
- Create services/search.service.ts
  - Implement searchProducts(query, filters)
  - Implement searchStores(query)
  - Implement getSearchSuggestions(query)

#### Subtask 2.5.3: Setup TanStack Query

- Create query-client.ts
  - Configure QueryClient with default options
  - Set stale times for different query types
  - Configure retry logic
  - Set up cache time defaults
  - Configure refetch on window focus
- Create query-keys.ts
  - Define query key factories for all entities
  - Define vendorKeys (all, list, detail, stores, stats)
  - Define storeKeys (all, list, detail, products)
  - Define productKeys (all, list, detail, byStore)
  - Define userKeys (all, list, detail, me)
  - Define categoryKeys (all, list, detail)
  - Define searchKeys (products, stores, suggestions)

#### Subtask 2.5.4: Create TanStack Query Hooks

- Create hooks/useAuth.ts
  - Implement useLogin() mutation
  - Implement useLoginWithGoogle() mutation
  - Implement useRegister() mutation
  - Implement useLogout() mutation
  - Implement useResetPassword() mutation
  - Implement useUpdatePassword() mutation
  - Handle cache invalidation on auth changes
- Create hooks/useVendors.ts
  - Implement useVendors(params) query
  - Implement useVendor(id) query
  - Implement useVendorStores(id) query
  - Implement useVendorStats(id) query
  - Implement useCreateVendor() mutation
  - Implement useUpdateVendor() mutation
  - Implement useDeleteVendor() mutation
  - Implement optimistic updates with setQueryData
  - Handle cache invalidation properly
- Create hooks/useStores.ts
  - Implement useStores(params) query
  - Implement useStore(id) query
  - Implement useStoreBySlug(slug) query
  - Implement useStoreProducts(id, params) query
  - Implement useCreateStore() mutation
  - Implement useUpdateStore() mutation
  - Implement useDeleteStore() mutation
  - Implement useUploadStoreLogo() mutation
  - Implement useUploadStoreCover() mutation
  - Implement optimistic updates with setQueryData
  - Handle cache invalidation properly
- Create hooks/useProducts.ts
  - Implement useProducts(params) query
  - Implement useProduct(id) query
  - Implement useCreateProduct() mutation
  - Implement useUpdateProduct() mutation
  - Implement useDeleteProduct() mutation
  - Implement useUploadProductImages() mutation
  - Implement useDeleteProductImage() mutation
  - Implement optimistic updates with setQueryData
  - Handle cache invalidation properly
- Create hooks/useUsers.ts
  - Implement useUsers(params) query
  - Implement useUser(id) query
  - Implement useCurrentUser() query
  - Implement useUpdateUser() mutation
  - Implement useUpdateCurrentUser() mutation
  - Implement useDeleteUser() mutation
  - Implement useDeleteCurrentUser() mutation
  - Implement useUploadAvatar() mutation
  - Handle cache invalidation properly
- Create hooks/useCategories.ts
  - Implement useCategories() query
  - Implement useCategory(id) query
  - Implement useCreateCategory() mutation
  - Implement useUpdateCategory() mutation
  - Implement useDeleteCategory() mutation
  - Handle cache invalidation properly
- Create hooks/useSearch.ts
  - Implement useSearchProducts(query, filters) query
  - Implement useSearchStores(query) query
  - Implement useSearchSuggestions(query) query

### Task 2.6: UI Component Library (libs/shared/ui)

#### Subtask 2.6.1: Setup shadcn/ui

- Initialize shadcn/ui in the project
- Configure components.json
- Set up Tailwind CSS integration
- Configure path aliases

#### Subtask 2.6.2: Install shadcn/ui Components

- Install Button component
- Install Input component
- Install Label component
- Install Card component
- Install Dialog component
- Install DropdownMenu component
- Install Select component
- Install Checkbox component
- Install RadioGroup component
- Install Textarea component
- Install Toast/Toaster component
- Install Table component
- Install Tabs component
- Install Avatar component
- Install Badge component
- Install Separator component
- Install Skeleton component
- Install Alert component
- Install AlertDialog component
- Install Form components

#### Subtask 2.6.3: Create Custom Components

- Create LoadingSpinner component
- Create ErrorMessage component
- Create EmptyState component
- Create PageHeader component
- Create PageContainer component
- Create DataTable component with sorting and pagination
- Create SearchBar component
- Create FilterPanel component
- Create ImageUpload component with drag & drop
- Create ConfirmDialog component
- Create Breadcrumbs component

#### Subtask 2.6.4: Create Layout Components

- Create Header component
- Create Footer component
- Create Sidebar component
- Create MainLayout component
- Create AuthLayout component

### Task 2.7: Storybook Setup

#### Subtask 2.7.1: Configure Storybook

- Initialize Storybook for the workspace
- Configure Storybook for Vite
- Set up Tailwind CSS in Storybook
- Configure global decorators

#### Subtask 2.7.2: Create Stories for UI Components

- Create stories for all shadcn/ui components
- Create stories for custom components
- Create stories for layout components
- Add interactive controls
- Add documentation

---

## Phase 3: Authentication & Authorization

### Task 3.1: Setup react-auth-kit

#### Subtask 3.1.1: Configure react-auth-kit

- Install react-auth-kit
- Create auth configuration
- Set up AuthProvider
- Configure token storage (cookies)
- Set up refresh token mechanism

#### Subtask 3.1.2: Create Auth Context

- Create AuthContext with user state
- Create useAuth hook
- Implement login function
- Implement logout function
- Implement token refresh function

### Task 3.2: Create Auth Components (libs/features/auth)

#### Subtask 3.2.1: Create Login Components

- Create LoginForm component
  - Email and password fields
  - Form validation with Zod
  - Integration with useLogin hook
  - Error handling
  - Loading states
- Create GoogleOAuthButton component
  - Google OAuth integration
  - Integration with useLoginWithGoogle hook

#### Subtask 3.2.2: Create Registration Components

- Create RegisterForm component
  - Name, email, password, confirmPassword fields
  - Form validation with Zod
  - Integration with useRegister hook
  - Error handling
  - Success redirect

#### Subtask 3.2.3: Create Password Reset Components

- Create ForgotPasswordForm component
  - Email field
  - Integration with useResetPassword hook
- Create ResetPasswordForm component
  - New password and confirm password fields
  - Integration with useUpdatePassword hook

#### Subtask 3.2.4: Create Profile Components

- Create ProfileForm component
  - User profile fields
  - Integration with useUpdateCurrentUser hook
- Create ChangePasswordForm component
  - Current password, new password, confirm password
  - Integration with useUpdatePassword hook

### Task 3.3: Create Auth Guards

#### Subtask 3.3.1: Create Route Guards

- Create RequireAuth component
  - Check if user is authenticated
  - Redirect to login if not authenticated
- Create RequireRole component
  - Check if user has required role
  - Redirect to unauthorized page if not authorized
- Create GuestOnly component
  - Redirect authenticated users away from auth pages

#### Subtask 3.3.2: Create Permission Utilities

- Create hasPermission(user, permission) function
- Create hasRole(user, role) function
- Create canAccess(user, resource) function

---

## Phase 4: Feature Libraries

### Task 4.1: Vendors Feature (libs/features/vendors)

#### Subtask 4.1.1: Create Vendor Components

- Create VendorList component
  - Display vendors in table/grid
  - Search and filters
  - Pagination
  - Integration with useVendors hook
- Create VendorCard component
  - Display vendor information
  - Actions (view, edit, delete)
- Create VendorForm component
  - Create/edit vendor form
  - Form validation with Zod
  - Integration with useCreateVendor/useUpdateVendor hooks
- Create VendorDetail component
  - Display vendor details
  - Display assigned stores
  - Display statistics
- Create DeleteVendorDialog component
  - Confirmation dialog
  - Integration with useDeleteVendor hook

### Task 4.2: Stores Feature (libs/features/stores)

#### Subtask 4.2.1: Create Store Components

- Create StoreList component
  - Display stores in grid
  - Search and filters
  - Pagination
  - Integration with useStores hook
- Create StoreCard component
  - Display store information
  - Store logo and cover image
  - Actions (view, edit, delete)
- Create StoreForm component
  - Create/edit store form with REQUIRED url field
  - Form validation with Zod
  - Image upload for logo and cover
  - Integration with useCreateStore/useUpdateStore hooks
- Create StoreDetail component
  - Display store details
  - Display external store iframe
  - Display store products
- Create DeleteStoreDialog component
  - Confirmation dialog
  - Integration with useDeleteStore hook

### Task 4.3: Products Feature (libs/features/products)

#### Subtask 4.3.1: Create Product Components

- Create ProductList component
  - Display products in grid
  - Search and filters
  - Pagination
  - Integration with useProducts hook
- Create ProductCard component
  - Display product information
  - Product image
  - Price display
  - Actions (view, add to favorites)
- Create ProductGrid component
  - Responsive grid layout
  - Loading states
  - Empty states
- Create ProductForm component
  - Create/edit product form
  - Form validation with Zod
  - Multiple image upload
  - Category selection
  - Store selection
  - Integration with useCreateProduct/useUpdateProduct hooks
- Create ProductDetail component
  - Display product details
  - Image gallery
  - Store information
  - Related products
- Create DeleteProductDialog component
  - Confirmation dialog
  - Integration with useDeleteProduct hook
- Create ProductFilters component
  - Category filter
  - Price range filter
  - Store filter
  - Sort options

### Task 4.4: Users Feature (libs/features/users)

#### Subtask 4.4.1: Create User Components

- Create UserList component
  - Display users in table
  - Search and filters
  - Pagination
  - Integration with useUsers hook
- Create UserCard component
  - Display user information
  - Actions (view, edit, delete)
- Create UserForm component
  - Create/edit user form
  - Form validation with Zod
  - Integration with useUpdateUser hook
- Create UserDetail component
  - Display user details
  - Display user activity
- Create DeleteUserDialog component
  - Confirmation dialog
  - Integration with useDeleteUser hook

### Task 4.5: Search Feature (libs/features/search)

#### Subtask 4.5.1: Create Search Components

- Create SearchBar component
  - Search input with autocomplete
  - Integration with useSearchSuggestions hook
- Create SearchResults component
  - Display search results
  - Filters
  - Pagination
  - Integration with useSearchProducts hook
- Create SearchFilters component
  - Category filter
  - Price range filter
  - Store filter

---

## Phase 5: Domain Libraries

### Task 5.1: Customer Domain (libs/domain/customer)

#### Subtask 5.1.1: Create Customer-Specific Logic

- Create useFavoritesStore (Zustand)
  - Add to favorites
  - Remove from favorites
  - Get favorites list
  - Persist to localStorage
- Create useBrowsingHistory (Zustand)
  - Track viewed products
  - Get browsing history
  - Clear history
  - Persist to localStorage
- Create useCustomerPreferences (Zustand)
  - Language preference
  - Theme preference
  - Persist to localStorage

### Task 5.2: Vendor Domain (libs/domain/vendor)

#### Subtask 5.2.1: Create Vendor-Specific Logic

- Create useVendorDashboard hook
  - Fetch vendor statistics
  - Fetch assigned stores
  - Fetch recent products
- Create useVendorProducts hook
  - Fetch vendor's products
  - Filter by store
  - Filter by category

### Task 5.3: Admin Domain (libs/domain/admin)

#### Subtask 5.3.1: Create Admin-Specific Logic

- Create useAdminDashboard hook
  - Fetch platform statistics
  - Fetch recent activity
  - Fetch top vendors/stores/products
- Create useAdminAnalytics hook
  - Fetch analytics data
  - Generate reports

---

## Phase 6: Application Development

### Task 6.1: Mall App (apps/mall) - Customer-Facing Application

#### Subtask 6.1.1: Setup TanStack Router

- Install TanStack Router in mall app
- Create routes/ directory
- Configure router in main.tsx
- Set up QueryClient provider
- Set up AuthProvider
- Set up i18n provider
- Set up Toaster for notifications

#### Subtask 6.1.2: Create Route Files

- Create \_\_root.tsx (Root layout with MallHeader, MallFooter, Toaster)
- Create index.tsx (Homepage with featured stores and products)
- Create login.tsx (Login page)
- Create register.tsx (Registration page)
- Create forgot-password.tsx (Forgot password page)
- Create reset-password/$token.tsx (Reset password page)
- Create stores/index.tsx (Stores list page)
- Create stores/$storeSlug.tsx (Store detail page with iframe)
- Create products/index.tsx (Products list page)
- Create products/$productId.tsx (Product detail page)
- Create search.tsx (Search results page)
- Create account/index.tsx (Account dashboard - protected)
- Create account/profile.tsx (Profile management - protected)
- Create account/password.tsx (Change password - protected)
- Create account/preferences.tsx (User preferences - protected)
- Create account/favorites.tsx (Favorites list - protected)
- Create account/history.tsx (Browsing history - protected)
- Create account/delete.tsx (Delete account - protected)

#### Subtask 6.1.3: Create Page Components

- Create HomePage component
- Create StoresPage component
- Create StoreDetailPage component
- Create ProductsPage component
- Create ProductDetailPage component
- Create SearchPage component
- Create AccountPage component
- Create ProfilePage component
- Create FavoritesPage component

#### Subtask 6.1.4: Create Mall-Specific Components

- Create MallHeader component
- Create MallFooter component
- Create StoreCard component
- Create ProductCard component
- Create FeaturedStores component
- Create PopularProducts component

#### Subtask 6.1.5: Configure Mall App

- Update vite.config.ts
- Configure environment variables
- Set up proxy for API calls
- Configure build options
- Set up dev server port (4200)

#### Subtask 6.1.6: Add Mall-Specific Styling

- Create styles/globals.css
- Add mall-specific CSS variables
- Configure theme colors
- Add custom styles

### Task 6.2: Vendor App (apps/vendor) - Vendor Dashboard

#### Subtask 6.2.1: Setup TanStack Router

- Install TanStack Router in vendor app
- Create routes/ directory
- Configure router in main.tsx
- Set up QueryClient provider
- Set up AuthProvider
- Set up i18n provider
- Set up Toaster for notifications

#### Subtask 6.2.2: Create Route Files

- Create login.tsx (Login page)
- Create forgot-password.tsx (Forgot password page)
- Create reset-password/$token.tsx (Reset password page)
- Create \_\_root.tsx (Root layout with VendorHeader, VendorSidebar, VendorFooter)
- Create index.tsx (Redirect to dashboard)
- Create dashboard.tsx (Vendor dashboard)
- Create products/index.tsx (Products list)
- Create products/new.tsx (Create product)
- Create products/$productId.tsx (Product detail)
- Create products/$productId/edit.tsx (Edit product)
- Create products/$productId/delete.tsx (Delete product)
- Create stores/index.tsx (Stores list - READ ONLY)
- Create stores/$storeId.tsx (Store detail - READ ONLY)
- Create account/index.tsx (Vendor profile - READ ONLY)
- Create account/profile.tsx (Profile view - READ ONLY)
- Create account/password.tsx (Change password - ONLY EDITABLE)
- Create account/preferences.tsx (Preferences)

#### Subtask 6.2.3: Create Page Components

- Create DashboardPage component
- Create ProductsPage component
- Create CreateProductPage component
- Create ProductDetailPage component
- Create EditProductPage component
- Create StoresPage component (READ ONLY)
- Create StoreDetailPage component (READ ONLY)
- Create ProfilePage component (READ ONLY)
- Create ChangePasswordPage component

#### Subtask 6.2.4: Create Vendor-Specific Components

- Create VendorHeader component
- Create VendorSidebar component
- Create VendorFooter component
- Create StatCard component
- Create RecentProducts component
- Create VendorProductCard component

#### Subtask 6.2.5: Configure Vendor App

- Update vite.config.ts
- Configure environment variables
- Set up proxy for API calls
- Configure build options
- Set up dev server port (4201)

#### Subtask 6.2.6: Add Vendor-Specific Styling

- Create styles/globals.css
- Add vendor-specific CSS variables
- Configure theme colors
- Add custom styles

### Task 6.3: Admin App (apps/admin) - Admin Control Panel

#### Subtask 6.3.1: Setup TanStack Router

- Install TanStack Router in admin app
- Create routes/ directory
- Configure router in main.tsx
- Set up QueryClient provider
- Set up AuthProvider
- Set up i18n provider
- Set up Toaster for notifications

#### Subtask 6.3.2: Create Route Files

- Create login.tsx (Login page)
- Create forgot-password.tsx (Forgot password page)
- Create reset-password/$token.tsx (Reset password page)
- Create \_\_root.tsx (Root layout with AdminHeader, AdminSidebar, AdminFooter)
- Create index.tsx (Redirect to dashboard)
- Create dashboard.tsx (Admin dashboard with platform statistics)
- Create vendors/index.tsx (Vendors list with full CRUD)
- Create vendors/new.tsx (Create vendor)
- Create vendors/$vendorId.tsx (Vendor detail)
- Create vendors/$vendorId/edit.tsx (Edit vendor)
- Create vendors/$vendorId/delete.tsx (Delete vendor)
- Create stores/index.tsx (Stores list with full CRUD)
- Create stores/new.tsx (Create store with REQUIRED url field)
- Create stores/$storeId.tsx (Store detail)
- Create stores/$storeId/edit.tsx (Edit store)
- Create stores/$storeId/delete.tsx (Delete store)
- Create users/index.tsx (Users list with full CRUD)
- Create users/$userId.tsx (User detail)
- Create users/$userId/edit.tsx (Edit user)
- Create users/$userId/delete.tsx (Delete user)
- Create products/index.tsx (Products list - READ ONLY)
- Create products/$productId.tsx (Product detail - READ ONLY)
- Create analytics.tsx (Platform analytics and reports)
- Create audit-logs.tsx (Audit logs)

#### Subtask 6.3.3: Create Page Components

- Create DashboardPage component
- Create VendorsPage component
- Create CreateVendorPage component
- Create VendorDetailPage component
- Create EditVendorPage component
- Create StoresPage component
- Create CreateStorePage component
- Create StoreDetailPage component
- Create EditStorePage component
- Create UsersPage component
- Create UserDetailPage component
- Create EditUserPage component
- Create ProductsPage component (READ ONLY)
- Create ProductDetailPage component (READ ONLY)
- Create AnalyticsPage component
- Create AuditLogsPage component

#### Subtask 6.3.4: Create Admin-Specific Components

- Create AdminHeader component
- Create AdminSidebar component
- Create AdminFooter component
- Create StatCard component
- Create PlatformStats component
- Create RecentActivity component
- Create TopVendors component
- Create TopStores component
- Create TopProducts component
- Create AnalyticsChart component

#### Subtask 6.3.5: Configure Admin App

- Update vite.config.ts
- Configure environment variables
- Set up proxy for API calls
- Configure build options
- Set up dev server port (4202)

#### Subtask 6.3.6: Add Admin-Specific Styling

- Create styles/globals.css
- Add admin-specific CSS variables
- Configure theme colors
- Add custom styles

---

## Phase 7: Backend API Development

### Task 7.1: Backend Infrastructure Setup

#### Subtask 7.1.1: Setup NestJS Microservices Architecture

- Create apps/backend directory structure
- Generate API Gateway (Port 3000)
- Generate Vendor Service (Port 3001)
- Generate User Service (Port 3002)
- Generate Store Service (Port 3003)
- Generate Product Service (Port 3004)
- Generate Auth Service (Port 3005)
- Generate Admin Service (Port 3006)

#### Subtask 7.1.2: Setup RabbitMQ Message Broker

- Install RabbitMQ dependencies (@nestjs/microservices, amqplib)
- Configure RabbitMQ connection
- Set up message broker module
- Define event patterns
- Create event publishers
- Create event subscribers

#### Subtask 7.1.3: Setup Redis Cache Layer

- Install Redis dependencies (ioredis)
- Create Redis module
- Create Redis service with cache operations
- Configure Redis connection
- Set up cache decorators
- Implement cache invalidation strategies

#### Subtask 7.1.4: Setup Database

- Install Prisma ORM
- Configure PostgreSQL connection
- Create database schema for each service
  - vendor_db (vendors table)
  - user_db (users table)
  - store_db (stores table with REQUIRED url field)
  - product_db (products, categories tables)
  - auth_db (refresh_tokens, sessions tables)
  - admin_db (audit_logs, statistics tables)
- Generate Prisma clients
- Create database migrations

### Task 7.2: API Gateway (Port 3000)

#### Subtask 7.2.1: Setup API Gateway

- Configure Express adapter
- Set up routing to microservices
- Implement JWT authentication middleware
- Implement rate limiting with Redis
- Implement response caching with Redis
- Set up CORS configuration
- Configure Swagger/OpenAPI documentation

#### Subtask 7.2.2: Create Gateway Routes

- Route /api/auth/\* to Auth Service
- Route /api/vendors/\* to Vendor Service
- Route /api/users/\* to User Service
- Route /api/stores/\* to Store Service
- Route /api/products/\* to Product Service
- Route /api/categories/\* to Product Service
- Route /api/search/\* to Product Service
- Route /api/admin/\* to Admin Service

### Task 7.3: Auth Service (Port 3005)

#### Subtask 7.3.1: Implement Authentication

- Create login endpoint (POST /auth/login)
- Create Google OAuth endpoint (POST /auth/google)
- Create register endpoint (POST /auth/register)
- Create logout endpoint (POST /auth/logout)
- Create refresh token endpoint (POST /auth/refresh)
- Create password reset endpoint (POST /auth/reset-password)
- Create verify reset token endpoint (GET /auth/verify-reset/:token)
- Create update password endpoint (POST /auth/update-password)
- Create get current user endpoint (GET /auth/me)

#### Subtask 7.3.2: Implement JWT Token Management

- Generate access tokens (24h expiry)
- Generate refresh tokens (7d expiry)
- Store refresh tokens in Redis
- Implement token validation
- Implement token refresh logic
- Handle token expiration

#### Subtask 7.3.3: Implement Session Management with Redis

- Store active sessions in Redis (24h TTL)
- Validate sessions on each request
- Implement session cleanup
- Track login attempts in Redis
- Implement account lockout after failed attempts

#### Subtask 7.3.4: Implement Password Reset with Redis

- Generate password reset tokens
- Store reset tokens in Redis (1h TTL)
- Send password reset emails
- Validate reset tokens
- Update passwords

### Task 7.4: Vendor Service (Port 3001)

#### Subtask 7.4.1: Implement Vendor CRUD

- Create vendor endpoint (POST /vendors) - Admin only
- Get vendors list endpoint (GET /vendors) - Admin only
- Get vendor detail endpoint (GET /vendors/:id) - Admin/Vendor self
- Update vendor endpoint (PUT /vendors/:id) - Admin only
- Update vendor password endpoint (PUT /vendors/me/password) - Vendor self only
- Delete vendor endpoint (DELETE /vendors/:id) - Admin only
- Get vendor stores endpoint (GET /vendors/:id/stores)
- Get vendor statistics endpoint (GET /vendors/:id/stats)

#### Subtask 7.4.2: Implement Vendor Events

- Publish vendor.created event to RabbitMQ
- Publish vendor.updated event to RabbitMQ
- Publish vendor.deleted event to RabbitMQ

#### Subtask 7.4.3: Implement Redis Caching

- Cache vendor profiles (30 min TTL)
- Invalidate cache on vendor updates

### Task 7.5: User Service (Port 3002)

#### Subtask 7.5.1: Implement User CRUD

- Create user endpoint (POST /users) - Self-registration or Admin
- Get users list endpoint (GET /users) - Admin only
- Get user detail endpoint (GET /users/:id) - Admin or self
- Get current user endpoint (GET /users/me) - Self
- Update user endpoint (PUT /users/:id) - Admin or self
- Update current user endpoint (PUT /users/me) - Self
- Delete user endpoint (DELETE /users/:id) - Admin or self
- Delete current user endpoint (DELETE /users/me) - Self
- Upload avatar endpoint (POST /users/me/avatar) - Self

#### Subtask 7.5.2: Implement User Events

- Publish user.created event to RabbitMQ
- Publish user.updated event to RabbitMQ
- Publish user.deleted event to RabbitMQ

#### Subtask 7.5.3: Implement Redis Caching

- Cache user profiles (30 min TTL)
- Invalidate cache on user updates

### Task 7.6: Store Service (Port 3003)

#### Subtask 7.6.1: Implement Store CRUD

- Create store endpoint (POST /stores) - Admin only, url field REQUIRED
- Get stores list endpoint (GET /stores) - Public
- Get store detail endpoint (GET /stores/:id) - Public
- Get store by slug endpoint (GET /stores/slug/:slug) - Public
- Update store endpoint (PUT /stores/:id) - Admin only
- Delete store endpoint (DELETE /stores/:id) - Admin only
- Upload store logo endpoint (POST /stores/:id/logo) - Admin only
- Upload store cover endpoint (POST /stores/:id/cover) - Admin only
- Get store products endpoint (GET /stores/:id/products) - Public
- Get store statistics endpoint (GET /stores/:id/stats) - Admin only

#### Subtask 7.6.2: Implement Store Events

- Publish store.created event to RabbitMQ
- Publish store.updated event to RabbitMQ
- Publish store.deleted event to RabbitMQ
- Subscribe to vendor.deleted event (cascade delete stores)
- Subscribe to product.created event (update product count)
- Subscribe to product.deleted event (update product count)

#### Subtask 7.6.3: Implement Redis Caching

- Cache individual stores (30 min TTL)
- Cache store lists (30 min TTL)
- Cache store product counts (15 min TTL)
- Cache store statistics (10 min TTL)
- Invalidate cache on store updates

### Task 7.7: Product Service (Port 3004)

#### Subtask 7.7.1: Implement Product CRUD

- Create product endpoint (POST /products) - Vendor only
- Get products list endpoint (GET /products) - Public with filters
- Get product detail endpoint (GET /products/:id) - Public
- Update product endpoint (PUT /products/:id) - Vendor only (own products)
- Delete product endpoint (DELETE /products/:id) - Vendor only (own products)
- Upload product images endpoint (POST /products/:id/images) - Vendor only
- Delete product image endpoint (DELETE /products/:id/images/:imageId) - Vendor only

#### Subtask 7.7.2: Implement Category CRUD

- Create category endpoint (POST /categories) - Admin only
- Get categories list endpoint (GET /categories) - Public
- Get category detail endpoint (GET /categories/:id) - Public
- Update category endpoint (PUT /categories/:id) - Admin only
- Delete category endpoint (DELETE /categories/:id) - Admin only

#### Subtask 7.7.3: Implement Search

- Search products endpoint (GET /search/products) - Public
- Get search suggestions endpoint (GET /search/suggestions) - Public

#### Subtask 7.7.4: Implement Product Events

- Publish product.created event to RabbitMQ
- Publish product.updated event to RabbitMQ
- Publish product.deleted event to RabbitMQ
- Publish product.viewed event to RabbitMQ
- Subscribe to store.deleted event (cascade delete products)
- Subscribe to vendor.deleted event (cascade delete products)

#### Subtask 7.7.5: Implement Redis Caching

- Cache individual products (15 min TTL)
- Cache product lists (10 min TTL)
- Cache search results (5 min TTL)
- Cache search suggestions (1 hour TTL)
- Cache category tree (1 hour TTL)
- Track product view counts in Redis
- Maintain popular products sorted set
- Invalidate cache on product updates

### Task 7.8: Admin Service (Port 3006)

#### Subtask 7.8.1: Implement Admin Statistics

- Get dashboard statistics endpoint (GET /admin/dashboard) - Admin only
- Get platform statistics endpoint (GET /admin/stats) - Admin only
- Get audit logs endpoint (GET /admin/audit-logs) - Admin only
- Generate reports endpoint (GET /admin/reports) - Admin only
- System health check endpoint (GET /admin/health) - Admin only

#### Subtask 7.8.2: Implement Admin Events

- Publish admin.action.logged event to RabbitMQ
- Subscribe to vendor.created event (update statistics)
- Subscribe to vendor.deleted event (update statistics)
- Subscribe to user.created event (update statistics)
- Subscribe to user.deleted event (update statistics)
- Subscribe to store.created event (update statistics)
- Subscribe to store.deleted event (update statistics)
- Subscribe to product.created event (update statistics)
- Subscribe to product.deleted event (update statistics)

#### Subtask 7.8.3: Implement Redis Caching

- Cache dashboard statistics (10 min TTL)
- Cache reports (1 hour TTL)
- Buffer audit logs before batch write to PostgreSQL
- Track real-time metrics

### Task 7.9: File Upload & Storage

#### Subtask 7.9.1: Setup File Storage

- Choose storage provider (AWS S3 or Cloudinary)
- Configure storage credentials
- Create storage service
- Implement file upload
- Implement file deletion
- Implement image optimization

#### Subtask 7.9.2: Implement Upload Endpoints

- Upload product images
- Upload store logo
- Upload store cover
- Upload user avatar
- Validate file types and sizes
- Generate thumbnails

### Task 7.10: Error Handling & Logging

#### Subtask 7.10.1: Implement Error Handling

- Create global exception filter
- Handle validation errors
- Handle authentication errors
- Handle authorization errors
- Handle not found errors
- Handle database errors
- Return consistent error responses

#### Subtask 7.10.2: Implement Logging

- Set up Winston logger
- Log all requests
- Log all errors
- Log database queries
- Log RabbitMQ events
- Log Redis operations
- Configure log levels
- Set up log rotation

---

## Phase 8: Testing with Playwright MCP

> **Note**: All testing will be performed using Playwright with MCP (Model Context Protocol) integration.
> Playwright MCP handles E2E testing, integration testing with test containers, and visual regression testing.

### Task 8.1: Setup Playwright MCP Testing Infrastructure

#### Subtask 8.1.1: Configure Playwright MCP

- Install Playwright MCP dependencies
- Configure Playwright MCP connection
- Set up test environment configuration
- Configure browser contexts (Chromium, Firefox, WebKit)
- Set up parallel test execution
- Configure test timeouts and retries

#### Subtask 8.1.2: Setup Test Containers for Integration Testing

- Install Testcontainers dependencies
- Configure Docker for test containers
- Create test container configurations:
  - PostgreSQL test containers (6 databases)
  - Redis test container
  - RabbitMQ test container
- Set up container lifecycle management (start before tests, cleanup after)
- Configure container networking
- Set up container health checks

#### Subtask 8.1.3: Create Test Data Fixtures

- Create seed data for test database
  - Test vendors
  - Test stores (with valid external URLs)
  - Test products
  - Test users (customers)
  - Test admin accounts
- Create data cleanup scripts
- Set up database reset between test runs
- Create test data factories for dynamic data generation

#### Subtask 8.1.4: Setup Visual Regression Testing

- Configure Playwright visual comparison
- Set up screenshot storage
- Create baseline screenshots for all pages
- Configure visual diff thresholds
- Set up visual regression reporting
- Configure screenshot comparison options (full page, specific elements)

### Task 8.2: Playwright MCP Tests - Mall App (Customer)

#### Subtask 8.2.1: Authentication & Registration Tests

- Test user registration flow (complete form, validation, success)
- Test user login flow (valid credentials, invalid credentials, error handling)
- Test Google OAuth login flow
- Test logout functionality
- Test password reset flow (request, email, reset, login)
- Test session persistence
- Test redirect after login

#### Subtask 8.2.2: Store Browsing Tests

- Test stores list page (display, pagination, loading states)
- Test store search functionality
- Test store filtering
- Test store card interactions
- Test store detail page (information, external iframe display)
- Test navigation between stores

#### Subtask 8.2.3: Product Browsing Tests

- Test products list page (display, pagination, loading states)
- Test product search functionality
- Test product filtering (category, price range, store)
- Test product sorting
- Test product card interactions
- Test product detail page (images, information, store link)
- Test related products display
- Test navigation between products

#### Subtask 8.2.4: Search Functionality Tests

- Test global search bar
- Test search suggestions/autocomplete
- Test search results page
- Test search with filters
- Test empty search results
- Test search pagination

#### Subtask 8.2.5: Customer Account Tests

- Test account dashboard access (protected route)
- Test profile viewing and editing
- Test password change functionality
- Test preferences management (language, theme)
- Test favorites functionality (add, remove, view list)
- Test browsing history (view, clear)
- Test account deletion flow (confirmation, success)

#### Subtask 8.2.6: Responsive & Accessibility Tests

- Test mobile responsiveness (all pages)
- Test tablet responsiveness (all pages)
- Test desktop responsiveness (all pages)
- Test RTL layout (Hebrew language)
- Test keyboard navigation
- Test screen reader compatibility

#### Subtask 8.2.7: Visual Regression Tests - Mall App

- Capture and compare screenshots for:
  - Homepage (light/dark mode)
  - Stores list page (light/dark mode)
  - Store detail page with iframe (light/dark mode)
  - Products list page (light/dark mode)
  - Product detail page (light/dark mode)
  - Search results page (light/dark mode)
  - Account dashboard (light/dark mode)
  - Profile page (light/dark mode)
  - Favorites page (light/dark mode)
- Test responsive layouts (mobile, tablet, desktop)
- Test RTL layout screenshots (Hebrew)
- Detect visual regressions in UI components
- Compare against baseline screenshots

### Task 8.3: Playwright MCP Tests - Vendor App

#### Subtask 8.3.1: Vendor Authentication Tests

- Test vendor login flow
- Test invalid credentials handling
- Test password reset flow
- Test session persistence
- Test logout functionality

#### Subtask 8.3.2: Vendor Dashboard Tests

- Test dashboard access (protected route, vendor role required)
- Test statistics display (product count, stores, metrics)
- Test recent products display
- Test navigation from dashboard

#### Subtask 8.3.3: Product Management Tests

- Test products list page (vendor's products only)
- Test product search and filtering
- Test product creation flow
  - Form validation
  - Image upload (single and multiple)
  - Category selection
  - Store selection
  - Success notification
  - Redirect to products list
- Test product editing flow
  - Load existing data
  - Update fields
  - Update images
  - Success notification
- Test product deletion flow
  - Confirmation dialog
  - Success notification
  - Product removed from list
- Test product detail view
- Test ownership validation (cannot edit other vendors' products)

#### Subtask 8.3.4: Store Viewing Tests (READ ONLY)

- Test stores list page (assigned stores only)
- Test store detail page (read-only, no edit buttons)
- Test store products display
- Test navigation between stores

#### Subtask 8.3.5: Vendor Account Tests

- Test profile viewing (read-only fields: email, name, company, phone)
- Test password change functionality (ONLY editable field)
- Test preferences management (language, theme)
- Test that profile editing is disabled (except password)

#### Subtask 8.3.6: Visual Regression Tests - Vendor App

- Capture and compare screenshots for:
  - Vendor dashboard (light/dark mode)
  - Products list page (light/dark mode)
  - Create product page (light/dark mode)
  - Edit product page (light/dark mode)
  - Product detail page (light/dark mode)
  - Stores list page (light/dark mode)
  - Store detail page (light/dark mode)
  - Profile page (light/dark mode)
- Test responsive layouts (mobile, tablet, desktop)
- Test RTL layout screenshots (Hebrew)
- Detect visual regressions in dashboard components
- Compare against baseline screenshots

### Task 8.4: Playwright MCP Tests - Admin App

#### Subtask 8.4.1: Admin Authentication Tests

- Test admin login flow
- Test invalid credentials handling
- Test session persistence
- Test logout functionality

#### Subtask 8.4.2: Admin Dashboard Tests

- Test dashboard access (protected route, admin role required)
- Test platform statistics display
- Test recent activity display
- Test top vendors/stores/products display
- Test navigation from dashboard

#### Subtask 8.4.3: Vendor Management Tests (Full CRUD)

- Test vendors list page
- Test vendor search and filtering
- Test vendor creation flow
  - Form validation
  - Email uniqueness check
  - Success notification
  - Email sent to vendor
- Test vendor editing flow
  - Load existing data
  - Update all fields
  - Success notification
- Test vendor deletion flow
  - Confirmation dialog
  - Cascade effects (stores, products)
  - Success notification
- Test vendor detail view
- Test vendor statistics

#### Subtask 8.4.4: Store Management Tests (Full CRUD)

- Test stores list page
- Test store search and filtering
- Test store creation flow
  - Form validation
  - REQUIRED url field validation
  - Vendor assignment
  - Logo and cover image upload
  - Success notification
- Test store editing flow
  - Load existing data
  - Update all fields including url
  - Update images
  - Success notification
- Test store deletion flow
  - Confirmation dialog
  - Cascade effects (products)
  - Success notification
- Test store detail view

#### Subtask 8.4.5: User Management Tests (Full CRUD)

- Test users list page
- Test user search and filtering
- Test user editing flow
  - Load existing data
  - Update fields
  - Success notification
- Test user deletion flow
  - Confirmation dialog
  - Success notification
- Test user detail view

#### Subtask 8.4.6: Product Viewing Tests (READ ONLY)

- Test products list page (all products)
- Test product search and filtering
- Test product detail view (read-only, no edit buttons)
- Test that product editing is disabled

#### Subtask 8.4.7: Analytics & Audit Tests

- Test analytics page
- Test reports generation
- Test audit logs page
- Test audit log filtering
- Test audit log search

#### Subtask 8.4.8: Visual Regression Tests - Admin App

- Capture and compare screenshots for:
  - Admin dashboard (light/dark mode)
  - Vendors list page (light/dark mode)
  - Create vendor page (light/dark mode)
  - Edit vendor page (light/dark mode)
  - Vendor detail page (light/dark mode)
  - Stores list page (light/dark mode)
  - Create store page (light/dark mode)
  - Edit store page (light/dark mode)
  - Store detail page (light/dark mode)
  - Users list page (light/dark mode)
  - Edit user page (light/dark mode)
  - Products list page (light/dark mode)
  - Analytics page (light/dark mode)
  - Audit logs page (light/dark mode)
- Test responsive layouts (mobile, tablet, desktop)
- Test RTL layout screenshots (Hebrew)
- Detect visual regressions in admin components
- Compare against baseline screenshots

### Task 8.5: Playwright MCP Integration Tests - Backend with Test Containers

> **Note**: These tests use Testcontainers to spin up isolated PostgreSQL, Redis, and RabbitMQ instances for integration testing.

#### Subtask 8.5.1: Integration Test Setup

- Start test containers before test suite
  - PostgreSQL containers (6 databases)
  - Redis container
  - RabbitMQ container
- Run database migrations on test containers
- Seed test data
- Configure services to connect to test containers
- Clean up containers after test suite

#### Subtask 8.5.2: API Gateway Integration Tests

- Test routing to all microservices (with test containers)
- Test JWT authentication middleware
- Test rate limiting (Redis-based with test container)
- Test response caching (Redis-based with test container)
- Test CORS configuration
- Test error handling
- Verify container connectivity

#### Subtask 8.5.3: Auth Service Integration Tests

- Test login endpoint (all user types) with test database
- Test registration endpoint with test database
- Test token refresh endpoint
- Test password reset flow with test database
- Test session management (Redis test container)
- Test login attempt tracking (Redis test container)
- Test account lockout
- Verify data persistence in test database

#### Subtask 8.5.4: Vendor Service Integration Tests

- Test vendor CRUD endpoints with test database
- Test vendor events (RabbitMQ test container)
- Test vendor caching (Redis test container)
- Test authorization rules
- Verify cascade operations in test database

#### Subtask 8.5.5: User Service Integration Tests

- Test user CRUD endpoints with test database
- Test user events (RabbitMQ test container)
- Test user caching (Redis test container)
- Test authorization rules
- Verify data persistence in test database

#### Subtask 8.5.6: Store Service Integration Tests

- Test store CRUD endpoints (url field required) with test database
- Test store events (RabbitMQ test container)
- Test store caching (Redis test container)
- Test cascade operations with test database
- Test authorization rules
- Verify relationships with vendors and products

#### Subtask 8.5.7: Product Service Integration Tests

- Test product CRUD endpoints with test database
- Test category CRUD endpoints with test database
- Test search endpoints with test database
- Test product events (RabbitMQ test container)
- Test product caching (Redis test container)
- Test search caching (Redis test container)
- Test authorization rules
- Verify relationships with stores and categories

#### Subtask 8.5.8: Admin Service Integration Tests

- Test statistics endpoints with test database
- Test audit log endpoints with test database
- Test admin events (RabbitMQ test container)
- Test statistics caching (Redis test container)
- Verify aggregated data from multiple services

#### Subtask 8.5.9: Cross-Service Integration Tests

- Test event flow between services (RabbitMQ test container)
- Test cascade delete operations across services
- Test data consistency across services
- Test transaction rollback scenarios
- Test service-to-service communication
- Verify Redis cache invalidation across services

### Task 8.6: Playwright MCP Tests - Cross-Cutting Concerns

#### Subtask 8.6.1: Multi-Language Tests

- Test language switching (English/Hebrew)
- Test RTL layout for Hebrew
- Test translations display correctly
- Test language persistence

#### Subtask 8.6.2: Theme Tests

- Test light/dark mode switching
- Test theme persistence
- Test theme consistency across pages

#### Subtask 8.6.3: Error Handling Tests

- Test 404 pages
- Test 500 error pages
- Test network error handling
- Test validation error display
- Test toast notifications

#### Subtask 8.6.4: Performance Tests

- Test page load times
- Test API response times
- Test Redis cache hit rates
- Test image loading optimization
- Test lazy loading

#### Subtask 8.6.5: Security Tests

- Test unauthorized access attempts
- Test role-based access control
- Test CSRF protection
- Test XSS prevention
- Test SQL injection prevention
- Test rate limiting enforcement

### Task 8.7: Playwright MCP Test Reporting

#### Subtask 8.7.1: Configure Test Reporting

- Set up Playwright HTML reporter
- Configure test results output
- Set up screenshot capture on failure
- Set up video recording for failed tests
- Configure trace collection

#### Subtask 8.7.2: CI/CD Integration

- Integrate Playwright MCP tests in GitHub Actions
- Run tests on pull requests
- Run tests before deployment
- Generate and publish test reports
- Set up test failure notifications

---

## Phase 9: Deployment & DevOps

### Task 9.1: CI/CD Pipeline

#### Subtask 9.1.1: Setup GitHub Actions

- Create .github/workflows/ci.yml
  - Run linting on pull requests
  - Run type checking
  - Run Playwright MCP tests
  - Generate test reports
  - Comment PR with test results
  - Block merge if tests fail
- Create .github/workflows/deploy-staging.yml
  - Trigger on push to main branch
  - Build all apps
  - Run Playwright MCP tests (full suite)
  - Deploy to staging environment
  - Run smoke tests with Playwright MCP
  - Notify team
- Create .github/workflows/deploy-production.yml
  - Trigger on release tag
  - Build all apps with production config
  - Run Playwright MCP tests (full suite)
  - Deploy to production
  - Run smoke tests with Playwright MCP
  - Create deployment notification
  - Rollback mechanism if health checks fail

#### Subtask 9.1.2: Setup Pre-commit Hooks

- Install Husky
- Configure pre-commit hook
  - Run ESLint on staged files
  - Run Prettier on staged files
  - Run type checking
  - Block commit if errors
- Configure commit-msg hook
  - Enforce conventional commits
  - Validate commit message format

### Task 9.2: Docker Configuration

#### Subtask 9.2.1: Create Dockerfiles

- Create apps/mall/Dockerfile (multi-stage build with Nginx)
- Create apps/vendor/Dockerfile (multi-stage build with Nginx)
- Create apps/admin/Dockerfile (multi-stage build with Nginx)
- Create apps/backend/api-gateway/Dockerfile
- Create apps/backend/vendor-service/Dockerfile
- Create apps/backend/user-service/Dockerfile
- Create apps/backend/store-service/Dockerfile
- Create apps/backend/product-service/Dockerfile
- Create apps/backend/auth-service/Dockerfile
- Create apps/backend/admin-service/Dockerfile

#### Subtask 9.2.2: Create Docker Compose

- Create docker-compose.yml for development
  - Frontend services (Mall, Vendor, Admin)
  - Backend microservices (7 services)
  - RabbitMQ service
  - Redis service
  - PostgreSQL databases (6 databases)
  - Volume mounts for hot reload
  - Network configuration
  - Health checks
- Create docker-compose.prod.yml for production
  - Production-optimized services
  - Environment variables
  - Health checks
  - Restart policies
  - Resource limits
  - Logging configuration

### Task 9.3: Environment Configuration

#### Subtask 9.3.1: Setup Environment Variables

- Create .env.development for local development
- Create .env.staging for staging
- Create .env.production for production
- Document all required environment variables
- Set up secrets management

### Task 9.4: Hosting & Infrastructure

#### Subtask 9.4.1: Frontend Hosting (Vercel)

- Deploy Mall app to Vercel (mall.yourplatform.com)
- Deploy Vendor app to Vercel (vendor.yourplatform.com)
- Deploy Admin app to Vercel (admin.yourplatform.com)
- Configure custom domains
- Set up environment variables
- Configure SSL certificates

#### Subtask 9.4.2: Backend Hosting (Railway)

- Deploy API Gateway to Railway (api.yourplatform.com)
- Deploy all microservices to Railway
- Set up PostgreSQL databases
- Set up Redis instance
- Set up RabbitMQ instance
- Configure environment variables
- Set up custom domain

#### Subtask 9.4.3: Database Hosting

- Set up PostgreSQL databases (6 databases)
- Configure connection pooling
- Set up automated backups
- Configure read replicas (if needed)
- Set up monitoring

#### Subtask 9.4.4: File Storage

- Set up AWS S3 or Cloudinary
- Create storage buckets
- Configure CORS
- Set up CDN
- Configure access policies

### Task 9.5: Monitoring & Logging

#### Subtask 9.5.1: Setup Application Monitoring

- Install Sentry SDK in all apps
- Configure error tracking
- Set up performance monitoring
- Configure alerts

#### Subtask 9.5.2: Setup Backend Monitoring

- Install monitoring tools
- Track API response times
- Monitor database queries
- Set up alerts for errors
- Track resource usage
- Monitor Redis metrics (hit rate, memory, connections)
- Monitor RabbitMQ metrics (queue depth, message rate)

#### Subtask 9.5.3: Setup Logging

- Configure structured logging
- Set up log aggregation
- Configure log retention
- Set up log search
- Create log dashboards

#### Subtask 9.5.4: Setup Analytics

- Install Google Analytics or Plausible in Mall app
- Track page views
- Track user interactions
- Set up conversion tracking

### Task 9.6: Performance Optimization

#### Subtask 9.6.1: Frontend Optimization

- Enable code splitting
- Implement lazy loading
- Optimize images (WebP format, responsive images, lazy loading, CDN)
- Optimize bundle size (analyze, remove unused dependencies, tree-shake)
- Implement caching strategies (service worker, cache headers)

#### Subtask 9.6.2: Backend Optimization

- Implement database indexing
- Implement Redis caching (products, stores, categories, search results)
- Optimize API responses (gzip compression, pagination, field selection)
- Implement rate limiting

### Task 9.7: Security Hardening

#### Subtask 9.7.1: Frontend Security

- Implement Content Security Policy (CSP)
- Enable HTTPS only
- Implement CORS properly
- Sanitize user inputs
- Prevent XSS attacks
- Implement CSRF protection

#### Subtask 9.7.2: Backend Security

- Use Helmet.js for security headers
- Implement rate limiting with Redis
- Validate all inputs
- Use parameterized queries
- Implement SQL injection prevention
- Hash passwords with bcrypt
- Use secure JWT tokens
- Implement token expiration
- Set up HTTPS
- Configure CORS properly

#### Subtask 9.7.3: Database Security

- Use strong passwords
- Restrict database access
- Enable SSL connections
- Implement row-level security
- Regular security audits
- Keep database updated

---

## Phase 10: Documentation & Handoff

### Task 10.1: Code Documentation

#### Subtask 10.1.1: Document Shared Libraries

- Add JSDoc comments to all utility functions
- Document all Zod schemas
- Document API service functions
- Document TanStack Query hooks
- Add usage examples

#### Subtask 10.1.2: Document Feature Libraries

- Document all components with JSDoc
- Add prop type documentation
- Document component usage
- Add examples in Storybook

#### Subtask 10.1.3: Document Backend API

- Create API documentation with Swagger/OpenAPI
- Document all endpoints
- Document request/response formats
- Document authentication
- Document error codes
- Add example requests

### Task 10.2: User Documentation

#### Subtask 10.2.1: Create User Guides

- Create Mall app user guide
  - How to register
  - How to browse stores
  - How to search products
  - How to manage favorites
  - How to manage account
- Create Vendor app user guide
  - How to log in
  - How to add products
  - How to edit products
  - How to view statistics
- Create Admin app user guide
  - How to manage vendors
  - How to manage stores
  - How to manage users
  - How to view analytics
  - How to moderate content

#### Subtask 10.2.2: Create Video Tutorials

- Record Mall app walkthrough
- Record Vendor app walkthrough
- Record Admin app walkthrough

### Task 10.3: Developer Documentation

#### Subtask 10.3.1: Create README Files

- Update root README.md
  - Project overview
  - Tech stack
  - Getting started
  - Available scripts
  - Project structure
  - Contributing guidelines
- Create README.md for each app
  - App-specific setup
  - Environment variables
  - Build instructions
  - Deployment instructions
- Create README.md for each library
  - Library purpose
  - Installation
  - Usage examples
  - API reference

#### Subtask 10.3.2: Create Architecture Documentation

- Create docs/ARCHITECTURE.md
  - System architecture diagram
  - Data flow diagrams
  - Component hierarchy
  - Library dependencies
  - Design decisions
- Create docs/DATABASE.md
  - Database schema
  - Entity relationships
  - Indexes
  - Migrations
- Create docs/API.md
  - API architecture
  - Authentication flow
  - Authorization rules
  - Rate limiting
  - Error handling
- Create docs/MICROSERVICES.md
  - Microservices architecture
  - Service responsibilities
  - Inter-service communication
  - RabbitMQ events
  - Redis caching strategy

#### Subtask 10.3.3: Create Development Guides

- Create docs/DEVELOPMENT.md
  - Development setup
  - Running locally
  - Running tests
  - Debugging tips
  - Common issues
- Create docs/CONTRIBUTING.md
  - Code style guide
  - Git workflow
  - Pull request process
  - Code review guidelines
- Create docs/TESTING.md
  - Playwright MCP testing strategy
  - Running Playwright MCP tests
  - Writing new test scenarios
  - Test reporting and debugging
- Create docs/DEPLOYMENT.md
  - Deployment strategy
  - Environment setup
  - CI/CD pipeline
  - Rollback procedures

### Task 10.4: Project Handoff

#### Subtask 10.4.1: Create Handoff Documentation

- Create HANDOFF.md
  - Project summary
  - Key features
  - Technology stack
  - Architecture overview
  - Deployment information
  - Access credentials (secure)
  - Support contacts
  - Known issues
  - Future enhancements

#### Subtask 10.4.2: Conduct Knowledge Transfer

- Schedule handoff meetings
- Walk through codebase
- Demonstrate all features
- Explain architecture decisions
- Review deployment process
- Answer questions

#### Subtask 10.4.3: Create Maintenance Guide

- Document backup procedures
- Document monitoring procedures
- Document incident response
- Document scaling procedures
- Document update procedures

---

## 🎯 Summary

This master implementation tasks file contains **ALL** tasks needed to build the complete e-commerce platform:

- **Phase 1**: Foundation & Infrastructure (Dependencies, Workspace Setup)
- **Phase 2**: Shared Infrastructure (Types, Utils, Config, i18n, Data Access, UI Components)
- **Phase 3**: Authentication & Authorization (react-auth-kit, Auth Components, Guards)
- **Phase 4**: Feature Libraries (Vendors, Stores, Products, Users, Search)
- **Phase 5**: Domain Libraries (Customer, Vendor, Admin)
- **Phase 6**: Application Development (Mall, Vendor, Admin Apps)
- **Phase 7**: Backend API Development (7 Microservices, RabbitMQ, Redis, PostgreSQL)
- **Phase 8**: Testing with Playwright MCP (Comprehensive E2E Testing)
- **Phase 9**: Deployment & DevOps (CI/CD, Docker, Hosting, Monitoring, Security)
- **Phase 10**: Documentation & Handoff (Code Docs, User Guides, Developer Docs, Handoff)

**Total Phases**: 10
**Total Tasks**: 100+
**Total Subtasks**: 500+

---

## 📌 Key Architecture Decisions

1. **Nx Monorepo** - Thin App, Thick Library philosophy
2. **7 NestJS Microservices** - API Gateway + 6 domain services
3. **RabbitMQ** - Event-driven communication between services
4. **Redis** - Distributed caching and session management
5. **PostgreSQL** - Database per service pattern (6 databases)
6. **TanStack Query** - Server state management
7. **TanStack Router** - Type-safe routing
8. **react-auth-kit** - Authentication
9. **shadcn/ui** - UI component library
10. **Zod** - Runtime validation
11. **Playwright MCP** - Comprehensive E2E testing (no manual unit/integration tests)
12. **Separate Subdomains** - mall.domain.com, vendor.domain.com, admin.domain.com

---

## 🚀 Ready for Orchestrator Mode

This file is now ready to be used by Orchestrator mode to:

1. Break down into subtasks
2. Assign to appropriate modes (Code, Debug, etc.)
3. Track progress
4. Ensure nothing is missed

**Status**: ✅ Complete and ready for execution
