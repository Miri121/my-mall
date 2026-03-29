# E-Commerce Platform - Implementation Plan (Part 2)

> **Continuation of IMPLEMENTATION_PLAN.md**  
> This document covers Phase 6 (continued), Phase 7, Phase 8, and Phase 9

---

## Phase 6: Application Development (Continued)

### 6.1 Mall App (apps/mall) - Customer-Facing Application

#### 6.1.1 Setup TanStack Router

- [ ] Install TanStack Router in mall app
- [ ] Create `routes/` directory
- [ ] Configure router in `main.tsx`
- [ ] Set up QueryClient provider
- [ ] Set up AuthProvider
- [ ] Set up i18n provider
- [ ] Set up Toaster for notifications

#### 6.1.2 Create Route Files (Mall App)

**Location:** `apps/mall/src/routes/`

**Public Routes (No Authentication):**

- [ ] Create `__root.tsx` - Root layout

  - **Permission:** Public
  - **Components:** MallHeader, MallFooter, Toaster
  - **Providers:** QueryClient, AuthProvider, i18n

- [ ] Create `index.tsx` - Homepage

  - **Permission:** Public
  - **Components:** HomePage, FeaturedStores, PopularProducts, SearchBar
  - **Data:** Featured stores, popular products (TanStack Query)
  - **Actions:** Browse, search, view details

- [ ] Create `login.tsx` - Login page

  - **Permission:** Public
  - **Components:** LoginForm, GoogleOAuthButton
  - **Redirect:** After login → `/` (stores page)

- [ ] Create `register.tsx` - Registration page

  - **Permission:** Public
  - **CRUD:** Create (customer self-registration)
  - **Components:** RegisterForm, GoogleOAuthButton
  - **Fields:** name, email, password, confirmPassword
  - **Validation:** Zod schema
  - **Success:** Auto-login + redirect to `/` + toast

- [ ] Create `forgot-password.tsx` - Forgot password

  - **Permission:** Public
  - **Components:** ForgotPasswordForm

- [ ] Create `reset-password/$token.tsx` - Reset password
  - **Permission:** Public
  - **Components:** ResetPasswordForm

**Store Routes (Public):**

- [ ] Create `stores/index.tsx` - Stores list

  - **Permission:** Public
  - **CRUD:** Read (all active stores)
  - **Components:** StoreList, StoreCard, SearchBar, Filters
  - **Data:** All stores with pagination
  - **Actions:** View store, search, filter

- [ ] Create `stores/$storeSlug.tsx` - Store detail
  - **Permission:** Public
  - **CRUD:** Read (single store)
  - **Components:** StoreDetail, ExternalStoreIframe
  - **Data:** Store info + external API iframe
  - **Note:** Hosts external website with store products

**Product Routes (Public):**

- [ ] Create `products/index.tsx` - Products list

  - **Permission:** Public
  - **CRUD:** Read (all products)
  - **Components:** ProductList, ProductCard, SearchBar, Filters
  - **Filters:** Category, price range, store
  - **Actions:** View details, add to favorites

- [ ] Create `products/$productId.tsx` - Product detail
  - **Permission:** Public
  - **CRUD:** Read (single product)
  - **Components:** ProductDetail, StoreInfo, RelatedProducts
  - **Actions:** View details, add to favorites, view store

**Search Route (Public):**

- [ ] Create `search.tsx` - Search results
  - **Permission:** Public
  - **CRUD:** Read (search results)
  - **Components:** SearchResults, Filters
  - **Query Params:** `?q=query&category=&priceMin=&priceMax=`
  - **Results:** Products with store labels (clickable)

**Protected Routes (Customer Authentication Required):**

- [ ] Create `account/index.tsx` - Account dashboard

  - **Permission:** Customer only (Role.CUSTOMER)
  - **CRUD:** Read (self)
  - **Components:** AccountDashboard
  - **Sections:** Profile, Favorites, History, Preferences

- [ ] Create `account/profile.tsx` - Profile management

  - **Permission:** Customer only (Role.CUSTOMER)
  - **CRUD:** Read, Update (self)
  - **Components:** ProfileForm
  - **Fields:** name, email, phone
  - **Validation:** Zod schema
  - **Success:** Toast + cache update (setQueryData)

- [ ] Create `account/password.tsx` - Change password

  - **Permission:** Customer only (Role.CUSTOMER)
  - **CRUD:** Update (self password)
  - **Components:** ChangePasswordForm
  - **Fields:** currentPassword, newPassword, confirmPassword
  - **Success:** Toast notification

- [ ] Create `account/preferences.tsx` - User preferences

  - **Permission:** Customer only (Role.CUSTOMER)
  - **CRUD:** Update (self preferences)
  - **Components:** PreferencesForm
  - **Fields:** language (en/he), theme (light/dark)
  - **Storage:** Zustand + localStorage

- [ ] Create `account/favorites.tsx` - Favorites list

  - **Permission:** Customer only (Role.CUSTOMER)
  - **CRUD:** Read (self favorites)
  - **Components:** FavoritesList, ProductCard, StoreCard
  - **Storage:** Zustand + localStorage
  - **Actions:** Remove from favorites, view details

- [ ] Create `account/history.tsx` - Browsing history

  - **Permission:** Customer only (Role.CUSTOMER)
  - **CRUD:** Read (self history)
  - **Components:** HistoryList, ProductCard
  - **Storage:** Customer domain library
  - **Actions:** View product, clear history

- [ ] Create `account/delete.tsx` - Delete account
  - **Permission:** Customer only (Role.CUSTOMER)
  - **CRUD:** Delete (self)
  - **Components:** DeleteAccountForm, AlertDialog
  - **Confirmation:** "Are you sure? This cannot be undone"
  - **Success:** Logout + redirect to `/` + toast

#### 6.1.3 Create Page Components (Mall App)

- [ ] Create `HomePage.tsx`

  - [ ] Featured stores section
  - [ ] Popular products section
  - [ ] Search bar
  - [ ] Category navigation
  - [ ] Integration with useStores, useProducts hooks

- [ ] Create `StoresPage.tsx`

  - [ ] Store list with cards
  - [ ] Search and filters
  - [ ] Pagination
  - [ ] Integration with useStores hook

- [ ] Create `StoreDetailPage.tsx`

  - [ ] Store information
  - [ ] External store iframe
  - [ ] Integration with useStore hook

- [ ] Create `ProductsPage.tsx`

  - [ ] Product grid
  - [ ] Search and filters
  - [ ] Pagination
  - [ ] Integration with useProducts hook

- [ ] Create `ProductDetailPage.tsx`

  - [ ] Product information
  - [ ] Image gallery
  - [ ] Store information
  - [ ] Related products
  - [ ] Add to favorites button
  - [ ] Integration with useProduct hook

- [ ] Create `SearchPage.tsx`

  - [ ] Search results
  - [ ] Filters
  - [ ] Pagination
  - [ ] Integration with useSearch hook

- [ ] Create `AccountPage.tsx`

  - [ ] Account dashboard
  - [ ] Quick links
  - [ ] Recent activity
  - [ ] Integration with useCurrentUser hook

- [ ] Create `ProfilePage.tsx`

  - [ ] Profile form
  - [ ] Integration with useUpdateCurrentUser hook

- [ ] Create `FavoritesPage.tsx`
  - [ ] Favorites list
  - [ ] Integration with useFavoritesStore (Zustand)

#### 6.1.4 Create Mall-Specific Components

- [ ] Create `MallHeader.tsx`

  - [ ] Logo
  - [ ] Navigation (Home, Stores, Products)
  - [ ] Search bar
  - [ ] User menu (if logged in)
  - [ ] Login/Register buttons (if not logged in)
  - [ ] Language switcher
  - [ ] Theme toggle

- [ ] Create `MallFooter.tsx`

  - [ ] Links
  - [ ] Copyright
  - [ ] Social media

- [ ] Create `StoreCard.tsx`

  - [ ] Store image
  - [ ] Store name
  - [ ] Store description
  - [ ] View store button

- [ ] Create `ProductCard.tsx`
  - [ ] Product image
  - [ ] Product name
  - [ ] Price
  - [ ] Store name
  - [ ] Add to favorites button

#### 6.1.5 Configure Mall App

- [ ] Update `vite.config.ts` with proper settings
- [ ] Configure environment variables
- [ ] Set up proxy for API calls
- [ ] Configure build options
- [ ] Set up dev server port (4200)

#### 6.1.6 Add Mall-Specific Styling

- [ ] Create `styles/globals.css` with Tailwind imports
- [ ] Add mall-specific CSS variables
- [ ] Configure theme colors
- [ ] Add custom styles

---

### 6.2 Vendor App (apps/vendor) - Vendor Dashboard

#### 6.2.1 Setup TanStack Router

- [ ] Install TanStack Router in vendor app
- [ ] Create `routes/` directory
- [ ] Configure router in `main.tsx`
- [ ] Set up QueryClient provider
- [ ] Set up AuthProvider
- [ ] Set up i18n provider
- [ ] Set up Toaster for notifications

#### 6.2.2 Create Route Files (Vendor App)

**Location:** `apps/vendor/src/routes/`

**Public Routes:**

- [ ] Create `login.tsx` - Login page

  - **Permission:** Public
  - **Components:** LoginForm
  - **Redirect:** After login → `/dashboard`

- [ ] Create `forgot-password.tsx` - Forgot password

  - **Permission:** Public
  - **Components:** ForgotPasswordForm

- [ ] Create `reset-password/$token.tsx` - Reset password
  - **Permission:** Public
  - **Components:** ResetPasswordForm

