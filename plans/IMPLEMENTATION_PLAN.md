# E-Commerce Platform - Complete Implementation Plan

## Project Overview

Building a multi-tenant e-commerce marketplace with three applications (Mall, Vendor, Admin) using the "Thin App, Thick Library" philosophy in an Nx monorepo.

**Key Principles:**

- Shared libraries contain all business logic, components, and data handling
- Applications are thin shells with routing, navigation, and app-specific theming
- Write once, use everywhere approach
- Full CRUD operations for all entities (Vendors, Stores, Products, Users)

---

## Phase 1: Foundation & Infrastructure Setup

### 1.1 Project Configuration & Dependencies

#### 1.1.1 Install Core Dependencies

- [ ] Install TanStack Query (`@tanstack/react-query`, `@tanstack/react-query-devtools`)
- [ ] Install TanStack Router (`@tanstack/react-router`, `@tanstack/router-devtools`)
- [ ] Install react-auth-kit (`react-auth-kit`)
- [ ] Install Axios (`axios`)
- [ ] Install Zod (`zod`)
- [ ] Install react-hook-form (`react-hook-form`, `@hookform/resolvers`)
- [ ] Install Zustand (`zustand`)
- [ ] Install date-fns for date utilities
- [ ] Install lucide-react for icons
- [ ] Install clsx and tailwind-merge for className utilities
- [ ] Install concurrently for running multiple dev servers

#### 1.1.2 Install UI & Styling Dependencies

- [ ] Install Tailwind CSS (`tailwindcss`, `postcss`, `autoprefixer`)
- [ ] Install Radix UI primitives (will be added via shadcn/ui)
- [ ] Install class-variance-authority for component variants
- [ ] Configure Tailwind CSS in workspace root
- [ ] Set up global CSS variables for theming
- [ ] Configure dark mode support

#### 1.1.3 Install Development & Testing Tools

- [ ] Install Storybook (`@storybook/react-vite`, `@storybook/addon-essentials`)
- [ ] Install Vitest for unit testing (`vitest`, `@vitest/ui`)
- [ ] Install React Testing Library (`@testing-library/react`, `@testing-library/jest-dom`)
- [ ] Install Playwright for E2E testing (`@playwright/test`)
- [ ] Configure test setup files

#### 1.1.4 Install i18n Dependencies

- [ ] Install react-i18next (`react-i18next`, `i18next`)
- [ ] Install i18next-browser-languagedetector
- [ ] Install i18next-http-backend for loading translations

#### 1.1.5 Update Nx Configuration

- [ ] Update [`nx.json`](nx.json) with proper target defaults
- [ ] Configure affected command settings
- [ ] Set up caching strategies for builds and tests
- [ ] Configure task pipeline dependencies

#### 1.1.6 Update TypeScript Configuration

- [ ] Update [`tsconfig.base.json`](tsconfig.base.json) with path mappings for all libraries
- [ ] Configure strict mode settings
- [ ] Set up proper module resolution
- [ ] Add DOM types for React apps

#### 1.1.7 Environment Configuration

- [ ] Create `.env.example` files for each app
- [ ] Set up environment variable handling with Vite
- [ ] Configure API base URLs for different environments
- [ ] Set up environment-specific configurations

---

### 1.2 Workspace Structure Setup

#### 1.2.1 Create Directory Structure

```
apps/
  ├── mall/              # Customer-facing app
  ├── vendor/            # Vendor management app
  ├── admin/             # Admin control panel
  └── api/               # Backend API (existing)

libs/
  ├── shared/
  │   ├── ui/            # shadcn/ui components
  │   ├── data-access/   # API services & TanStack Query hooks
  │   ├── types/         # TypeScript interfaces & Zod schemas
  │   ├── utils/         # Helper functions
  │   ├── config/        # Shared configuration
  │   └── i18n/          # Internationalization setup
  │
  ├── features/
  │   ├── auth/          # Authentication feature
  │   ├── vendors/       # Vendor management feature
  │   ├── stores/        # Store management feature
  │   ├── products/      # Product management feature
  │   ├── users/         # User management feature
  │   └── search/        # Search & filtering feature
  │
  └── domain/
      ├── customer/      # Customer-specific logic
      ├── vendor/        # Vendor-specific logic
      └── admin/         # Admin-specific logic
```

