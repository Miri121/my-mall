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
  - **Fields:** name, description, price, comparePrice, images, category, stock, storeId
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

## Phase 7: Backend API Development

### 7.1 API Setup & Configuration

#### 7.1.1 Install Backend Dependencies

- [ ] Install Express.js (already installed)
- [ ] Install database ORM (Prisma)
- [ ] Install bcrypt for password hashing
- [ ] Install jsonwebtoken for JWT tokens
- [ ] Install express-validator for validation
- [ ] Install multer for file uploads
- [ ] Install cors for CORS handling
- [ ] Install helmet for security headers
- [ ] Install compression for response compression
- [ ] Install morgan for logging
- [ ] Install dotenv for environment variables

#### 7.1.2 Configure Database

- [ ] Choose database (PostgreSQL recommended or MongoDB)
- [ ] Set up database connection
- [ ] Create database schema
- [ ] Set up migrations
- [ ] Create seed data for development

#### 7.1.3 Setup API Structure

- [ ] Create `src/config/` directory for configuration
- [ ] Create `src/middleware/` directory for middleware
- [ ] Create `src/routes/` directory for routes
- [ ] Create `src/controllers/` directory for controllers
- [ ] Create `src/services/` directory for business logic
- [ ] Create `src/models/` directory for data models
- [ ] Create `src/utils/` directory for utilities
- [ ] Create `src/validators/` directory for validation schemas

---

### 7.2 Database Schema

#### 7.2.1 Create User Tables

- [ ] Create `users` table
  - [ ] id (UUID, primary key)
  - [ ] email (unique, not null)
  - [ ] password (hashed, not null)
  - [ ] name (not null)
  - [ ] phone (nullable)
  - [ ] role (enum: customer, vendor, admin)
  - [ ] avatar (nullable)
  - [ ] isActive (boolean, default true)
  - [ ] createdAt (timestamp)
  - [ ] updatedAt (timestamp)

#### 7.2.2 Create Vendor Tables

- [ ] Create `vendors` table
  - [ ] id (UUID, primary key)
  - [ ] companyName (not null)
  - [ ] email (unique, not null)
  - [ ] password (hashed, not null)
  - [ ] name (not null)
  - [ ] phone (nullable)
  - [ ] role (enum: customer, vendor, admin)
  - [ ] isActive (boolean, default true)
  - [ ] createdAt (timestamp)
  - [ ] updatedAt (timestamp)

#### 7.2.3 Create Store Tables

- [ ] Create `stores` table
  - [ ] id (UUID, primary key)
  - [ ] name (not null)
  - [ ] slug (unique, not null)
  - [ ] url (text, not null)
  - [ ] description (text, nullable)
  - [ ] logo (nullable)
  - [ ] coverImage (nullable)
  - [ ] vendorId (foreign key to vendors)
  - [ ] isActive (boolean, default true)
  - [ ] createdAt (timestamp)
  - [ ] updatedAt (timestamp)

#### 7.2.4 Create Product Tables

- [ ] Create `products` table

  - [ ] id (UUID, primary key)
  - [ ] name (not null)
  - [ ] description (text, nullable)
  - [ ] img (text (url), not null)
  - [ ] price (decimal, not null)
  - [ ] comparePrice (decimal, nullable)
  - [ ] storeId (foreign key to stores)
  - [ ] categoryId (foreign key to categories, nullable)
  - [ ] isActive (boolean, default true)
  - [ ] createdAt (timestamp)
  - [ ] updatedAt (timestamp)

#### 7.2.5 Create Category Tables

- [ ] Create `categories` table
  - [ ] id (UUID, primary key)
  - [ ] name (not null)
  - [ ] slug (unique, not null)
  - [ ] description (text, nullable)
  - [ ] parentId (foreign key to categories, nullable)
  - [ ] createdAt (timestamp)
  - [ ] updatedAt (timestamp)

#### 7.2.6 Create Session Tables