**Protected Routes (Vendor Authentication Required):**

- [ ] Create `__root.tsx` - Root layout

  - **Permission:** Authenticated
  - **Components:** VendorHeader, VendorSidebar, VendorFooter, Toaster
  - **Providers:** QueryClient, AuthProvider, i18n

- [ ] Create `index.tsx` - Redirect to dashboard

  - **Permission:** Vendor only
  - **Action:** Redirect to `/dashboard`

- [ ] Create `dashboard.tsx` - Vendor dashboard
  - **Permission:** Vendor only (Role.VENDOR)
  - **CRUD:** Read (self stats)
  - **Components:** VendorDashboard, StatCards, RecentProducts
  - **Data:** Product count, assigned stores, performance metrics

**Product Management Routes:**

- [ ] Create `products/index.tsx` - Products list

  - **Permission:** Vendor only (Role.VENDOR)
  - **CRUD:** Read (own products only)
  - **Components:** ProductList, SearchBar, Filters, Pagination
  - **Filters:** By store, by category, by status
  - **Actions:** Create, View, Edit, Delete (own products)

- [ ] Create `products/new.tsx` - Create product

  - **Permission:** Vendor only (Role.VENDOR)
  - **CRUD:** Create (product in own stores)
  - **Components:** ProductForm, StoreSelect
  - **Fields:** name, description, price, comparePrice, images, category, storeId
  - **Validation:** Zod schema
  - **Image Upload:** Drag & drop or file picker
  - **Success:** Redirect to `/products` + toast
  - **Note:** Product immediately visible in Mall app

- [ ] Create `products/$productId.tsx` - Product detail

  - **Permission:** Vendor only (Role.VENDOR)
  - **CRUD:** Read (own product)
  - **Components:** ProductDetail, StoreInfo
  - **Validation:** Ownership check
  - **Actions:** Edit, Delete (if owner)

- [ ] Create `products/$productId/edit.tsx` - Edit product

  - **Permission:** Vendor only (Role.VENDOR)
  - **CRUD:** Update (own product only)
  - **Components:** ProductForm (edit mode)
  - **Validation:** Zod schema + ownership check
  - **Confirmation:** AlertDialog
  - **Success:** Redirect to `/products/$productId` + toast
  - **Note:** Changes immediately visible in Mall app

- [ ] Create `products/$productId/delete.tsx` - Delete product
  - **Permission:** Vendor only (Role.VENDOR)
  - **CRUD:** Delete (own product only)
  - **Components:** DeleteConfirmDialog
  - **Confirmation:** "Are you sure?"
  - **Validation:** Ownership check
  - **Success:** Redirect to `/products` + toast
  - **Note:** Product removed from Mall app

**Store Viewing Routes (READ ONLY):**

- [ ] Create `stores/index.tsx` - Stores list (READ ONLY)

  - **Permission:** Vendor only (Role.VENDOR)
  - **CRUD:** Read (assigned stores only)
  - **Components:** StoreList (read-only)
  - **Data:** Stores assigned by admin
  - **Actions:** View details only (NO edit, NO delete)

- [ ] Create `stores/$storeId.tsx` - Store detail (READ ONLY)
  - **Permission:** Vendor only (Role.VENDOR)
  - **CRUD:** Read (assigned store)
  - **Components:** StoreDetail (read-only), ProductList
  - **Data:** Store info, store products
  - **Actions:** View products only (NO edit store)

**Account Management Routes:**

- [ ] Create `account/index.tsx` - Vendor profile (READ ONLY)

  - **Permission:** Vendor only (Role.VENDOR)
  - **CRUD:** Read (self)
  - **Components:** VendorProfile (read-only except password)
  - **Display:** email, name, company, phone (READ ONLY)
  - **Actions:** Change password only

- [ ] Create `account/profile.tsx` - Profile view (READ ONLY)

  - **Permission:** Vendor only (Role.VENDOR)
  - **CRUD:** Read (self)
  - **Components:** ProfileView (READ ONLY)
  - **Fields:** email, name, company, phone (display only)
  - **Note:** Vendor CANNOT edit these fields

- [ ] Create `account/password.tsx` - Change password (ONLY EDITABLE)

  - **Permission:** Vendor only (Role.VENDOR)
  - **CRUD:** Update (self password ONLY)
  - **Components:** ChangePasswordForm
  - **Fields:** currentPassword, newPassword, confirmPassword
  - **Validation:** Zod schema + server verification
  - **Success:** Toast + email notification
  - **Note:** This is the ONLY field vendor can update

- [ ] Create `account/preferences.tsx` - Preferences
  - **Permission:** Vendor only (Role.VENDOR)
  - **CRUD:** Update (self preferences)
  - **Components:** PreferencesForm
  - **Fields:** language (en/he), theme (light/dark)
  - **Storage:** Zustand + localStorage

#### 6.2.3 Create Page Components (Vendor App)

- [ ] Create `DashboardPage.tsx`

  - [ ] Vendor dashboard
  - [ ] Product statistics
  - [ ] Assigned stores
  - [ ] Performance metrics
  - [ ] Recent products
  - [ ] Integration with multiple hooks

- [ ] Create `ProductsPage.tsx`

  - [ ] Product list (own products only)
  - [ ] Add product button
  - [ ] Search and filters
  - [ ] Integration with useProducts hook (filtered by vendor)

- [ ] Create `CreateProductPage.tsx`

  - [ ] Product form
  - [ ] Store selection (if multiple)
  - [ ] Image upload
  - [ ] Integration with useCreateProduct hook

- [ ] Create `ProductDetailPage.tsx`

  - [ ] Product detail
  - [ ] Store info
  - [ ] Edit and delete buttons (if owner)
  - [ ] Integration with useProduct hook

- [ ] Create `EditProductPage.tsx`

  - [ ] Product form (edit mode)
  - [ ] Integration with useUpdateProduct hook

- [ ] Create `StoresPage.tsx` (READ ONLY)

  - [ ] Store list (assigned stores)
  - [ ] View details button
  - [ ] Integration with useStores hook (filtered by vendor)

- [ ] Create `StoreDetailPage.tsx` (READ ONLY)

  - [ ] Store detail (read-only)
  - [ ] Store products
  - [ ] Integration with useStore hook

- [ ] Create `ProfilePage.tsx` (READ ONLY)

  - [ ] Vendor profile (read-only)
  - [ ] Change password button
  - [ ] Integration with useCurrentVendor hook

- [ ] Create `ChangePasswordPage.tsx`
  - [ ] Change password form
  - [ ] Integration with useUpdatePassword hook

#### 6.2.4 Create Vendor-Specific Components

- [ ] Create `VendorHeader.tsx`

  - [ ] Logo
  - [ ] Navigation (Dashboard, Products, Stores)
  - [ ] User menu
  - [ ] Language switcher
  - [ ] Theme toggle

- [ ] Create `VendorSidebar.tsx`

  - [ ] Navigation links with icons
  - [ ] Collapsible sections
  - [ ] Active link highlighting
  - [ ] Quick stats

- [ ] Create `VendorFooter.tsx`
  - [ ] Links
  - [ ] Copyright
  - [ ] Version info

#### 6.2.5 Configure Vendor App

- [ ] Update `vite.config.ts` with proper settings
- [ ] Configure environment variables
- [ ] Set up proxy for API calls
- [ ] Configure build options
- [ ] Set up dev server port (4201)

#### 6.2.6 Add Vendor-Specific Styling

- [ ] Create `styles/globals.css` with Tailwind imports
- [ ] Add vendor-specific CSS variables
- [ ] Configure theme colors (different from mall and admin)
- [ ] Add custom styles

---

### 6.3 Admin App (apps/admin) - Continued

#### 6.3.1 Setup TanStack Router

- [ ] Install TanStack Router in admin app
- [ ] Create `routes/` directory
- [ ] Configure router in `main.tsx`
- [ ] Set up QueryClient provider
- [ ] Set up AuthProvider
- [ ] Set up i18n provider
- [ ] Set up Toaster for notifications

#### 6.3.2 Create Route Files

- [ ] Create `__root.tsx` - Root layout with AppShell
- [ ] Create `index.tsx` - Redirect to dashboard
- [ ] Create `login.tsx` - Login page route
- [ ] Create `dashboard.tsx` - Admin dashboard route (protected)
- [ ] Create `vendors/index.tsx` - Vendors list route (protected)
- [ ] Create `vendors/new.tsx` - Create vendor route (protected)
- [ ] Create `vendors/$id.tsx` - Vendor detail route (protected)
- [ ] Create `vendors/$id/edit.tsx` - Edit vendor route (protected)
- [ ] Create `stores/index.tsx` - Stores list route (protected)
- [ ] Create `stores/new.tsx` - Create store route (protected)
- [ ] Create `stores/$id.tsx` - Store detail route (protected)
- [ ] Create `stores/$id/edit.tsx` - Edit store route (protected)
- [ ] Create `products/index.tsx` - Products list route (protected)
- [ ] Create `products/$id.tsx` - Product detail route (protected)
- [ ] Create `users/index.tsx` - Users list route (protected)
- [ ] Create `users/$id.tsx` - User detail route (protected)
- [ ] Create `users/$id/edit.tsx` - Edit user route (protected)
- [ ] Create `analytics.tsx` - Analytics route (protected)
- [ ] Create `profile/index.tsx` - Admin profile route (protected)
- [ ] Create `profile/edit.tsx` - Edit profile route (protected)

#### 6.3.3 Create Page Components