#### 1.2.2 Generate Applications

- [ ] Generate Mall app: `nx g @nx/react:app mall --bundler=vite --routing=true --style=css`
- [ ] Generate Vendor app: `nx g @nx/react:app vendor --bundler=vite --routing=true --style=css`
- [ ] Generate Admin app: `nx g @nx/react:app admin --bundler=vite --routing=true --style=css`
- [ ] Configure each app's [`vite.config.ts`](apps/shop/vite.config.ts)
- [ ] Set up proper ports (Mall: 4200, Vendor: 4201, Admin: 4202, API: 3000)

#### 1.2.3 Generate Shared Libraries

- [ ] Generate shared/ui: `nx g @nx/react:lib ui --directory=shared --bundler=vite`
- [ ] Generate shared/data-access: `nx g @nx/js:lib data-access --directory=shared`
- [ ] Generate shared/types: `nx g @nx/js:lib types --directory=shared`
- [ ] Generate shared/utils: `nx g @nx/js:lib utils --directory=shared`
- [ ] Generate shared/config: `nx g @nx/js:lib config --directory=shared`
- [ ] Generate shared/i18n: `nx g @nx/js:lib i18n --directory=shared`

#### 1.2.4 Generate Feature Libraries

- [ ] Generate features/auth: `nx g @nx/react:lib auth --directory=features --bundler=vite`
- [ ] Generate features/vendors: `nx g @nx/react:lib vendors --directory=features --bundler=vite`
- [ ] Generate features/stores: `nx g @nx/react:lib stores --directory=features --bundler=vite`
- [ ] Generate features/products: `nx g @nx/react:lib products --directory=features --bundler=vite`
- [ ] Generate features/users: `nx g @nx/react:lib users --directory=features --bundler=vite`
- [ ] Generate features/search: `nx g @nx/react:lib search --directory=features --bundler=vite`

#### 1.2.5 Generate Domain Libraries

- [ ] Generate domain/customer: `nx g @nx/react:lib customer --directory=domain --bundler=vite`
- [ ] Generate domain/vendor: `nx g @nx/react:lib vendor --directory=domain --bundler=vite`
- [ ] Generate domain/admin: `nx g @nx/react:lib admin --directory=domain --bundler=vite`

---

## Phase 2: Shared Infrastructure

### 2.1 Type System & Validation (libs/shared/types)

#### 2.1.1 Define Core Entities with Zod

- [ ] Create `user.schema.ts` with User, Customer, Vendor, Admin types

  - [ ] Define UserRole enum (customer, vendor, admin)
  - [ ] Define base User schema with Zod
  - [ ] Define Customer-specific fields
  - [ ] Define Vendor-specific fields
  - [ ] Define Admin-specific fields
  - [ ] Export TypeScript types from Zod schemas

- [ ] Create `vendor.schema.ts` with Vendor entity

  - [ ] Define Vendor schema (id, email, name, company, phone, createdAt, updatedAt)
  - [ ] Define VendorCreateInput schema
  - [ ] Define VendorUpdateInput schema
  - [ ] Add validation rules (email format, phone format, etc.)
  - [ ] Export TypeScript types

- [ ] Create `store.schema.ts` with Store entity

  - [ ] Define Store schema (id, name, slug, description, logo, coverImage, vendorId, isActive)
  - [ ] Define StoreCreateInput schema
  - [ ] Define StoreUpdateInput schema
  - [ ] Add validation rules (slug format, URL validation)
  - [ ] Export TypeScript types

- [ ] Create `product.schema.ts` with Product entity

  - [ ] Define Product schema (id, name, description, price, comparePrice, images, category, storeId)
  - [ ] Define ProductCreateInput schema
  - [ ] Define ProductUpdateInput schema
  - [ ] Add validation rules (price > 0, comparePrice > price, etc.)
  - [ ] Export TypeScript types

- [ ] Create `category.schema.ts` with Category entity
  - [ ] Define Category schema (id, name, slug, description, parentId)
  - [ ] Define CategoryCreateInput schema
  - [ ] Define CategoryUpdateInput schema
  - [ ] Export TypeScript types