- [ ] Create `refresh_tokens` table
  - [ ] id (UUID, primary key)
  - [ ] userId (foreign key to users)
  - [ ] token (unique, not null)
  - [ ] expiresAt (timestamp)
  - [ ] createdAt (timestamp)

#### 7.2.7 Create Audit Tables

- [ ] Create `audit_logs` table
  - [ ] id (UUID, primary key)
  - [ ] userId (foreign key to users, nullable)
  - [ ] action (not null)
  - [ ] entity (not null)
  - [ ] entityId (UUID, nullable)
  - [ ] changes (JSON, nullable)
  - [ ] ipAddress (nullable)
  - [ ] userAgent (nullable)
  - [ ] createdAt (timestamp)

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

---

## 📊 COMPLETE CRUD PERMISSION MATRIX

| Operation                      | Entity          | Admin           | Vendor                   | Customer        |
| ------------------------------ | --------------- | --------------- | ------------------------ | --------------- |
| **VENDOR MANAGEMENT**          |
| Create                         | Vendor          | ✅              | ❌                       | ❌              |
| Read                           | Vendor          | ✅ (all)        | ✅ (self only)           | ❌              |
| Update                         | Vendor          | ✅ (all fields) | ✅ (password only, self) | ❌              |
| Delete                         | Vendor          | ✅              | ❌                       | ❌              |
| **STORE MANAGEMENT**           |
| Create                         | Store           | ✅              | ❌                       | ❌              |
| Read                           | Store           | ✅ (all)        | ✅ (assigned only)       | ✅ (all public) |
| Update                         | Store           | ✅              | ❌                       | ❌              |
| Delete                         | Store           | ✅              | ❌                       | ❌              |
| **PRODUCT MANAGEMENT**         |
| Create                         | Product         | ✅              | ✅ (own only)            | ❌              |
| Read                           | Product         | ✅ (all)        | ✅ (own only)            | ✅ (all public) |
| Update                         | Product         | ✅ (all)        | ✅ (own only)            | ❌              |
| Delete                         | Product         | ✅ (all)        | ✅ (own only)            | ❌              |
| **USER (CUSTOMER) MANAGEMENT** |
| Create                         | User (Customer) | ✅              | ❌                       | ✅ (self)       |
| Read                           | User (Customer) | ✅ (all)        | ❌                       | ✅ (self)       |
| Update                         | User (Customer) | ✅ (all)        | ❌                       | ✅ (self)       |
| Delete                         | User (Customer) | ✅ (all)        | ❌                       | ✅ (self)       |

### 7.4 Vendor API

#### 7.4.1 Create Vendor Controllers

- [ ] Create `vendor.controller.ts`
  - [ ] `getVendors()` - Get all vendors (admin only)
  - [ ] `getVendor()` - Get single vendor (admin / vendor self only)
  - [ ] `createVendor()` - Create vendor (admin only)
  - [ ] `updateVendor()` - Update vendor (admin / vendor self only password)
  - [ ] `deleteVendor()` - Delete vendor (admin only)
  - [ ] `getVendorStores()` - Get vendor's stores (admin/ vendor self only)
  - [ ] `getVendorStats()` - Get vendor statistics (admin only)

#### 7.4.2 Create Vendor Services

- [ ] Create `vendor.service.ts`
  - [ ] `findAll()` - Find all vendors with pagination
  - [ ] `findById()` - Find vendor by ID
  - [ ] `create()` - Create new vendor
  - [ ] `update()` - Update vendor
  - [ ] `delete()` - Delete vendor
  - [ ] `findStores()` - Find vendor's stores
  - [ ] `getStats()` - Calculate vendor statistics

#### 7.4.3 Create Vendor Validators

- [ ] Create `vendor.validator.ts`
  - [ ] Validate vendor creation data
  - [ ] Validate vendor update data
  - [ ] Validate query parameters

#### 7.4.4 Create Vendor Routes