- [ ] Create `DashboardPage.tsx`

  - [ ] Admin dashboard component
  - [ ] Platform statistics
  - [ ] Recent activity
  - [ ] Quick actions
  - [ ] Charts and graphs
  - [ ] Integration with multiple hooks

- [ ] Create `VendorsPage.tsx`

  - [ ] Vendor list component
  - [ ] Add vendor button
  - [ ] Search and filters
  - [ ] Integration with useVendors hook

- [ ] Create `CreateVendorPage.tsx`

  - [ ] Vendor form
  - [ ] Integration with useCreateVendor hook

- [ ] Create `VendorDetailPage.tsx`

  - [ ] Vendor detail component
  - [ ] Vendor stores
  - [ ] Vendor stats
  - [ ] Edit and delete buttons
  - [ ] Integration with useVendor hook

- [ ] Create `EditVendorPage.tsx`

  - [ ] Vendor form (edit mode)
  - [ ] Integration with useUpdateVendor hook

- [ ] Create `StoresPage.tsx`

  - [ ] Store list component
  - [ ] Add store button
  - [ ] Search and filters
  - [ ] Integration with useStores hook

- [ ] Create `CreateStorePage.tsx`

  - [ ] Store form
  - [ ] Vendor selection
  - [ ] Integration with useCreateStore hook

- [ ] Create `StoreDetailPage.tsx`

  - [ ] Store detail component
  - [ ] Store products
  - [ ] Edit and delete buttons
  - [ ] Integration with useStore hook

- [ ] Create `EditStorePage.tsx`

  - [ ] Store form (edit mode)
  - [ ] Integration with useUpdateStore hook

- [ ] Create `ProductsPage.tsx`

  - [ ] Product list component
  - [ ] Search and filters
  - [ ] View details button
  - [ ] Integration with useProducts hook

- [ ] Create `ProductDetailPage.tsx`

  - [ ] Product detail component
  - [ ] Store info
  - [ ] Vendor info
  - [ ] Integration with useProduct hook

- [ ] Create `UsersPage.tsx`

  - [ ] User list component
  - [ ] Search and filters
  - [ ] Edit and delete buttons
  - [ ] Integration with useUsers hook

- [ ] Create `UserDetailPage.tsx`

  - [ ] User detail component
  - [ ] User activity
  - [ ] Edit and delete buttons
  - [ ] Integration with useUser hook

- [ ] Create `EditUserPage.tsx`

  - [ ] User form (edit mode)
  - [ ] Integration with useUpdateUser hook

- [ ] Create `AnalyticsPage.tsx`

  - [ ] Admin analytics component
  - [ ] Comprehensive charts
  - [ ] Export reports
  - [ ] Date range selector

- [ ] Create `ProfilePage.tsx`

  - [ ] Admin profile
  - [ ] Edit button
  - [ ] Change password button
  - [ ] Integration with useCurrentUser hook

- [ ] Create `EditProfilePage.tsx`
  - [ ] Profile form
  - [ ] Integration with useUpdateCurrentUser hook

#### 6.3.4 Create Admin-Specific Components

- [ ] Create `AdminHeader.tsx`

  - [ ] Logo
  - [ ] Navigation (Dashboard, Vendors, Stores, Products, Users, Analytics)
  - [ ] User menu
  - [ ] Language switcher
  - [ ] Theme toggle

- [ ] Create `AdminSidebar.tsx`

  - [ ] Navigation links with icons
  - [ ] Collapsible sections
  - [ ] Active link highlighting
  - [ ] Quick stats

- [ ] Create `AdminFooter.tsx`
  - [ ] Links
  - [ ] Copyright
  - [ ] Version info

#### 6.3.5 Configure Admin App

- [ ] Update `vite.config.ts` with proper settings
- [ ] Configure environment variables
- [ ] Set up proxy for API calls
- [ ] Configure build options
- [ ] Set up dev server port (4202)

#### 6.3.6 Add Admin-Specific Styling

- [ ] Create `styles/globals.css` with Tailwind imports
- [ ] Add admin-specific CSS variables
- [ ] Configure theme colors (different from mall and vendor)
- [ ] Add custom styles

---

## Phase 7: Backend Microservices Development (NestJS + RabbitMQ)

> **Architecture:** The backend uses **7 NestJS microservices** with **RabbitMQ** for inter-service communication.
>
> **Service Breakdown:**
>
> - API Gateway (Port 3000) - Single entry point, JWT validation, routing
> - Vendor Service (Port 3001) - Vendor CRUD operations
> - User Service (Port 3002) - User (Customer) CRUD operations
> - Store Service (Port 3003) - Store CRUD operations
> - Product Service (Port 3004) - Product CRUD + Category management
> - Auth Service (Port 3005) - Authentication, JWT tokens, password resets
> - Admin Service (Port 3006) - Platform statistics, audit logs, dashboard metrics
>
> **Reference:** See [`plans/MICROSERVICES_ARCHITECTURE.md`](./MICROSERVICES_ARCHITECTURE.md) for complete architecture details.

---

### 7.1 Setup Microservices Infrastructure

#### 7.1.1 Install NestJS CLI and Core Dependencies

- [ ] Install NestJS CLI globally: `npm install -g @nestjs/cli`
- [ ] Install NestJS core packages:
  - [ ] `@nestjs/common`
  - [ ] `@nestjs/core`
  - [ ] `@nestjs/platform-express`
  - [ ] `@nestjs/microservices`
  - [ ] `@nestjs/config`
  - [ ] `@nestjs/jwt`
  - [ ] `@nestjs/passport`
  - [ ] `passport`
  - [ ] `passport-jwt`
  - [ ] `passport-google-oauth20`

#### 7.1.2 Install Database and ORM

- [ ] Install Prisma:
  - [ ] `@prisma/client`
  - [ ] `prisma`
  - [ ] `pg` (PostgreSQL driver)
- [ ] Install bcrypt for password hashing: `bcrypt`
- [ ] Install class-validator and class-transformer for validation

#### 7.1.3 Install RabbitMQ Client

- [ ] Install RabbitMQ packages:
  - [ ] `amqplib`
  - [ ] `amqp-connection-manager`
- [ ] NestJS microservices transport: Already included in `@nestjs/microservices`

#### 7.1.4 Install Additional Dependencies

- [ ] Install file upload: `multer`, `@nestjs/platform-express`
- [ ] Install AWS SDK for S3: `@aws-sdk/client-s3` (optional)
- [ ] Install Cloudinary SDK: `cloudinary` (optional)
- [ ] Install compression: `compression`
- [ ] Install helmet for security: `helmet`
- [ ] Install CORS: Already included in NestJS
- [ ] Install logging: `winston`, `nest-winston`
- [ ] Install Swagger for API docs: `@nestjs/swagger`, `swagger-ui-express`
- [ ] **Install Redis client: `ioredis`, `@types/ioredis`**

#### 7.1.5 Setup Microservices Project Structure

- [ ] Create `apps/backend/` directory in Nx workspace
- [ ] Generate API Gateway: `nx g @nx/nest:app api-gateway --directory=backend`
- [ ] Generate Vendor Service: `nx g @nx/nest:app vendor-service --directory=backend`
- [ ] Generate User Service: `nx g @nx/nest:app user-service --directory=backend`
- [ ] Generate Store Service: `nx g @nx/nest:app store-service --directory=backend`
- [ ] Generate Product Service: `nx g @nx/nest:app product-service --directory=backend`
- [ ] Generate Auth Service: `nx g @nx/nest:app auth-service --directory=backend`
- [ ] Generate Admin Service: `nx g @nx/nest:app admin-service --directory=backend`

#### 7.1.6 Configure RabbitMQ

- [ ] Install RabbitMQ locally or use Docker:
  ```bash
  docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
  ```
- [ ] Access RabbitMQ Management UI: http://localhost:15672 (guest/guest)

#### 7.1.7 Configure Redis

- [ ] Install Redis locally or use Docker:
  ```bash
  docker run -d --name redis -p 6379:6379 redis:7-alpine redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
  ```
- [ ] Test Redis connection:
  ```bash
  docker exec -it redis redis-cli ping
  # Should return: PONG
  ```
- [ ] Create Redis module in shared library:
  - [ ] Generate shared Redis library: `nx g @nx/js:lib redis --directory=shared`
  - [ ] Create [`RedisModule`](libs/shared/redis/src/lib/redis.module.ts) with global scope
  - [ ] Create [`RedisService`](libs/shared/redis/src/lib/redis.service.ts) with ioredis client
  - [ ] Export Redis configuration from [`@org/config`](libs/shared/config/src/lib/redis.config.ts)
- [ ] Configure Redis connection settings:
  - [ ] Host: `process.env.REDIS_HOST || 'localhost'`
  - [ ] Port: `process.env.REDIS_PORT || 6379`
  - [ ] Password: `process.env.REDIS_PASSWORD` (optional for development)
  - [ ] Retry strategy: Exponential backoff
  - [ ] Max retries: 3
- [ ] Create exchanges for each service:
  - [ ] `vendor.exchange` (topic)
  - [ ] `user.exchange` (topic)
  - [ ] `store.exchange` (topic)
  - [ ] `product.exchange` (topic)
  - [ ] `auth.exchange` (topic)
  - [ ] `admin.exchange` (topic)
- [ ] Create queues for each service:
  - [ ] `vendor.events`
  - [ ] `user.events`
  - [ ] `store.events`
  - [ ] `product.events`
  - [ ] `auth.events`
  - [ ] `admin.events`
- [ ] Configure dead letter queues for error handling
- [ ] Set up queue bindings with routing keys