#### 2.1.2 Define API Response Types

- [ ] Create `api-response.schema.ts`
  - [ ] Define ApiResponse<T> generic type
  - [ ] Define PaginatedResponse<T> type
  - [ ] Define ApiError type
  - [ ] Define ValidationError type

#### 2.1.3 Define Form Types

- [ ] Create `forms.schema.ts`
  - [ ] Define LoginFormData schema
  - [ ] Define RegisterFormData schema
  - [ ] Define PasswordResetFormData schema
  - [ ] Define ProfileUpdateFormData schema
  - [ ] Export TypeScript types

#### 2.1.4 Create Index Exports

- [ ] Create comprehensive `index.ts` exporting all schemas and types
- [ ] Organize exports by entity
- [ ] Add JSDoc comments for better IDE support

---

### 2.2 Utilities Library (libs/shared/utils)

#### 2.2.1 Create Formatting Utilities

- [ ] Create `format.ts`
  - [ ] `formatCurrency(amount, currency)` - Format prices
  - [ ] `formatDate(date, format)` - Format dates using date-fns
  - [ ] `formatRelativeTime(date)` - "2 hours ago" format
  - [ ] `formatNumber(number)` - Format large numbers (1.2K, 1.5M)
  - [ ] `formatPercentage(value)` - Format percentages

#### 2.2.2 Create Validation Utilities

- [ ] Create `validation.ts`
  - [ ] `isValidEmail(email)` - Email validation
  - [ ] `isValidPhone(phone)` - Phone validation
  - [ ] `isValidUrl(url)` - URL validation
  - [ ] `isValidSlug(slug)` - Slug validation
  - [ ] `sanitizeInput(input)` - Sanitize user input

#### 2.2.3 Create String Utilities

- [ ] Create `string.ts`
  - [ ] `truncate(text, length)` - Truncate long text
  - [ ] `slugify(text)` - Convert text to URL-safe slug
  - [ ] `capitalize(text)` - Capitalize first letter
  - [ ] `pluralize(count, singular, plural)` - Handle pluralization
  - [ ] `stripHtml(html)` - Remove HTML tags

#### 2.2.4 Create Array Utilities

- [ ] Create `array.ts`
  - [ ] `groupBy(array, key)` - Group array by key
  - [ ] `sortBy(array, key, order)` - Sort array
  - [ ] `unique(array)` - Remove duplicates
  - [ ] `chunk(array, size)` - Split array into chunks

#### 2.2.5 Create Object Utilities

- [ ] Create `object.ts`
  - [ ] `omit(object, keys)` - Remove keys from object
  - [ ] `pick(object, keys)` - Pick specific keys
  - [ ] `isEmpty(value)` - Check if empty
  - [ ] `deepClone(object)` - Deep clone object

#### 2.2.6 Create Class Name Utilities

- [ ] Create `cn.ts`
  - [ ] Export `cn()` function using clsx and tailwind-merge
  - [ ] Add TypeScript types for className handling

#### 2.2.7 Create Error Handling Utilities

- [ ] Create `error.ts`
  - [ ] `getErrorMessage(error)` - Extract error message
  - [ ] `isApiError(error)` - Type guard for API errors
  - [ ] `handleApiError(error)` - Centralized error handling

---

### 2.3 Configuration Library (libs/shared/config)

#### 2.3.1 Create Environment Configuration

- [ ] Create `env.ts`
  - [ ] Define environment variables interface
  - [ ] Export API_BASE_URL
  - [ ] Export APP_ENV (development, staging, production)
  - [ ] Export feature flags
  - [ ] Add validation for required env vars

#### 2.3.2 Create API Configuration

- [ ] Create `api.config.ts`
  - [ ] Define API endpoints constants
  - [ ] Define request timeout settings
  - [ ] Define retry configuration
  - [ ] Define rate limiting settings

#### 2.3.3 Create App Configuration

- [ ] Create `app.config.ts`
  - [ ] Define pagination defaults (page size, max pages)
  - [ ] Define cache durations for TanStack Query
  - [ ] Define supported languages
  - [ ] Define date/time formats
  - [ ] Define currency settings

#### 2.3.4 Create Route Configuration