- [ ] Create `vendor.routes.ts`
  - [ ] GET `/vendors` - List vendors (admin only)
  - [ ] GET `/vendors/:id` - Get vendor (admin/vendor self only)
  - [ ] POST `/vendors` - Create vendor (admin only)
  - [ ] PUT `/vendors/:id` - Update vendor (admin / vendor self only password)
  - [ ] DELETE `/vendors/:id` - Delete vendor (admin only)
  - [ ] GET `/vendors/:id/stores` - Get vendor stores (admin/ vendor self only)
  - [ ] GET `/vendors/:id/stats` - Get vendor stats (admin only)

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
  - [ ] `updateStock()` - Update stock quantity

#### 7.6.3 Create Product Validators

- [ ] Create `product.validator.ts`
  - [ ] Validate product creation data
  - [ ] Validate product update data
  - [ ] Validate price values
  - [ ] Validate stock values
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
  - [ ] `uploadAvatar()` - Handle avatar upload

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

### 7.8 Category API

#### 7.8.1 Create Category Controllers

- [ ] Create `category.controller.ts`
  - [ ] `getCategories()` - Get all categories
  - [ ] `getCategory()` - Get single category
  - [ ] `createCategory()` - Create category (admin only)
  - [ ] `updateCategory()` - Update category (admin only)
  - [ ] `deleteCategory()` - Delete category (admin only)

#### 7.8.2 Create Category Services

- [ ] Create `category.service.ts`
  - [ ] `findAll()` - Find all categories
  - [ ] `findById()` - Find category by ID
  - [ ] `create()` - Create new category
  - [ ] `update()` - Update category
  - [ ] `delete()` - Delete category

#### 7.8.3 Create Category Validators

- [ ] Create `category.validator.ts`
  - [ ] Validate category creation data
  - [ ] Validate category update data
  - [ ] Validate slug format

#### 7.8.4 Create Category Routes

- [ ] Create `category.routes.ts`
  - [ ] GET `/categories` - List categories (public)
  - [ ] GET `/categories/:id` - Get category (public)
  - [ ] POST `/categories` - Create category (admin only)
  - [ ] PUT `/categories/:id` - Update category (admin only)
  - [ ] DELETE `/categories/:id` - Delete category (admin only)

---

### 7.9 Search API

#### 7.9.1 Create Search Controllers

- [ ] Create `search.controller.ts`
  - [ ] `searchProducts()` - Search products
  - [ ] `searchStores()` - Search stores
  - [ ] `getSuggestions()` - Get search suggestions

#### 7.9.2 Create Search Services

- [ ] Create `search.service.ts`
  - [ ] `searchProducts()` - Full-text search for products
  - [ ] `searchStores()` - Full-text search for stores
  - [ ] `getSuggestions()` - Get autocomplete suggestions
  - [ ] Implement search indexing

#### 7.9.3 Create Search Routes

- [ ] Create `search.routes.ts`
  - [ ] GET `/search/products` - Search products (public)
  - [ ] GET `/search/stores` - Search stores (public)
  - [ ] GET `/search/suggestions` - Get suggestions (public)

---

### 7.10 File Upload

#### 7.10.1 Configure File Upload

- [ ] Set up multer middleware
- [ ] Configure storage (local or cloud)
- [ ] Set file size limits
- [ ] Set allowed file types
- [ ] Configure image processing (resize, compress)

---

### 7.11 Error Handling & Logging

#### 7.11.1 Create Error Handlers

- [ ] Create `error.middleware.ts`
  - [ ] Handle validation errors
  - [ ] Handle authentication errors
  - [ ] Handle authorization errors
  - [ ] Handle not found errors
  - [ ] Handle server errors
  - [ ] Format error responses

#### 7.11.2 Create Logger

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

#### 8.1.4 Test Backend Services

- [ ] Test auth service
- [ ] Test vendor service
- [ ] Test store service
- [ ] Test product service
- [ ] Test user service
- [ ] Test search service

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