#### 7.1.7 Setup Docker Compose for Development

- [ ] Create `docker-compose.yml` in workspace root (see MICROSERVICES_ARCHITECTURE.md for template)
- [ ] Add RabbitMQ service (ports 5672, 15672)
- [ ] Add PostgreSQL services (one per microservice):
  - [ ] vendor-db (vendor_db)
  - [ ] user-db (user_db)
  - [ ] store-db (store_db)
  - [ ] product-db (product_db)
  - [ ] auth-db (auth_db)
  - [ ] admin-db (admin_db)
- [ ] Add Redis for caching (optional)
- [ ] Configure service networking
- [ ] Add volume mounts for data persistence
- [ ] Set up health checks for all services

---

### 7.2 API Gateway Development (Port 3000)

#### 7.2.1 Setup API Gateway

- [ ] Configure Express adapter in API Gateway
- [ ] Install and configure Swagger for API documentation
- [ ] Set up CORS, helmet, compression middleware
- [ ] **Import RedisModule from [`@org/redis`](libs/shared/redis/src/index.ts)**
- [ ] **Configure Redis-based rate limiting middleware**
  - [ ] Track requests per IP/user with 60-second sliding window
  - [ ] Set limits: login (5/min), register (3/min), default (100/min)
- [ ] Set up request logging with Winston

#### 7.2.2 Implement JWT Authentication Middleware

- [ ] Create JWT strategy with Passport
- [ ] Implement JWT validation middleware
- [ ] Create role-based guards (Admin, Vendor, Customer)
- [ ] Handle token refresh logic
- [ ] Implement logout (token blacklisting)

#### 7.2.3 Setup Microservice Clients

- [ ] Configure RabbitMQ transport for each microservice
- [ ] Create service clients:
  - [ ] Admin Service client
  - [ ] Vendor Service client
  - [ ] User Service client
  - [ ] Store Service client
  - [ ] Product Service client
  - [ ] Auth Service client
- [ ] Implement retry logic and circuit breakers
- [ ] Add request timeout handling

#### 7.2.4 Create API Gateway Routes

- [ ] Auth routes (`/api/auth/*`) → Auth Service
- [ ] Vendor routes (`/api/vendors/*`) → Admin Service
- [ ] Store routes (`/api/stores/*`) → Admin/Store Service
- [ ] Product routes (`/api/products/*`) → Product Service
- [ ] Users routes (`/api/users/*`) → Admin Service
- [ ] User routes (`/api/user/*`) → User Service
- [ ] Search routes (`/api/search/*`) → Product Service

#### 7.2.5 Implement Response Aggregation

- [ ] Create response transformation interceptors
- [ ] Handle errors from microservices
- [ ] **Implement Redis-based response caching**
  - [ ] Cache GET responses for products (15 min TTL)
  - [ ] Cache GET responses for stores (30 min TTL)
  - [ ] Cache GET responses for categories (1 hour TTL)
  - [ ] Cache search results (5 min TTL)
  - [ ] Implement cache key generation based on route + query params
  - [ ] Add cache invalidation on POST/PUT/DELETE operations
- [ ] Add response compression

---

### 7.3 Database Schema (Database per Service)

> **Important:** Each microservice has its own database for data isolation and independent scaling.

#### 7.3.1 Vendor Service Database (vendor_db)

**Location:** Vendor Service (Port 3001)

- [ ] Create Prisma schema for vendor_db
- [ ] Create `vendors` table

- [ ] Create `vendors` table

  - [ ] id (UUID, primary key)
  - [ ] email (unique, not null)
  - [ ] password (hashed, not null)
  - [ ] name (not null)
  - [ ] companyName (not null)
  - [ ] phone (nullable)
  - [ ] isActive (boolean, default true)
  - [ ] createdAt (timestamp)
  - [ ] updatedAt (timestamp)
  - [ ] **Note:** Vendors are separate entities with their own authentication, NOT linked to users table

- [ ] Run Prisma migrations: `npx prisma migrate dev --name init`
- [ ] Generate Prisma client: `npx prisma generate`

#### 7.3.2 User Service Database (user_db)

**Location:** User Service (Port 3002)

- [ ] Create Prisma schema for user_db
- [ ] Create `users` table

  - [ ] id (UUID, primary key)
  - [ ] email (unique, not null)
  - [ ] password (hashed, not null)
  - [ ] name (not null)
  - [ ] phone (nullable)
  - [ ] role (enum: customer, admin)
  - [ ] avatar (nullable)
  - [ ] isActive (boolean, default true)
  - [ ] createdAt (timestamp)
  - [ ] updatedAt (timestamp)

- [ ] Run Prisma migrations: `npx prisma migrate dev --name init`
- [ ] Generate Prisma client: `npx prisma generate`

#### 7.3.3 Store Service Database (store_db)

**Location:** Store Service (Port 3003)

- [ ] Create Prisma schema for store_db
- [ ] Create `stores` table
  - [ ] id (UUID, primary key)
  - [ ] name (not null)
  - [ ] slug (unique, not null)
  - [ ] url (text, **REQUIRED, not null**) - External website URL for iframe embedding
  - [ ] description (text, nullable)
  - [ ] logo (nullable)
  - [ ] coverImage (nullable)
  - [ ] vendorId (UUID, not null) - Reference to vendor (no FK, cross-service)
  - [ ] isActive (boolean, default true)
  - [ ] productCount (integer, default 0) - Denormalized for performance
  - [ ] createdAt (timestamp)
  - [ ] updatedAt (timestamp)

**Store URL Field Clarification:**

- [ ] Products are stored in Product Service database and managed by vendors
- [ ] The `url` field is **REQUIRED** and used to embed vendor's external website via iframe
- [ ] The store page displays the vendor's external website through iframe
- [ ] This allows vendors to showcase their existing website through the platform
- [ ] Products are managed separately in the Product Service database

- [ ] Run Prisma migrations: `npx prisma migrate dev --name init`
- [ ] Generate Prisma client: `npx prisma generate`

#### 7.3.4 Product Service Database (product_db)

**Location:** Product Service (Port 3004)

- [ ] Create Prisma schema for product_db
- [ ] Create `products` table

  - [ ] id (UUID, primary key)
  - [ ] name (not null)
  - [ ] description (text, nullable)
  - [ ] images (JSON array of strings, nullable) - Stores URLs or server paths
  - [ ] price (decimal, not null)
  - [ ] comparePrice (decimal, nullable)
  - [ ] storeId (UUID, not null) - Reference to store (no FK, cross-service)
  - [ ] categoryId (UUID, nullable) - Foreign key to categories
  - [ ] vendorId (UUID, not null) - Reference to vendor (no FK, cross-service)
  - [ ] isActive (boolean, default true)
  - [ ] createdAt (timestamp)
  - [ ] updatedAt (timestamp)
  - [ ] **Note:** Images stored in S3/Cloudinary, database stores paths as JSON array

- [ ] Create `categories` table

  - [ ] id (UUID, primary key)
  - [ ] name (not null)
  - [ ] slug (unique, not null)
  - [ ] description (text, nullable)
  - [ ] parentId (foreign key to categories, nullable)
  - [ ] createdAt (timestamp)
  - [ ] updatedAt (timestamp)

- [ ] Run Prisma migrations: `npx prisma migrate dev --name init`
- [ ] Generate Prisma client: `npx prisma generate`

#### 7.3.5 Auth Service Database (auth_db)

**Location:** Auth Service (Port 3005)

- [ ] Create Prisma schema for auth_db
- [ ] Create `credentials` table

  - [ ] id (UUID, primary key)
  - [ ] userId (UUID, nullable) - Reference to user
  - [ ] vendorId (UUID, nullable) - Reference to vendor
  - [ ] email (unique, not null)
  - [ ] passwordHash (not null)
  - [ ] role (enum: customer, vendor, admin)
  - [ ] isActive (boolean, default true)
  - [ ] lastLoginAt (timestamp, nullable)
  - [ ] createdAt (timestamp)
  - [ ] updatedAt (timestamp)

- [ ] Create `refresh_tokens` table

  - [ ] id (UUID, primary key)
  - [ ] credentialId (foreign key to credentials)
  - [ ] token (unique, not null)
  - [ ] expiresAt (timestamp)
  - [ ] createdAt (timestamp)
  - [ ] **Note:** Refresh tokens are also stored in Redis for faster validation (7-day TTL)

- [ ] Create `password_resets` table

  - [ ] id (UUID, primary key)
  - [ ] email (not null)
  - [ ] token (unique, not null)
  - [ ] expiresAt (timestamp)
  - [ ] usedAt (timestamp, nullable)
  - [ ] createdAt (timestamp)
  - [ ] **Note:** Password reset tokens are primarily stored in Redis (1-hour TTL), PostgreSQL is backup

- [ ] Run Prisma migrations: `npx prisma migrate dev --name init`
- [ ] Generate Prisma client: `npx prisma generate`

- [ ] **Configure Redis integration for Auth Service:**
  - [ ] Import RedisModule
  - [ ] Implement session management in Redis (24-hour TTL)
  - [ ] Implement refresh token caching (7-day TTL)
  - [ ] Implement password reset token storage (1-hour TTL)
  - [ ] Implement login attempt tracking (15-min TTL, max 5 attempts)
  - [ ] Implement OAuth state management (10-min TTL)

#### 7.3.6 Admin Service Database (admin_db)

**Location:** Admin Service (Port 3006)

**Important:** Admin Service does NOT handle CRUD operations for vendors, users, or stores. It ONLY handles:

- Platform statistics aggregation (by subscribing to events from other services)
- Audit log management
- Dashboard metrics calculation
- System health monitoring

- [ ] Create Prisma schema for admin_db
- [ ] Create `audit_logs` table

  - [ ] id (UUID, primary key)
  - [ ] userId (UUID, nullable) - Reference to user
  - [ ] vendorId (UUID, nullable) - Reference to vendor
  - [ ] action (not null) - CREATE, UPDATE, DELETE, LOGIN, LOGOUT
  - [ ] entity (not null) - vendor, store, product, user, category
  - [ ] entityId (UUID, nullable)
  - [ ] changes (JSON, nullable) - Before/after values for updates
  - [ ] ipAddress (nullable)
  - [ ] userAgent (nullable)
  - [ ] createdAt (timestamp)

- [ ] Create `platform_statistics` table

  - [ ] id (UUID, primary key)
  - [ ] date (date, unique)
  - [ ] totalVendors (integer)
  - [ ] totalUsers (integer)
  - [ ] totalStores (integer)
  - [ ] totalProducts (integer)
  - [ ] activeVendors (integer)
  - [ ] activeUsers (integer)
  - [ ] createdAt (timestamp)
  - [ ] updatedAt (timestamp)

- [ ] Run Prisma migrations: `npx prisma migrate dev --name init`
- [ ] Generate Prisma client: `npx prisma generate`

#### 7.3.7 Cross-Service Data Synchronization

**Important:** Since each service has its own database, data consistency is maintained through RabbitMQ events.

- [ ] When Vendor Service creates a vendor:

  - [ ] Publishes `vendor.created` event
  - [ ] Auth Service subscribes and creates credentials
  - [ ] Admin Service subscribes and updates statistics

- [ ] When User Service creates a user:

  - [ ] Publishes `user.created` event
  - [ ] Auth Service subscribes and creates credentials
  - [ ] Admin Service subscribes and updates statistics

- [ ] When Store Service creates a store:

  - [ ] Publishes `store.created` event
  - [ ] Admin Service subscribes and updates statistics

- [ ] When Product Service creates a product:
  - [ ] Publishes `product.created` event
  - [ ] Store Service subscribes and updates product count
  - [ ] Admin Service subscribes and updates statistics

#### 7.3.8 Audit Log Implementation (Admin Service)

**Purpose:**

- Track all CRUD operations for compliance and security
- Monitor user activities
- Provide audit trail for troubleshooting
- Meet regulatory requirements (GDPR, etc.)

**What to Log:**

- [ ] Vendor CRUD operations (admin only)
- [ ] Store CRUD operations (admin only)
- [ ] Product CRUD operations (vendor and admin)
- [ ] User CRUD operations (admin and self-service)
- [ ] Category CRUD operations (admin only)
- [ ] Login attempts (successful and failed)
- [ ] Logout events
- [ ] Password changes
- [ ] Account deletions

**Audit Log Middleware:**