- [ ] Create `routes.config.ts`
  - [ ] Define route paths for Mall app
  - [ ] Define route paths for Vendor app
  - [ ] Define route paths for Admin app
  - [ ] Export route builder functions

---

### 2.4 Internationalization (libs/shared/i18n)

#### 2.4.1 Setup i18next Configuration

- [ ] Create `i18n.config.ts`
  - [ ] Configure i18next with react-i18next
  - [ ] Set up language detection
  - [ ] Configure fallback language (English)
  - [ ] Set up namespace loading

#### 2.4.2 Create Translation Files

- [ ] Create `locales/en/` directory

  - [ ] `common.json` - Common translations (buttons, labels, etc.)
  - [ ] `auth.json` - Authentication translations
  - [ ] `products.json` - Product-related translations
  - [ ] `stores.json` - Store-related translations
  - [ ] `vendors.json` - Vendor-related translations
  - [ ] `users.json` - User-related translations
  - [ ] `errors.json` - Error messages
  - [ ] `validation.json` - Validation messages

- [ ] Create `locales/he/` directory (Hebrew)
  - [ ] Mirror all English translation files
  - [ ] Add RTL-specific translations
  - [ ] Translate all strings to Hebrew

#### 2.4.3 Create Translation Hooks

- [ ] Create `hooks/useTranslation.ts`
  - [ ] Wrap i18next useTranslation hook
  - [ ] Add type safety for translation keys
  - [ ] Export useTranslation hook

#### 2.4.4 Create Language Switcher Component

- [ ] Create `LanguageSwitcher.tsx` component
  - [ ] Dropdown to select language (English/Hebrew)
  - [ ] Persist language preference to localStorage
  - [ ] Update HTML dir attribute for RTL

---

### 2.5 Data Access Layer (libs/shared/data-access)

#### 2.5.1 Setup Axios HTTP Client

- [ ] Create `http-client.ts`
  - [ ] Configure Axios instance with base URL
  - [ ] Add request interceptor to attach auth tokens
  - [ ] Add response interceptor for error handling
  - [ ] Add request/response logging in development
  - [ ] Handle token refresh logic
  - [ ] Handle network errors gracefully

#### 2.5.2 Create API Services

- [ ] Create `services/auth.service.ts`

  - [ ] `login(email, password)` - POST /auth/login
  - [ ] `loginWithGoogle(token)` - POST /auth/google
  - [ ] `register(data)` - POST /auth/register
  - [ ] `logout()` - POST /auth/logout
  - [ ] `refreshToken()` - POST /auth/refresh
  - [ ] `resetPassword(email)` - POST /auth/reset-password
  - [ ] `verifyResetToken(token)` - GET /auth/verify-reset/:token
  - [ ] `updatePassword(token, password)` - POST /auth/update-password

- [ ] Create `services/vendor.service.ts`

  - [ ] `getVendors(params)` - GET /vendors
  - [ ] `getVendor(id)` - GET /vendors/:id
  - [ ] `createVendor(data)` - POST /vendors
  - [ ] `updateVendor(id, data)` - PUT /vendors/:id
  - [ ] `deleteVendor(id)` - DELETE /vendors/:id
  - [ ] `getVendorStores(id)` - GET /vendors/:id/stores
  - [ ] `getVendorStats(id)` - GET /vendors/:id/stats

- [ ] Create `services/store.service.ts`

  - [ ] `getStores(params)` - GET /stores
  - [ ] `getStore(id)` - GET /stores/:id
  - [ ] `getStoreBySlug(slug)` - GET /stores/slug/:slug
  - [ ] `createStore(data)` - POST /stores
  - [ ] `updateStore(id, data)` - PUT /stores/:id
  - [ ] `deleteStore(id)` - DELETE /stores/:id
  - [ ] `getStoreProducts(id, params)` - GET /stores/:id/products
  - [ ] `uploadStoreLogo(id, file)` - POST /stores/:id/logo
  - [ ] `uploadStoreCover(id, file)` - POST /stores/:id/cover

- [ ] Create `services/product.service.ts`

  - [ ] `getProducts(params)` - GET /products
  - [ ] `getProduct(id)` - GET /products/:id
  - [ ] `createProduct(data)` - POST /products
  - [ ] `updateProduct(id, data)` - PUT /products/:id
  - [ ] `deleteProduct(id)` - DELETE /products/:id
  - [ ] `uploadProductImages(id, files)` - POST /products/:id/images
  - [ ] `deleteProductImage(id, imageId)` - DELETE /products/:id/images/:imageId

- [ ] Create `services/user.service.ts`

  - [ ] `getUsers(params)` - GET /users
  - [ ] `getUser(id)` - GET /users/:id
  - [ ] `getCurrentUser()` - GET /users/me
  - [ ] `updateUser(id, data)` - PUT /users/:id
  - [ ] `updateCurrentUser(data)` - PUT /users/me
  - [ ] `deleteUser(id)` - DELETE /users/:id
  - [ ] `deleteCurrentUser()` - DELETE /users/me
  - [ ] `uploadAvatar(file)` - POST /users/me/avatar

- [ ] Create `services/category.service.ts`

  - [ ] `getCategories()` - GET /categories
  - [ ] `getCategory(id)` - GET /categories/:id
  - [ ] `createCategory(data)` - POST /categories
  - [ ] `updateCategory(id, data)` - PUT /categories/:id
  - [ ] `deleteCategory(id)` - DELETE /categories/:id

- [ ] Create `services/search.service.ts`
  - [ ] `searchProducts(query, filters)` - GET /search/products
  - [ ] `searchStores(query)` - GET /search/stores
  - [ ] `getSearchSuggestions(query)` - GET /search/suggestions

#### 2.5.3 Setup TanStack Query

- [ ] Create `query-client.ts`

  - [ ] Configure QueryClient with default options
  - [ ] Set stale times for different query types
  - [ ] Configure retry logic
  - [ ] Set up cache time defaults
  - [ ] Configure refetch on window focus

- [ ] Create `query-keys.ts`
  - [ ] Define query key factories for all entities
  - [ ] `vendorKeys` - all, list, detail, stores, stats
  - [ ] `storeKeys` - all, list, detail, products
  - [ ] `productKeys` - all, list, detail, byStore
  - [ ] `userKeys` - all, list, detail, me
  - [ ] `categoryKeys` - all, list, detail
  - [ ] `searchKeys` - products, stores, suggestions

#### 2.5.4 Create TanStack Query Hooks

- [ ] Create `hooks/useAuth.ts`

  - [ ] `useLogin()` - Mutation for login
  - [ ] `useLoginWithGoogle()` - Mutation for Google OAuth
  - [ ] `useRegister()` - Mutation for registration
  - [ ] `useLogout()` - Mutation for logout
  - [ ] `useResetPassword()` - Mutation for password reset
  - [ ] `useUpdatePassword()` - Mutation for password update
  - [ ] Handle cache invalidation on auth changes

- [ ] Create `hooks/useVendors.ts`

  - [ ] `useVendors(params)` - Query for vendor list
  - [ ] `useVendor(id)` - Query for single vendor
  - [ ] `useVendorStores(id)` - Query for vendor's stores
  - [ ] `useVendorStats(id)` - Query for vendor statistics
  - [ ] `useCreateVendor()` - Mutation for creating vendor
  - [ ] `useUpdateVendor()` - Mutation for updating vendor
  - [ ] `useDeleteVendor()` - Mutation for deleting vendor
  - [ ] Implement optimistic updates with setQueryData
  - [ ] Handle cache invalidation properly

- [ ] Create `hooks/useStores.ts`

  - [ ] `useStores(params)` - Query for store list
  - [ ] `useStore(id)` - Query for single store
  - [ ] `useStoreBySlug(slug)` - Query for store by slug
  - [ ] `useStoreProducts(id, params)` - Query for store products
  - [ ] `useCreateStore()` - Mutation for creating store
  - [ ] `useUpdateStore()` - Mutation for updating store
  - [ ] `useDeleteStore()` - Mutation for deleting store
  - [ ] `useUploadStoreLogo()` - Mutation for logo upload
  - [ ] `useUploadStoreCover()` - Mutation for cover upload
  - [ ] Implement optimistic updates with setQueryData
  - [ ] Handle cache invalidation properly