- [ ] Create `audit.middleware.ts`
  - [ ] Capture request details (user, IP, user agent)
  - [ ] Capture action type (CREATE, UPDATE, DELETE)
  - [ ] Capture entity type and ID
  - [ ] For updates: capture before and after values
  - [ ] Write to audit_logs table asynchronously
  - [ ] Handle logging errors gracefully (don't block requests)

**Audit Log Service:**

- [ ] Create `audit.service.ts`
  - [ ] `logAction(userId, action, entity, entityId, changes, ipAddress, userAgent)`
  - [ ] `getAuditLogs(filters)` - Query audit logs with pagination
  - [ ] `getEntityAuditHistory(entity, entityId)` - Get history for specific entity
  - [ ] `getUserAuditHistory(userId)` - Get user's activity history
  - [ ] `exportAuditLogs(startDate, endDate)` - Export for compliance

**When to Log:**

- **CREATE:** After successful creation
- **UPDATE:** After successful update (include before/after values)
- **DELETE:** Before deletion (capture final state)
- **LOGIN:** After successful authentication
- **LOGOUT:** When user logs out
- **FAILED_LOGIN:** After failed login attempt

**Audit Log Retention:**

- [ ] Keep audit logs for 7 years (regulatory compliance)
- [ ] Implement log rotation/archiving
- [ ] Compress old logs
- [ ] Separate storage for archived logs

**Security Considerations:**

- [ ] Audit logs are append-only (no updates or deletes)
- [ ] Only admins can view audit logs
- [ ] Sensitive data (passwords) never logged
- [ ] IP addresses anonymized after 90 days (GDPR)
- [ ] Regular backup of audit logs

**Admin Audit Log Viewer:**

- [ ] Create admin endpoint: GET `/admin/audit-logs`
- [ ] Filter by: user, action, entity, date range
- [ ] Pagination support
- [ ] Export to CSV/JSON
- [ ] Search functionality

---

### 7.3 Authentication & Authorization

#### 7.3.1 Create Auth Middleware

- [ ] Create `authenticate.middleware.ts`

  - [ ] Verify JWT token
  - [ ] Attach user to request
  - [ ] Handle token expiration
  - [ ] Handle invalid tokens

- [ ] Create `authorize.middleware.ts`
  - [ ] Check user role
  - [ ] Check permissions
  - [ ] Handle unauthorized access

#### 7.3.2 Create Auth Controllers

- [ ] Create `auth.controller.ts`
  - [ ] `login()` - Handle login
  - [ ] `register()` - Handle registration
  - [ ] `logout()` - Handle logout
  - [ ] `refreshToken()` - Handle token refresh
  - [ ] `resetPassword()` - Handle password reset request
  - [ ] `verifyResetToken()` - Verify reset token
  - [ ] `updatePassword()` - Update password with reset token
  - [ ] `googleAuth()` - Handle Google OAuth

#### 7.3.3 Create Auth Services

- [ ] Create `auth.service.ts`
  - [ ] `hashPassword()` - Hash password with bcrypt
  - [ ] `comparePassword()` - Compare password with hash
  - [ ] `generateAccessToken()` - Generate JWT access token
  - [ ] `generateRefreshToken()` - Generate refresh token
  - [ ] `verifyToken()` - Verify JWT token
  - [ ] `generateResetToken()` - Generate password reset token
  - [ ] `sendResetEmail()` - Send password reset email
  - [ ] `verifyGoogleToken()` - Verify Google OAuth token with Google API
  - [ ] `findOrCreateGoogleUser()` - Find existing user or create new from Google profile

#### 7.3.4 Create Auth Routes

- [ ] Create `auth.routes.ts`
  - [ ] POST `/auth/login` - Login endpoint
  - [ ] POST `/auth/register` - Registration endpoint
  - [ ] POST `/auth/logout` - Logout endpoint
  - [ ] POST `/auth/refresh` - Refresh token endpoint
  - [ ] POST `/auth/reset-password` - Request password reset
  - [ ] GET `/auth/verify-reset/:token` - Verify reset token
  - [ ] POST `/auth/update-password` - Update password
  - [ ] POST `/auth/google` - Google OAuth endpoint

#### 7.3.5 Google OAuth Implementation Details

> **Note:** Frontend OAuth implementation should be done in Phase 3 (Authentication) or Phase 4 (Feature Libraries). This section covers both frontend and backend for completeness.

**Prerequisites:**

- [ ] Create Google Cloud Project at console.cloud.google.com
- [ ] Enable Google+ API
- [ ] Create OAuth 2.0 credentials (Client ID and Client Secret)
- [ ] Add authorized redirect URIs for all apps
- [ ] Store credentials in environment variables

**Frontend Implementation (All Apps):**

- [ ] Install Google OAuth library: `@react-oauth/google`
- [ ] Wrap app with GoogleOAuthProvider
- [ ] Create GoogleSignInButton component using GoogleLogin
- [ ] Handle credential response (JWT token from Google)
- [ ] Send Google token to backend `/auth/google` endpoint
- [ ] Store returned JWT tokens using react-auth-kit
- [ ] Redirect user based on role

**Backend Implementation:**

- [ ] Install google-auth-library: `npm install google-auth-library`
- [ ] Create POST `/auth/google` endpoint
- [ ] Verify Google token using google-auth-library
- [ ] Extract user profile (email, name, picture) from verified token
- [ ] Check if user exists in database by email
- [ ] If user exists: Generate JWT tokens and return
- [ ] If user doesn't exist: Create new user with role=customer
- [ ] Set random password (user won't use it, Google OAuth only)
- [ ] Generate JWT tokens and return
- [ ] Handle errors (invalid token, network issues)

**Google OAuth Flow:**

1. User clicks "Sign in with Google" button
2. Google OAuth popup opens
3. User selects Google account and grants permissions
4. Google returns credential (JWT token) to frontend
5. Frontend sends credential to backend `/auth/google`
6. Backend verifies token with Google API
7. Backend finds or creates user
8. Backend generates JWT access and refresh tokens
9. Frontend stores tokens using react-auth-kit
10. User redirected to appropriate dashboard

**Security Considerations:**

- [ ] Verify token signature with Google
- [ ] Check token expiration
- [ ] Validate token audience matches your Client ID
- [ ] Use HTTPS only
- [ ] Store Client Secret securely (backend only)
- [ ] Never expose Client Secret to frontend
- [ ] Implement rate limiting on OAuth endpoint

**Environment Variables Required:**

```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

**Supported Apps:**

- Mall App: Customer registration and login via Google
- Vendor App: Optional (can be added later)
- Admin App: Not recommended (use email/password for security)

---

## 📊 COMPLETE CRUD PERMISSION MATRIX

**Terminology Note:**

- **User** = Database table name (`users`)
- **Customer** = Role/context (mall app users with role='customer')
- API endpoints use `/users`, documentation uses "Customer" for clarity

**Vendor Update Clarification:**

Vendors have **LIMITED UPDATE PERMISSIONS**:

- `PUT /api/vendors/:id` - **Admin only** (can update all fields: email, name, company, phone)
- `PUT /api/vendors/me/password` - **Vendor self only** (can ONLY update own password)
- **Important:** Vendors CANNOT update their profile fields (email, name, company, phone) - only admin can do this
- Vendors can ONLY change their own password via the dedicated password endpoint

| Operation               | Entity               | Admin           | Vendor                   | Customer        |
| ----------------------- | -------------------- | --------------- | ------------------------ | --------------- |
| **VENDOR MANAGEMENT**   |
| Create                  | Vendor               | ✅              | ❌                       | ❌              |
| Read                    | Vendor               | ✅ (all)        | ✅ (self only)           | ❌              |
| Update                  | Vendor               | ✅ (all fields) | ✅ (password only, self) | ❌              |
| Delete                  | Vendor               | ✅              | ❌                       | ❌              |
| **STORE MANAGEMENT**    |
| Create                  | Store                | ✅              | ❌                       | ❌              |
| Read                    | Store                | ✅ (all)        | ✅ (assigned only)       | ✅ (all public) |
| Update                  | Store                | ✅              | ❌                       | ❌              |
| Delete                  | Store                | ✅              | ❌                       | ❌              |
| **PRODUCT MANAGEMENT**  |
| Create                  | Product              | ✅              | ✅ (own only)            | ❌              |
| Read                    | Product              | ✅ (all)        | ✅ (own only)            | ✅ (all public) |
| Update                  | Product              | ✅ (all)        | ✅ (own only)            | ❌              |
| Delete                  | Product              | ✅ (all)        | ✅ (own only)            | ❌              |
| **CUSTOMER MANAGEMENT** |
| Create                  | User (role=customer) | ✅              | ❌                       | ✅ (self)       |
| Read                    | User (role=customer) | ✅ (all)        | ❌                       | ✅ (self)       |
| Update                  | User (role=customer) | ✅ (all)        | ❌                       | ✅ (self)       |
| Delete                  | User (role=customer) | ✅ (all)        | ❌                       | ✅ (self)       |
| **CATEGORY MANAGEMENT** |
| Create                  | Category             | ✅              | ❌                       | ❌              |
| Read                    | Category             | ✅              | ✅                       | ✅              |
| Update                  | Category             | ✅              | ❌                       | ❌              |
| Delete                  | Category             | ✅              | ❌                       | ❌              |

### 7.4 Vendor Service Development (Port 3001)

> **Service Responsibility:** Vendor CRUD operations, vendor profile management, vendor statistics
>
> **Database:** vendor_db (PostgreSQL)
>
> **API Gateway Routes:** `/api/vendors/*` → Vendor Service

#### 7.4.1 Create Vendor Module (NestJS)

- [ ] Generate Vendor module: `nest g module vendor`
- [ ] Generate Vendor controller: `nest g controller vendor`
- [ ] Generate Vendor service: `nest g service vendor`
- [ ] Configure Prisma client for vendor_db
- [ ] Set up RabbitMQ client for event publishing

#### 7.4.2 Create Vendor Controllers (NestJS)

- [ ] Create `vendor.controller.ts`
  - [ ] `@Get()` `getVendors()` - List all vendors (admin only)
  - [ ] `@Get(':id')` `getVendor()` - Get single vendor (admin / vendor self only)
  - [ ] `@Post()` `createVendor()` - Create vendor (admin only)
  - [ ] `@Put(':id')` `updateVendor()` - Update vendor (admin only - all fields)
  - [ ] `@Put('me/password')` `updatePassword()` - Update password (vendor self only)
  - [ ] `@Delete(':id')` `deleteVendor()` - Delete vendor (admin only)
  - [ ] `@Get(':id/stores')` `getVendorStores()` - Get vendor's stores (admin / vendor self only)
  - [ ] `@Get(':id/stats')` `getVendorStats()` - Get vendor statistics (admin only)

#### 7.4.3 Create Vendor Services (NestJS)

- [ ] Create `vendor.service.ts`
  - [ ] `findAll(pagination)` - Find all vendors with pagination
  - [ ] `findById(id)` - Find vendor by ID
  - [ ] `create(data)` - Create new vendor
  - [ ] `update(id, data)` - Update vendor (all fields)
  - [ ] `updatePassword(id, password)` - Update vendor password only
  - [ ] `delete(id)` - Soft delete vendor
  - [ ] `findStores(vendorId)` - Query Store Service for vendor's stores
  - [ ] `getStats(vendorId)` - Calculate vendor statistics

#### 7.4.4 Create Vendor DTOs (Data Transfer Objects)

- [ ] Create `create-vendor.dto.ts`
  - [ ] Use class-validator decorators
  - [ ] Validate email, password, name, companyName, phone
- [ ] Create `update-vendor.dto.ts`
  - [ ] Partial validation for updates
- [ ] Create `update-password.dto.ts`
  - [ ] Validate currentPassword, newPassword, confirmPassword

#### 7.4.5 Implement RabbitMQ Event Publishing

- [ ] Publish `vendor.created` event after successful creation

  - [ ] Event payload: { vendorId, email, name, companyName, createdAt }
  - [ ] Subscribers: Auth Service (create credentials), Admin Service (update stats)

- [ ] Publish `vendor.updated` event after successful update

  - [ ] Event payload: { vendorId, changes, updatedAt }
  - [ ] Subscribers: Auth Service (sync credentials), Admin Service (update stats)

- [ ] Publish `vendor.deleted` event after successful deletion
  - [ ] Event payload: { vendorId, deletedAt }
  - [ ] Subscribers: Store Service (deactivate stores), Auth Service (remove credentials), Admin Service (update stats)

#### 7.4.6 Implement Event Subscribers

- [ ] Subscribe to `store.created` event

  - [ ] Update vendor's store count (denormalized data)

- [ ] Subscribe to `store.deleted` event
  - [ ] Update vendor's store count

#### 7.4.7 Add Authorization Guards

- [ ] Create `AdminGuard` - Only admins can create/update/delete vendors
- [ ] Create `VendorSelfGuard` - Vendors can only access their own data
- [ ] Apply guards to controller methods

#### 7.4.8 API Endpoints Summary

**Vendor Service Endpoints (accessed via API Gateway `/api/vendors/*`):**

```
POST   /api/vendors              - Create vendor (Admin only)
GET    /api/vendors              - List vendors (Admin only)
GET    /api/vendors/:id          - Get vendor (Admin / Vendor self)
PUT    /api/vendors/:id          - Update vendor (Admin only - all fields)
PUT    /api/vendors/me/password  - Update password (Vendor self only)
DELETE /api/vendors/:id          - Delete vendor (Admin only)
GET    /api/vendors/:id/stores   - Get vendor stores (Admin / Vendor self)
GET    /api/vendors/:id/stats    - Get vendor stats (Admin only)
```

**Note:** Admin Service does NOT handle vendor CRUD. It only aggregates vendor statistics via event subscriptions.

---

### 7.5 Store API

#### 7.5.1 Create Store Controllers

- [ ] Create `store.controller.ts`
  - [ ] `getStores()` - Get all stores
  - [ ] `getStore()` - Get single store
  - [ ] `getStoreBySlug()` - Get store by slug
  - [ ] `createStore()` - Create store (admin only)
  - [ ] `updateStore()` - Update store (admin only)
  - [ ] `deleteStore()` - Delete store (admin only)
  - [ ] `getStoreProducts()` - Get store products

#### 7.5.2 Create Store Services

- [ ] Create `store.service.ts`
  - [ ] `findAll()` - Find all stores with pagination
  - [ ] `findById()` - Find store by ID
  - [ ] `findBySlug()` - Find store by slug
  - [ ] `create()` - Create new store
  - [ ] `update()` - Update store
  - [ ] `delete()` - Delete store
  - [ ] `findProducts()` - Find store products
  - [ ] `uploadImage()` - Handle image upload

#### 7.5.3 Create Store Validators

- [ ] Create `store.validator.ts`
  - [ ] Validate store creation data
  - [ ] Validate store update data
  - [ ] Validate slug format
  - [ ] Validate query parameters

#### 7.5.4 Create Store Routes

- [ ] Create `store.routes.ts`
  - [ ] GET `/stores` - List stores (public)
  - [ ] GET `/stores/:id` - Get store (public)
  - [ ] GET `/stores/slug/:slug` - Get store by slug (public)
  - [ ] POST `/stores` - Create store (admin only)
  - [ ] PUT `/stores/:id` - Update store (admin only)
  - [ ] DELETE `/stores/:id` - Delete store (admin only)
  - [ ] GET `/stores/:id/products` - Get store products (public)

---

### 7.6 Product API

#### 7.6.1 Create Product Controllers

- [ ] Create `product.controller.ts`
  - [ ] `getProducts()` - Get all products
  - [ ] `getProduct()` - Get single product
  - [ ] `createProduct()` - Create product (vendor/admin)
  - [ ] `updateProduct()` - Update product (vendor/admin)
  - [ ] `deleteProduct()` - Delete product (vendor/admin)

#### 7.6.2 Create Product Services

- [ ] Create `product.service.ts`
  - [ ] `findAll()` - Find all products with pagination
  - [ ] `findById()` - Find product by ID
  - [ ] `create()` - Create new product
  - [ ] `update()` - Update product
  - [ ] `delete()` - Delete product
  - [ ] `uploadImages()` - Handle image uploads
  - [ ] `deleteImage()` - Delete image
- [ ] **Implement Redis caching in Product Service:**
  - [ ] Import RedisModule
  - [ ] Cache individual products (15 min TTL)
  - [ ] Cache product lists with filters (10 min TTL)
  - [ ] Cache search results (5 min TTL)
  - [ ] Cache category tree (1 hour TTL)
  - [ ] Track product view counts in Redis
  - [ ] Implement cache invalidation on create/update/delete
  - [ ] Subscribe to RabbitMQ events for cache invalidation

#### 7.6.3 Create Product Validators

- [ ] Create `product.validator.ts`
  - [ ] Validate product creation data
  - [ ] Validate product update data
  - [ ] Validate price values
  - [ ] Validate query parameters

#### 7.6.4 Create Product Routes

- [ ] Create `product.routes.ts`
  - [ ] GET `/products` - List products (public)
  - [ ] GET `/products/:id` - Get product (public)
  - [ ] POST `/products` - Create product (vendor/admin)
  - [ ] PUT `/products/:id` - Update product (vendor/admin)
  - [ ] DELETE `/products/:id` - Delete product (vendor/admin)

---

### 7.7 User API

#### 7.7.1 Create User Controllers

- [ ] Create `user.controller.ts`
  - [ ] `getUsers()` - Get all users (admin only)
  - [ ] `getUser()` - Get single user (admin only)
  - [ ] `getCurrentUser()` - Get current user
  - [ ] `updateUser()` - Update user (admin only)
  - [ ] `updateCurrentUser()` - Update current user
  - [ ] `deleteUser()` - Delete user (admin only)
  - [ ] `deleteCurrentUser()` - Delete current user

#### 7.7.2 Create User Services

- [ ] Create `user.service.ts`
  - [ ] `findAll()` - Find all users with pagination
  - [ ] `findById()` - Find user by ID
  - [ ] `update()` - Update user
  - [ ] `delete()` - Delete user

#### 7.7.3 Create User Validators

- [ ] Create `user.validator.ts`
  - [ ] Validate user update data
  - [ ] Validate email format
  - [ ] Validate query parameters

#### 7.7.4 Create User Routes

- [ ] Create `user.routes.ts`
  - [ ] GET `/users` - List users (admin only)
  - [ ] GET `/users/me` - Get current user (authenticated)
  - [ ] GET `/users/:id` - Get user (admin only)
  - [ ] PUT `/users/me` - Update current user (authenticated)
  - [ ] PUT `/users/:id` - Update user (admin only)
  - [ ] DELETE `/users/me` - Delete current user (authenticated)
  - [ ] DELETE `/users/:id` - Delete user (admin only)

---

### 7.8 Email Notification (Part of Auth Service)

> **Important:** Email functionality is part of **Auth Service (Port 3005)**, NOT a separate microservice.
>
> **Rationale:** Auth Service handles user registration, password resets, and authentication events - all of which require email notifications. Keeping email logic in Auth Service reduces complexity and latency.

#### 7.8.1 Setup Email Module in Auth Service

- [ ] Install email library in Auth Service: `@nestjs-modules/mailer` or `@sendgrid/mail`
- [ ] Configure email service provider (SendGrid, AWS SES, or SMTP)
- [ ] Create `email/` directory in Auth Service
- [ ] Create email templates directory: `auth-service/src/email/templates/`
- [ ] Set up environment variables for email configuration

#### 7.8.2 Create Email Templates

- [ ] Create `templates/welcome-email.html`

  - [ ] Welcome message for new customers
  - [ ] Platform introduction
  - [ ] Getting started guide link

- [ ] Create `templates/vendor-credentials.html`

  - [ ] Vendor account created notification
  - [ ] Login credentials (email and temporary password)
  - [ ] Link to vendor dashboard
  - [ ] Instructions to change password

- [ ] Create `templates/password-reset.html`

  - [ ] Password reset request confirmation
  - [ ] Reset link with token (expires in 1 hour)
  - [ ] Security notice

- [ ] Create `templates/password-changed.html`

  - [ ] Password successfully changed notification
  - [ ] Security alert
  - [ ] Contact support if not initiated by user

- [ ] Create `templates/account-deleted.html`
  - [ ] Account deletion confirmation
  - [ ] Data removal notice
  - [ ] Feedback request (optional)

#### 7.8.3 Create Email Service

- [ ] Create `email.service.ts`
  - [ ] `sendEmail(to, subject, html)` - Generic email sender
  - [ ] `sendWelcomeEmail(user)` - Send welcome email to new customers
  - [ ] `sendVendorCredentials(vendor, password)` - Send credentials to new vendor
  - [ ] `sendPasswordResetEmail(user, resetToken)` - Send password reset link
  - [ ] `sendPasswordChangedEmail(user)` - Notify password change
  - [ ] `sendAccountDeletedEmail(user)` - Confirm account deletion
  - [ ] Handle email sending errors gracefully
  - [ ] Log email sending attempts

#### 7.8.4 Email Configuration

**Environment Variables:**

```
EMAIL_SERVICE=sendgrid
EMAIL_FROM=noreply@yourplatform.com
EMAIL_FROM_NAME=Your Platform Name
SENDGRID_API_KEY=your-api-key
```

**When to Send Emails:**

- Customer registers → Send welcome email
- Admin creates vendor → Send vendor credentials
- User requests password reset → Send reset link
- User changes password → Send confirmation
- User deletes account → Send confirmation

**Email Best Practices:**

- [ ] Use responsive HTML templates
- [ ] Include plain text alternative
- [ ] Add unsubscribe link (for marketing emails)
- [ ] Use clear subject lines
- [ ] Include company branding
- [ ] Test emails before deployment
- [ ] Handle bounced emails
- [ ] Implement rate limiting

---

### 7.9 Category Management (Part of Product Service)

> **Important:** Categories are managed by **Product Service (Port 3004)**, NOT a separate service.
>
> **Database:** product_db (same database as products)
>
> **API Gateway Routes:** `/api/categories/*` → Product Service

#### 7.9.1 Create Category Module in Product Service

- [ ] Add Category module to Product Service
- [ ] Generate Category controller: `nest g controller category`
- [ ] Generate Category service: `nest g service category`
- [ ] Use same Prisma client as products (product_db)

#### 7.9.2 Create Category Controllers (NestJS)

- [ ] Create `category.controller.ts` in Product Service
  - [ ] `@Get()` `getCategories()` - Get all categories (public)
  - [ ] `@Get(':id')` `getCategory()` - Get single category (public)
  - [ ] `@Post()` `createCategory()` - Create category (admin only)
  - [ ] `@Put(':id')` `updateCategory()` - Update category (admin only)
  - [ ] `@Delete(':id')` `deleteCategory()` - Delete category (admin only)
  - [ ] `@Get(':id/products')` `getCategoryProducts()` - Get products in category (public)

#### 7.9.3 Create Category Services (NestJS)

- [ ] Create `category.service.ts` in Product Service
  - [ ] `findAll()` - Find all categories (with hierarchy)
  - [ ] `findById(id)` - Find category by ID
  - [ ] `findBySlug(slug)` - Find category by slug
  - [ ] `create(data)` - Create new category
  - [ ] `update(id, data)` - Update category
  - [ ] `delete(id)` - Delete category (check for products first)
  - [ ] `getProductCount(categoryId)` - Count products in category

#### 7.9.4 Create Category DTOs

- [ ] Create `create-category.dto.ts`
  - [ ] Validate name, slug, description, parentId
- [ ] Create `update-category.dto.ts`
  - [ ] Partial validation for updates

#### 7.9.5 Category-Product Relationship

- [ ] Products table already has `categoryId` foreign key
- [ ] When deleting category, handle products:
  - [ ] Option 1: Prevent deletion if products exist
  - [ ] Option 2: Set products' categoryId to null
  - [ ] Option 3: Move products to parent category

#### 7.9.6 API Endpoints Summary

**Category Endpoints (accessed via API Gateway `/api/categories/*`):**

```
GET    /api/categories              - List all categories (Public)
GET    /api/categories/:id          - Get category (Public)
GET    /api/categories/:id/products - Get category products (Public)
POST   /api/categories              - Create category (Admin only)
PUT    /api/categories/:id          - Update category (Admin only)
DELETE /api/categories/:id          - Delete category (Admin only)
```

**Note:** Categories are stored in product_db and managed by Product Service because they are tightly coupled with products.

---

### 7.10 Search API

#### 7.10.1 Create Search Controllers

- [ ] Create `search.controller.ts`
  - [ ] `searchProducts()` - Search products
  - [ ] `searchStores()` - Search stores
  - [ ] `getSuggestions()` - Get search suggestions

#### 7.10.2 Create Search Services

- [ ] Create `search.service.ts`
  - [ ] `searchProducts()` - Full-text search for products
  - [ ] `searchStores()` - Full-text search for stores
  - [ ] `getSuggestions()` - Get autocomplete suggestions
  - [ ] Implement search indexing

#### 7.10.3 Create Search Routes

- [ ] Create `search.routes.ts`
  - [ ] GET `/search/products` - Search products (public)
  - [ ] GET `/search/stores` - Search stores (public)
  - [ ] GET `/search/suggestions` - Get suggestions (public)

---

### 7.11 File Upload

#### 7.11.1 Configure File Upload

- [ ] Set up multer middleware
- [ ] Configure storage (local or cloud)
- [ ] Set file size limits
- [ ] Set allowed file types
- [ ] Configure image processing (resize, compress)

---

### 7.12 Error Handling & Logging

#### 7.12.1 Create Error Handlers

- [ ] Create `error.middleware.ts`
  - [ ] Handle validation errors
  - [ ] Handle authentication errors
  - [ ] Handle authorization errors
  - [ ] Handle not found errors
  - [ ] Handle server errors
  - [ ] Format error responses

#### 7.12.2 Create Logger

- [ ] Create `logger.service.ts`
  - [ ] Log requests
  - [ ] Log errors
  - [ ] Log database queries
  - [ ] Configure log levels
  - [ ] Configure log rotation

---

## Phase 8: Testing

### 8.1 Unit Testing

#### 8.1.1 Setup Testing Infrastructure

- [ ] Configure Vitest for all libraries
- [ ] Set up test utilities
- [ ] Create test helpers
- [ ] Configure coverage reporting

#### 8.1.2 Test Shared Libraries

- [ ] Test utility functions in libs/shared/utils

  - [ ] Test formatting functions
  - [ ] Test validation functions
  - [ ] Test string utilities
  - [ ] Test array utilities
  - [ ] Test object utilities

- [ ] Test Zod schemas in libs/shared/types

  - [ ] Test user schema validation
  - [ ] Test vendor schema validation
  - [ ] Test store schema validation
  - [ ] Test product schema validation
  - [ ] Test form schema validation

- [ ] Test API services in libs/shared/data-access
  - [ ] Mock Axios calls
  - [ ] Test service functions
  - [ ] Test error handling

#### 8.1.3 Test Feature Libraries

- [ ] Test auth components

  - [ ] Test LoginForm
  - [ ] Test RegisterForm
  - [ ] Test auth guards

- [ ] Test vendor components

  - [ ] Test VendorForm
  - [ ] Test VendorList
  - [ ] Test VendorCard

- [ ] Test store components

  - [ ] Test StoreForm
  - [ ] Test StoreList
  - [ ] Test StoreCard

- [ ] Test product components

  - [ ] Test ProductForm
  - [ ] Test ProductList
  - [ ] Test ProductCard

- [ ] Test user components
  - [ ] Test UserForm
  - [ ] Test UserList
  - [ ] Test UserProfile

#### 8.1.4 Test Backend Microservices (NestJS)

> **Important:** Testing microservices requires NestJS testing utilities and RabbitMQ event testing.

- [ ] Test Auth Service (Port 3005)

  - [ ] Use NestJS testing module: `@nestjs/testing`
  - [ ] Test authentication logic
  - [ ] Test JWT token generation/validation
  - [ ] Test password hashing
  - [ ] Test email sending (mock email service)
  - [ ] Test RabbitMQ event publishing

- [ ] Test Vendor Service (Port 3001)

  - [ ] Test vendor CRUD operations
  - [ ] Test Prisma database interactions
  - [ ] Test RabbitMQ event publishing (vendor.created, vendor.updated, vendor.deleted)
  - [ ] Test authorization guards

- [ ] Test User Service (Port 3002)

  - [ ] Test user CRUD operations
  - [ ] Test Prisma database interactions
  - [ ] Test RabbitMQ event publishing (user.created, user.updated, user.deleted)

- [ ] Test Store Service (Port 3003)

  - [ ] Test store CRUD operations
  - [ ] Test RabbitMQ event subscriptions (vendor.deleted)
  - [ ] Test RabbitMQ event publishing (store.created, store.updated, store.deleted)

- [ ] Test Product Service (Port 3004)

  - [ ] Test product CRUD operations
  - [ ] Test category CRUD operations
  - [ ] Test RabbitMQ event subscriptions (store.deleted)
  - [ ] Test RabbitMQ event publishing (product.created, product.updated, product.deleted)
  - [ ] Test search functionality

- [ ] Test Admin Service (Port 3006)

  - [ ] Test statistics aggregation
  - [ ] Test audit log creation
  - [ ] Test RabbitMQ event subscriptions (all service events)
  - [ ] Test dashboard metrics calculation

- [ ] Test API Gateway (Port 3000)

  - [ ] Test routing to microservices
  - [ ] Test JWT authentication middleware
  - [ ] Test rate limiting
  - [ ] Test request/response transformation

- [ ] Test RabbitMQ Event Flow
  - [ ] Test event publishing
  - [ ] Test event subscription
  - [ ] Test event retry mechanisms
  - [ ] Test dead letter queue handling

---

### 8.2 Integration Testing

#### 8.2.1 Test API Endpoints

- [ ] Test auth endpoints

  - [ ] Test login flow
  - [ ] Test registration flow
  - [ ] Test password reset flow
  - [ ] Test token refresh

- [ ] Test vendor endpoints

  - [ ] Test CRUD operations
  - [ ] Test authorization
  - [ ] Test validation

- [ ] Test store endpoints

  - [ ] Test CRUD operations
  - [ ] Test authorization
  - [ ] Test validation

- [ ] Test product endpoints

  - [ ] Test CRUD operations
  - [ ] Test authorization
  - [ ] Test validation
  - [ ] Test image upload

- [ ] Test user endpoints
  - [ ] Test CRUD operations
  - [ ] Test authorization
  - [ ] Test validation

#### 8.2.2 Test Frontend Data Flow

- [ ] Test TanStack Query hooks

  - [ ] Test data fetching
  - [ ] Test mutations
  - [ ] Test cache invalidation
  - [ ] Test optimistic updates

- [ ] Test form submissions
  - [ ] Test validation
  - [ ] Test error handling
  - [ ] Test success handling

---

### 8.3 End-to-End Testing

#### 8.3.1 Setup Playwright

- [ ] Configure Playwright
- [ ] Set up test fixtures
- [ ] Create page objects
- [ ] Configure test environments

#### 8.3.2 Test Mall App User Journeys

- [ ] Test customer registration

  - [ ] Fill registration form
  - [ ] Submit form
  - [ ] Verify account created
  - [ ] Verify auto-login

- [ ] Test customer login

  - [ ] Fill login form
  - [ ] Submit form
  - [ ] Verify redirect to stores

- [ ] Test browsing stores

  - [ ] Navigate to stores page
  - [ ] View store list
  - [ ] Click on store
  - [ ] View store details

- [ ] Test browsing products

  - [ ] Navigate to products page
  - [ ] View product list
  - [ ] Apply filters
  - [ ] Click on product
  - [ ] View product details

- [ ] Test search functionality

  - [ ] Enter search query
  - [ ] View search results
  - [ ] Apply filters
  - [ ] Click on result

- [ ] Test favorites

  - [ ] Add product to favorites
  - [ ] View favorites page
  - [ ] Remove from favorites

- [ ] Test profile management
  - [ ] View profile
  - [ ] Edit profile
  - [ ] Change password
  - [ ] Delete account

#### 8.3.3 Test Vendor App User Journeys

- [ ] Test vendor login

  - [ ] Fill login form
  - [ ] Submit form
  - [ ] Verify redirect to dashboard

- [ ] Test vendor dashboard

  - [ ] View statistics
  - [ ] View recent products
  - [ ] Navigate to products

- [ ] Test product creation

  - [ ] Click add product
  - [ ] Fill product form
  - [ ] Upload images
  - [ ] Submit form
  - [ ] Verify product created

- [ ] Test product editing

  - [ ] Navigate to product
  - [ ] Click edit
  - [ ] Modify fields
  - [ ] Submit form
  - [ ] Verify product updated

- [ ] Test product deletion

  - [ ] Navigate to product
  - [ ] Click delete
  - [ ] Confirm deletion
  - [ ] Verify product deleted

- [ ] Test viewing stores
  - [ ] Navigate to stores
  - [ ] View store list
  - [ ] Click on store
  - [ ] View store details

#### 8.3.4 Test Admin App User Journeys

- [ ] Test admin login

  - [ ] Fill login form
  - [ ] Submit form
  - [ ] Verify redirect to dashboard

- [ ] Test admin dashboard

  - [ ] View platform statistics
  - [ ] View recent activity
  - [ ] Navigate to sections

- [ ] Test vendor management

  - [ ] View vendor list
  - [ ] Create new vendor
  - [ ] Edit vendor
  - [ ] Delete vendor

- [ ] Test store management

  - [ ] View store list
  - [ ] Create new store
  - [ ] Assign to vendor
  - [ ] Edit store
  - [ ] Delete store

- [ ] Test product viewing

  - [ ] View all products
  - [ ] Filter by store
  - [ ] View product details

- [ ] Test user management
  - [ ] View user list
  - [ ] Edit user
  - [ ] Delete user

---

### 8.4 Visual Regression Testing

#### 8.4.1 Setup Storybook Testing

- [ ] Configure Storybook test runner
- [ ] Set up visual regression testing
- [ ] Create baseline screenshots
- [ ] Configure CI/CD integration

#### 8.4.2 Test Component States

- [ ] Test all component variants
- [ ] Test loading states
- [ ] Test error states
- [ ] Test empty states
- [ ] Test responsive layouts
- [ ] Test dark mode

---

## Phase 9: Deployment & DevOps

### 9.1 CI/CD Pipeline

#### 9.1.1 Setup GitHub Actions

- [ ] Create `.github/workflows/ci.yml`

  - [ ] Run linting on every commit
  - [ ] Run type checking
  - [ ] Run unit tests
  - [ ] Run integration tests
  - [ ] Generate coverage reports
  - [ ] Build affected apps

- [