- [ ] Create `hooks/useProducts.ts`

  - [ ] `useProducts(params)` - Query for product list
  - [ ] `useProduct(id)` - Query for single product
  - [ ] `useCreateProduct()` - Mutation for creating product
  - [ ] `useUpdateProduct()` - Mutation for updating product
  - [ ] `useDeleteProduct()` - Mutation for deleting product
  - [ ] `useUploadProductImages()` - Mutation for image upload
  - [ ] `useDeleteProductImage()` - Mutation for image deletion
  - [ ] Implement optimistic updates with setQueryData
  - [ ] Handle cache invalidation properly
  - [ ] Prefetch related products on hover

- [ ] Create `hooks/useUsers.ts`

  - [ ] `useUsers(params)` - Query for user list
  - [ ] `useUser(id)` - Query for single user
  - [ ] `useCurrentUser()` - Query for current user
  - [ ] `useUpdateUser()` - Mutation for updating user
  - [ ] `useUpdateCurrentUser()` - Mutation for updating current user
  - [ ] `useDeleteUser()` - Mutation for deleting user
  - [ ] `useDeleteCurrentUser()` - Mutation for deleting current user
  - [ ] `useUploadAvatar()` - Mutation for avatar upload
  - [ ] Implement optimistic updates with setQueryData
  - [ ] Handle cache invalidation properly

- [ ] Create `hooks/useCategories.ts`

  - [ ] `useCategories()` - Query for category list
  - [ ] `useCategory(id)` - Query for single category
  - [ ] `useCreateCategory()` - Mutation for creating category
  - [ ] `useUpdateCategory()` - Mutation for updating category
  - [ ] `useDeleteCategory()` - Mutation for deleting category
  - [ ] Handle cache invalidation properly

- [ ] Create `hooks/useSearch.ts`
  - [ ] `useSearchProducts(query, filters)` - Query for product search
  - [ ] `useSearchStores(query)` - Query for store search
  - [ ] `useSearchSuggestions(query)` - Query for search suggestions
  - [ ] Implement debouncing for search queries
  - [ ] Cache search results appropriately

---

### 2.6 UI Component Library (libs/shared/ui)

#### 2.6.1 Initialize shadcn/ui

- [ ] Run `npx shadcn-ui@latest init` in libs/shared/ui
- [ ] Configure components.json
  - [ ] Set style to "default"
  - [ ] Set base color
  - [ ] Set CSS variables for theming
  - [ ] Configure path aliases
  - [ ] Enable RSC (set to false for client components)

#### 2.6.2 Install Core shadcn/ui Components

- [ ] Add Button: `npx shadcn-ui@latest add button`
- [ ] Add Input: `npx shadcn-ui@latest add input`
- [ ] Add Label: `npx shadcn-ui@latest add label`
- [ ] Add Textarea: `npx shadcn-ui@latest add textarea`
- [ ] Add Select: `npx shadcn-ui@latest add select`
- [ ] Add Checkbox: `npx shadcn-ui@latest add checkbox`
- [ ] Add Radio Group: `npx shadcn-ui@latest add radio-group`
- [ ] Add Switch: `npx shadcn-ui@latest add switch`

#### 2.6.3 Install Feedback Components

- [ ] Add Toast: `npx shadcn-ui@latest add toast`
- [ ] Add Dialog: `npx shadcn-ui@latest add dialog`
- [ ] Add Alert Dialog: `npx shadcn-ui@latest add alert-dialog`
- [ ] Add Alert: `npx shadcn-ui@latest add alert`
- [ ] Add Progress: `npx shadcn-ui@latest add progress`
- [ ] Add Skeleton: `npx shadcn-ui@latest add skeleton`

#### 2.6.4 Install Navigation Components

- [ ] Add Dropdown Menu: `npx shadcn-ui@latest add dropdown-menu`
- [ ] Add Navigation Menu: `npx shadcn-ui@latest add navigation-menu`
- [ ] Add Tabs: `npx shadcn-ui@latest add tabs`
- [ ] Add Breadcrumb: `npx shadcn-ui@latest add breadcrumb`
- [ ] Add Pagination: `npx shadcn-ui@latest add pagination`

#### 2.6.5 Install Data Display Components

- [ ] Add Table: `npx shadcn-ui@latest add table`
- [ ] Add Card: `npx shadcn-ui@latest add card`
- [ ] Add Badge: `npx shadcn-ui@latest add badge`
- [ ] Add Avatar: `npx shadcn-ui@latest add avatar`
- [ ] Add Separator: `npx shadcn-ui@latest add separator`
- [ ] Add Accordion: `npx shadcn-ui@latest add accordion`

#### 2.6.6 Install Layout Components

- [ ] Add Sheet: `npx shadcn-ui@latest add sheet`
- [ ] Add Popover: `npx shadcn-ui@latest add popover`
- [ ] Add Tooltip: `npx shadcn-ui@latest add tooltip`
- [ ] Add Scroll Area: `npx shadcn-ui@latest add scroll-area`
- [ ] Add Aspect Ratio: `npx shadcn-ui@latest add aspect-ratio`

#### 2.6.7 Create Custom Composite Components

- [ ] Create `LoadingSpinner.tsx`

  - [ ] Use shadcn/ui Skeleton or custom spinner
  - [ ] Add size variants (sm, md, lg)
  - [ ] Add color variants
  - [ ] Export component

- [ ] Create `ErrorMessage.tsx`

  - [ ] Use shadcn/ui Alert component
  - [ ] Display error message with icon
  - [ ] Add retry button option
  - [ ] Support different error types
  - [ ] Export component

- [ ] Create `EmptyState.tsx`

  - [ ] Display when no data available
  - [ ] Show icon, title, description
  - [ ] Optional action button
  - [ ] Export component

- [ ] Create `ConfirmDialog.tsx`

  - [ ] Wrap shadcn/ui AlertDialog
  - [ ] Add confirmation logic
  - [ ] Support async actions
  - [ ] Show loading state
  - [ ] Export component

- [ ] Create `DataTable.tsx`

  - [ ] Wrap shadcn/ui Table
  - [ ] Add sorting functionality
  - [ ] Add filtering functionality
  - [ ] Add pagination
  - [ ] Add row selection
  - [ ] Add loading state
  - [ ] Add empty state
  - [ ] Make it generic with TypeScript
  - [ ] Export component

- [ ] Create `ImageUpload.tsx`

  - [ ] Drag and drop support
  - [ ] File picker fallback
  - [ ] Image preview
  - [ ] Multiple image support
  - [ ] File size validation
  - [ ] File type validation
  - [ ] Progress indicator
  - [ ] Export component

- [ ] Create `SearchInput.tsx`

  - [ ] Wrap shadcn/ui Input
  - [ ] Add search icon
  - [ ] Add clear button
  - [ ] Debounce input
  - [ ] Show loading state
  - [ ] Export component

- [ ] Create `FilterPanel.tsx`

  - [ ] Use shadcn/ui Sheet for mobile
  - [ ] Use sidebar for desktop
  - [ ] Support multiple filter types
  - [ ] Add clear filters button
  - [ ] Export component

- [ ] Create `PageHeader.tsx`

  - [ ] Title and description
  - [ ] Breadcrumbs
  - [ ] Action buttons
  - [ ] Export component

- [ ] Create `FormField.tsx`
  - [ ] Wrap form inputs with label and error
  - [ ] Integrate with react-hook-form
  - [ ] Support all input types
  - [ ] Show validation errors
  - [ ] Export component

#### 2.6.8 Create Layout Components

- [ ] Create `AppShell.tsx`

  - [ ] Header, sidebar, main content, footer
  - [ ] Responsive layout
  - [ ] Collapsible sidebar
  - [ ] Export component

- [ ] Create `Header.tsx`

  - [ ] Logo/brand
  - [ ] Navigation links
  - [ ] User menu
  - [ ] Language switcher
  - [ ] Theme toggle
  - [ ] Export component

- [ ] Create `Sidebar.tsx`

  - [ ] Navigation menu
  - [ ] Collapsible sections
  - [ ] Active link highlighting
  - [ ] Role-based menu items
  - [ ] Export component

- [ ] Create `Footer.tsx`
  - [ ] Copyright info
  - [ ] Links
  - [ ] Social media
