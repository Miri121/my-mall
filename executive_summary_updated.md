# E-Commerce Platform - Executive Summary

## Complete Architecture Overview (Non-Technical)

---

## What We're Building

A multi-tenant e-commerce marketplace where:

- **Admins** control the entire platform and onboard vendors
- **Vendors** manage their product catalogs
- **Customers** browse stores and products (viewing only, no purchasing)

---

## The Big Picture: Thin App, Thick Library Philosophy

### What This Means

Instead of building three completely separate applications from scratch, we're building:

**ONE set of smart, reusable components** (the "thick libraries") that contain all the business logic, data handling, forms, and intelligence.

**THREE thin application shells** (Mall, Vendor, Admin) that are basically just:

- Navigation menus
- Page layouts
- Routing configuration
- App-specific theming

This approach means:

- ✅ Write business logic once, use it everywhere
- ✅ Fix a bug once, it's fixed in all three apps
- ✅ Add a feature once, available to all apps
- ✅ Consistent user experience across all apps
- ✅ Much faster development
- ✅ Easier to maintain and test

---

## Platform Workflow

### 1. Admin Creates the Foundation

The Admin app is the control center where administrators:

- **Create, update, or delete vendor and user accounts** (email, name, company, password) or Google OAuth
- **Create, update, or delete stores** and assign them to vendors
- View all users, stores, and products on the platform
- Monitor platform activity and statistics
- Moderate content if needed

### 2. Vendors Manage Products

Once a vendor account is created by admin, vendors:

- Log into the Vendor app
- See the store(s) assigned to them
- **Create, update, or delete products** with names, descriptions, prices, images
- Manage inventory (stock levels)
- Organize products by categories

### 3. Customers Manage Account,

and Browse Everything
Mall users (customers) can:

- **Create, update, or delete their own account**
- Browse all active stores on the platform
- View products from any store
- Search across all products
- Filter by category, price range, etc.
- View detailed product information
- Save favorite stores and products
- **Note: No purchasing capability** - this is a view-only marketplace

---

## Technical Architecture Breakdown

### The Monorepo Structure

Everything lives in one codebase organized into folders:

**Apps Folder** (The three thin shells):

1. **Mall App** - Customer-facing storefront
2. **Vendor App** - Product management dashboard
3. **Admin App** - Platform administration panel

**Libs Folder** (The thick, smart libraries):

**Shared Libraries** (Used by everyone):

- **UI Components** - Buttons, forms, inputs, tables, modals, toasts - all documented in Storybook
- **Data Access** - How we talk to the backend API, manage loading states, cache data
- **Type Definitions** - What a Product looks like, what a Store looks like, validation rules
- **Utilities** - Helper functions for formatting dates, prices, text, etc.

**Feature Libraries** (Specific functionality):

- **Authentication** - Login, logout, session management, role-based access control
- **Vendors** - Everything related to managing vendor accounts (CRUD operations)
- **Stores** - Everything related to managing stores (CRUD operations)
- **Products** - Everything related to managing products (CRUD operations)
- **Users** - Customer account management (CRUD operations)
- **Search** - Search functionality with filters
- **Analytics** - Track views, clicks, popular products

**Domain Libraries** (Business logic for each role):

- **Customer Domain** - Customer-specific features (favorites, browsing history)
- **Vendor Domain** - Vendor-specific features (dashboard analytics, product performance)
- **Admin Domain** - Admin-specific features (platform statistics, onboarding workflows)

---

## The Technology Stack Explained

### Authentication: react-auth-kit

Handles all login/logout functionality with:

- Secure cookie-based storage
- Automatic token management
- Role-based access (admin can't access vendor pages, etc.)
- Token refresh when sessions expire

### Data Management: TanStack Query

Makes data fetching smart and automatic:

- Automatically caches product lists so they don't reload every time
- Refetches data when it gets stale
- Handles loading states and errors
- Optimistic updates (UI updates immediately, syncs with server later)
- Works perfectly with our backend API

### Routing: TanStack Router

Manages navigation between pages:

- Type-safe routes (compiler catches broken links)
- Preloads data before showing the page (faster user experience)
- Nested routes for complex layouts
- Built-in route protection (redirect if not logged in)

### Forms: react-hook-form + Zod

Handles all form inputs and validation:

- Validates email addresses, phone numbers, required fields
- Shows error messages next to inputs
- Type-safe (knows what fields exist on each form)
- Custom validation rules (like "compare price must be higher than regular price")
- Prevents invalid data from being submitted

### UI Components: shadcn/ui

Provides accessible, beautifully styled components built with Radix UI primitives and Tailwind CSS:

- Pre-styled components you copy into your codebase (not npm packages)
- Toast, Dialog, Dropdown, Input, Button, Table, Card, and 50+ more components
- All components are keyboard-accessible and screen-reader friendly
- Fully customizable - components live in your project, modify as needed
- Dark mode support built-in
- Consistent design system across all apps
- **Key difference:** Radix UI is unstyled (you write CSS), shadcn/ui is pre-styled with Tailwind CSS (ready to use, easy to customize)

### Component Documentation: Storybook

Interactive playground for UI components:

- See all components in isolation
- Test different states (loading, error, success)
- Experiment with component props
- Automatic documentation generation
- Helps designers and developers collaborate

### State Management: Zustand

Manages global app state:

- UI state (is sidebar open? what's the theme?)
- User preferences
- Favorites/wishlist
- Search filters
- Persists to browser storage so settings survive page refresh

### HTTP Client: Axios

Talks to the backend API:

- Automatically adds authentication tokens to requests
- Handles request/response transformations
- Retries failed requests
- Intercepts errors and handles them gracefully

### Validation: Zod

Defines what valid data looks like:

- Email must be valid format
- Password must be at least 8 characters
- Price must be positive number
- Product name must be 3-100 characters
- Creates TypeScript types automatically from schemas

---

## User Journeys

### Admin Journey: Managing Vendors and Stores

**Creating a Vendor:**

1. Admin logs into Admin app with their credentials
2. Navigates to "Vendors" page, sees list of all vendors
3. Clicks "Create New Vendor" button
4. Fills out form (email, password, name, company, phone)
5. Form validates all fields using Zod schemas
6. Submits form, TanStack Query sends request to API
7. Success toast notification appears (shadcn/ui Toast component)
8. Vendor list automatically refreshes with new vendor

**Updating a Vendor:**

1. Admin finds vendor in list
2. Clicks "Edit" button
3. Form pre-fills with existing vendor data
4. Admin modifies fields (e.g., changes company name)
5. Submits form, updates saved
6. Success toast appears

**Deleting a Vendor:**

1. Admin clicks "Delete" button next to vendor
2. Confirmation dialog appears (shadcn/ui Dialog component)
3. Admin confirms deletion
4. Vendor removed from system
5. Associated stores and products are either deleted or reassigned
6. Success toast appears

**Creating a Store:**

1. Admin navigates to "Stores" page (sees list of all Stores)→ "Create New Store"
2. Fills out store details (name, slug, description, logo)
3. Selects vendor (just created) from dropdown (populated via TanStack Query)
4. Submits form, store created and assigned to vendor
5. Vendor receives email with login credentials
6. Vendor can now see this store in Vendor app

**Managing Users:**

1. Admin can view all customer accounts
2. Can update user information if needed
3. Can deactivate or delete problematic accounts
4. Can reset user passwords
5. Form validates all fields using Zod schemas
6. Submits form, TanStack Query sends request to API
7. Success toast notification appears (shadcn/ui Toast component)

### Vendor Journey: Updating Account

1. Vendor navigates to "My Account"
2. Can update password or reset password
3. Confirmation dialog appears (shadcn/ui Dialog component)
   4.Submits form, TanStack Query sends request to API
   5.Server-side verification is done to ensure this is the correct vendor .
   6.Success toast notification appears (shadcn/ui Toast component)
4. Vendor receives email with new login credentials
5. Changes saved to profile

### Vendor Journey: Managing Products

**Creating a Product:**

1. Vendor logs into Vendor app
2. react-auth-kit authenticates and redirects to dashboard
3. Dashboard shows assigned store(s) and product count
4. Clicks "Add Product" button
5. Fills out product form (name, description, price, category, images)
6. Form validates in real-time with Zod schemas
7. Uploads product images (drag and drop or file picker)
8. Clicks "Create Product"
9. TanStack Query handles the mutation, shows loading state
10. Success toast appears (shadcn/ui Toast)
11. Product list automatically refreshes
12. Product immediately visible in Mall app for customers

**Updating a Product:**

1. Vendor navigates to product list
2. Clicks "Edit" on a product
3. Form loads with existing product data
4. Vendor updates price, description
5. Form validates in real-time with Zod schemas
6. Saves changes
7. Confirmation dialog appears
8. TanStack Query handles the mutation, shows loading state
9. Success toast appears (shadcn/ui Toast)
10. Product list automatically refreshes
11. Product immediately update in Mall app for customers

**Deleting a Product:**

1. Vendor clicks "Delete" on a product
2. Confirmation dialog appears
3. Vendor confirms
4. TanStack Query handles the mutation, shows loading state
5. Product removed from store
6. Success toast appears (shadcn/ui Toast)
7. Product list automatically refreshes
8. Product immediately delete in Mall app for customers

### Customer Journey: Account and Browsing

**Creating an Account:**

1. Customer visits Mall app
2. Clicks "Sign Up" or "Register"
3. Fills out registration form (name, email, password) or Google OAuth
4. Form validates with Zod
5. TanStack Query handles the mutation, shows loading state
6. Account created
7. Success toast notification appears (shadcn/ui Toast component)
8. Customer automatically logged in
9. Redirected to stores page

**Updating Account:**

1. Customer navigates to "My Account"
2. Can update name, email, password or reset password
3. Form validates with Zod
4. Can manage preferences
5. Confirmation dialog with warning appears
6. Submits form, TanStack Query sends request to API.
7. Server-side verification is done to ensure this is the correct user.
8. Success toast notification appears (shadcn/ui Toast component)
9. Changes saved to profile

**Deleting Account:**

1. Customer goes to account settings
2. Clicks "Delete Account"
3. Confirmation dialog with warning appears
4. Customer confirms
5. Submits form, TanStack Query sends request to API.
6. Success toast notification appears (shadcn/ui Toast component)
7. Account deleted, all data removed
8. Customer logged out

**Browsing Products:**

1. Customer visits Mall app homepage
2. Sees featured stores and popular products with prices (loaded via TanStack Query)
3. Customer can add to favorites (saved via Zustand to local storage)
4. Clicks on a store card
5. TanStack Router preloads store data and navigates
6. Store page a screen that hosts another website where all the store products will be (external api)
7. Customer can search globally to find specific products
8. Applies filters (category, price range) using shadcn/ui Select components
9. Results update in real-time as customer types
10. After the filtering results, all products will appear and a label with the store name. By clicking on the store name, the user will be taken to the store page.
11. Customer can view browsing history (tracked via Customer domain library)

---

## Key Workflows - CRUD Operations

### Vendor CRUD (Admin Only)

**Who:** Admin
**Where:** Admin App → Vendors → Create New
**What Happens:**
**Create:**

- Admin fills VendorForm component (shadcn/ui form components)
- Zod validates all inputs
- react-hook-form manages form state
- On submit, TanStack Query mutation fires
- POST request to API TanStack Query mutation
  with auth token
- Backend creates vendor account
- TanStack Query invalidates vendor list cache
- Success toast notification shows
- Vendor list automatically refreshes (setQueryData) with new vendor

**Read:**

- Admin views VendorList component
- TanStack Query fetches from cache or API
- Data displayed in shadcn/ui Table component
- Pagination if many vendors

**Update:**

- Admin clicks Edit button
- VendorForm pre-populated with existing data
- Zod validates all inputs
- Changes submitted via PUT request to API TanStack Query mutation
- shadcn/ui AlertDialog for confirmation
- Success toast notification
- Specific vendor cache setQueryData and refreshed

**Delete:**

- Admin clicks Delete button
- shadcn/ui AlertDialog for confirmation
- DELETE request via TanStack Query
- Vendor removed from cache
- List refreshes automatically setQueryData

**Libraries Used:**

- features/vendors (VendorForm component)
- shared/ui (Button, Input, Label components)
- shared/data-access (useVendorMutations hook)
- shared/types (Zod schemas for validation)

### Store CRUD (Admin Only)

**Who:** Admin
**Where:** Admin App → Stores → Create New
**What Happens:**

**Create:**

- Admin fills StoreForm
- Selects vendor from dropdown (populated via TanStack Query)
- Uploads logo/cover image
- Zod validates all fields
- shadcn/ui AlertDialog for confirmation
- POST request creates store
- On submit, store created and linked to vendor
- Success toast notification
- Vendor can now see this store in Vendor app
- Specific store cache setQueryData and refreshed
- Store appears in Mall app for customers to browse

**Read:**

- View all stores in table
- Filter by vendor, status
- Cached by TanStack Query

**Update:**

- Edit store details
- Change assigned vendor
- Update branding
- Zod validates all fields
- PUT request updates store
- Success toast notification
- Specific store cache setQueryData and refreshed
- Store appears in Mall app for customers to browse

**Delete:**

- Confirmation dialog
- DELETE request
- Store and all products removed
- Or reassign products to another store
- Success toast notification

**Libraries Used:**

- features/stores (StoreForm component)
- shared/data-access (useStoreMutations, useVendors hooks)
- shared/types (Store schema with Zod)

### Product CRUD (Vendor Only)

**Who:** Vendor
**Where:** Vendor App → Products → Add New
**What Happens:**

**Create:**

- Vendor selects which store (if they have multiple)
- Vendor fills ProductForm
- Uploads multiple images (drag and drop or file picker)
- Zod validates feldes
- shadcn/ui AlertDialog for confirmation
- POST request creates product via multipart form data
- Success toast notification
- Visible in Mall immediately

**Read:**

- Vendor sees only their products
- Filtered by store if multiple stores
- Searchable and filterable

**Update:**

- Edit any product field
- Update images
- Zod validates everything
- shadcn/ui AlertDialog for confirmation
- PUT request updates product
- Success toast notification
- Visible in Mall immediately

**Delete:**

- shadcn/ui AlertDialog for confirmation
- DELETE request
- Success toast notification
- Product removed from Mall app

**Libraries Used:**

- features/products (ProductForm component)
- shared/ui (Input, Label, image upload component)
- shared/data-access (useProductMutations hook)
- shared/types (Product schema with Zod)

### User (Customer) CRUD

**Who:** Customer
**Where:** Mall App
**What Happens:**

**Create (Self-Registration):**

- Customer lands on homepage
- Customer fills registration form Google OAuth
- Zod validates email format, password strength
- POST request creates account
- Success toast notification
- Auto-login after registration
- If the customer is already registered, check if the customer logged in.
  If not, the customer fills out a login form. Otherwise, the user continues to browse stores.

**Read:**

- Customer views own profile
- Admin can view all customers

**Update (Self-Service):**

- Customer updates own profile
- e.g Change password
- Update preferences
- Zod validates everything
- shadcn/ui AlertDialog for confirmation
- PUT request to /users/me endpoint
- Success toast notification
  The details update is updated immediately (setQueryData)

**Delete (Self-Service):**

- Customer can delete own account
- shadcn/ui AlertDialog for confirmation
- All data removed
- Success toast notification
- Immediate logout

**Libraries Used:**

- features/search (SearchBar, SearchResults components)
- features/products (ProductCard, ProductDetail components)
- features/stores (StoreCard component)
- shared/data-access (useProducts, useStores hooks)
- domain/customer (useFavoritesStore from Zustand)

---

## Data Flow Examples

### When Admin Creates a Vendor

### When Admin Creates a Vendor

1. **Admin App** → Admin fills VendorForm component (shadcn/ui inputs)
2. **VendorForm** → Uses react-hook-form to manage form state
3. **Zod Schema** → Validates all fields in real-time
4. **Admin clicks Submit** → - shadcn/ui AlertDialog for confirmation
   and VendorForm calls create function
5. **useVendorMutations** (TanStack Query) → Triggers POST mutation
6. **Axios** → Sends POST request to /api/vendors with auth token
7. **Backend API** → Creates vendor in database, returns vendor object
8. **TanStack Query** → Updates cache, setQueryData vendor list queries with new vendor and refreshes
9. **shadcn/ui Toast** → Shows "Vendor created successfully"
10. **Email sent** → Vendor receives credentials (backend handles this)

### When Vendor Updates a Product

1. **Vendor App** → Vendor clicks Edit on product
2. **ProductForm** → Loads with existing product data
3. **Vendor modifies** → Price, description, or stock
4. **Form validates** → Zod ensures all fields still valid
5. **Vendor clicks Save** → - shadcn/ui AlertDialog for confirmation
   and Triggers update mutation
6. **useProductMutations** → Fires PUT request
7. **Axios** → Sends PUT to /api/products/:id
8. **Backend API** → Updates product in database
9. **TanStack Query** → update product detail in list caches setQueryData
10. **shadcn/ui Toast** → "Product updated successfully"
11. **Mall App** → Automatically shows updated data real time

### When Customer Deletes Account

1. **Mall App** → Customer navigates to Account Settings
2. **Delete Account button** → Customer clicks
3. **shadcn/ui AlertDialog** → "Are you sure? This cannot be undone"
4. **Customer confirms** → Deletion proceeds
5. **useUserMutations** → Triggers DELETE mutation
6. **Axios** → Sends DELETE to /api/users/me
7. **Backend API** → Soft delete or hard delete user
8. **react-auth-kit** → Clears authentication tokens
9. **TanStack Router** → Redirects to homepage
10. **shadcn/ui Toast** → "Account deleted successfully"
11. **All user data** → Removed from system

### When Vendor Creates a Product

1. **Vendor App** → Vendor fills ProductForm component
2. **ProductForm** → Uses react-hook-form to manage form state
3. **Zod Schema** → Validates all fields in real-time
4. **Vendor clicks Submit** → - shadcn/ui AlertDialog for confirmation
   and ProductForm calls create function
5. **useProductMutations** (TanStack Query) → Triggers mutation
6. **Axios** → Sends POST request to /api/products with auth token
7. **Backend API** → Creates product in database
8. **Backend API** → Returns created product
9. **TanStack Query** → Updates cache,setQueryData product list queries
10. **Toast Notification** → Shows "Product created successfully"
11. **Product List** → Automatically refreshes with new product
12. **Mall App** → Automatically sees new product real time

### When Admin Views Platform Statistics

1. **Admin App** → Navigates to Dashboard page
2. **TanStack Router** → Route loader fires before page renders
3. **Route Loader** → Preloads dashboard statistics via TanStack Query
4. **Multiple Queries** → Fetch vendor count, store count, product count, recent activity
5. **TanStack Query** → Batches requests, manages loading states
6. **Dashboard Page** → Renders with all data already available
7. **No loading spinner** → Data was prefetched
8. **Statistics** → Display in cards using shared/ui components
9. **Charts** → Show trends using chart components
10. **Auto-refresh** → TanStack Query refetches every 5 minutes

---

## Security & Access Control

### Role-Based Access Control

**Admin Role:**

- **Can:** Create, update, delete , read: vendors, stores, and users
- **Can:** View all data across the platform
- **Can:** Access Admin app only
- **Cannot:** Access Vendor or Mall apps (redirected to Admin dashboard)

**Vendor Role:**

- **Can:** Create, update, delete , read : their own products
- **Can:** View stores assigned to them (read-only)
- **Can:** Access Vendor app only
- **Cannot:** Create stores, see other vendors' data
- **Cannot:** Access Admin or Mall apps (redirected to Vendor dashboard)

**Customer Role:**

- **Can:** Create, update, delete their own account
- **Can:** View all stores and products (read-only)
- **Can:** Save favorites, manage preferences
- **Can:** Access Mall app only
- **Cannot:** Access Admin or Vendor apps (redirected to Customer dashboard)

### CRUD Permission Matrix

| Operation | Entity          | Admin | Vendor             | Customer  |
| --------- | --------------- | ----- | ------------------ | --------- |
| Create    | Vendor          | ✅    | ❌                 | ❌        |
| Read      | Vendor          | ✅    | ✅ (self only)     | ❌        |
| Update    | Vendor          | ✅    | ✅ (only password) | ❌        |
| Delete    | Vendor          | ✅    | ❌                 | ❌        |
| Create    | Store           | ✅    | ❌                 | ❌        |
| Update    | Store           | ✅    | ❌                 | ❌        |
| Delete    | Store           | ✅    | ❌                 | ❌        |
| Create    | Product         | ✅    | ✅ (own)           | ❌        |
| Update    | Product         | ✅    | ✅ (own)           | ❌        |
| Delete    | Product         | ✅    | ✅ (own)           | ❌        |
| View      | Product         | ✅    | ✅                 | ✅        |
| Create    | User (Customer) | ✅    | ❌                 | ✅ (self) |
| Update    | User (Customer) | ✅    | ❌                 | ✅ (self) |
| Delete    | User (Customer) | ✅    | ❌                 | ✅ (self) |

### How It Works

**Authentication Flow:**

1. User enters credentials in LoginForm (shadcn/ui form) or Google OAuth
2. react-auth-kit validates and sends to API
3. API returns user object with role + tokens
4. react-auth-kit stores tokens in secure cookies
5. User state saved with role information
6. User redirected based on role:
   - admin → /dashboard (Admin app)
   - vendor → /dashboard (Vendor app)
   - customer → /stores (Mall app)

**Route Protection:**

1. Every protected page wrapped in RequireAuth component
2. RequireAuth checks if user is authenticated
3. If not authenticated → redirect to /login
4. If authenticated → check user role against allowed roles
5. If role doesn't match → redirect to customer → /stores (Mall app)
6. If role matches → render page content

**API Request Security:**

1. Every API request goes through Axios interceptor
2. Interceptor adds JWT token to Authorization header
3. Backend verifies token and user role
4. Backend checks if user has permission for action
5. If permission denied → return 403 error
6. Axios intercepts 403 → shows error toast (shadcn/ui)
7. If token expired → Axios attempts refresh
8. Refresh failed → redirect to login

---

## UI/UX with shadcn/ui

### Component Usage Examples

**Toast Notifications:**

- Success: "Vendor created successfully" (green background)
- Error: "Failed to create vendor" (red background)
- Warning: "Stock running low" (yellow background)
- Info: "Product saved as draft" (blue background)

**Dialog Components:**

- Delete confirmations: "Are you sure you want to delete this vendor?"
- Form submissions: Multi-step product creation wizard
- Image previews: Click product image to see fullscreen

**Dropdown Menus:**

- User menu: Profile, Settings, Logout
- Actions menu: Edit, Delete
- Filter menu: Category, Price Range, Sort By

**Form Components:**

- Input fields with labels and error messages
- Select dropdowns for categories, vendors
- Checkboxes for product features
- Textarea for descriptions

**Data Display:**

- Tables with sorting and filters and pagination for vendor/product lists
- Cards for product displays in Mall app
- Badges for status indicators (active, inactive, pending)
- Avatars for user profiles

**Layout Components:**

- Tabs for organizing vendor dashboard sections
- Accordions for FAQ or product specifications
- Sheets (slide-out panels) for filters or cart preview

### Consistent Design System

**All apps share:**

- Same button styles and variants
- Same form input appearance
- Same spacing and typography
- Same color palette (customizable in Tailwind config)
- Same component behavior (keyboard navigation, animations)

**Dark Mode:**

- Toggle in user preferences
- Persisted via Zustand
- All shadcn/ui components adapt automatically
- Custom components follow same pattern

---

## Performance Optimizations

### Caching Strategy (TanStack Query)

**Aggressive Caching for Static Content:**

- Store data: 10 minutes stale time (stores don't change often)
- Product catalogs: 5 minutes stale time
- Vendor lists: 10 minutes stale time

**Frequent Refetching for Dynamic Content:**

- Dashboard statistics: 2 minutes
- Search results: 5 minutes
- User profile: 15 minutes

**Smart Invalidation:**

- Creating product → invalidate product lists and vendor product count
- Updating vendor → invalidate vendor detail + vendor list
- Creating store → invalidate store lists + vendor detail
- Deleting product → invalidate product lists and store product count

**Prefetching:**

- Homepage prefetches featured stores and products
- Store page prefetches products before user clicks
- Product detail prefetches when hovering over product card
- Next page of results prefetched when scrolling

### Code Splitting

**Route-Based Splitting:**

- Each page is lazy-loaded via TanStack Router
- Only loads code needed for current page
- Reduces initial bundle size by 60%

**Component-Based Splitting:**

- Heavy components (charts, image editors, rich text editors) lazy-loaded
- Only loaded when user actually needs them
- Improves perceived performance

### Image Optimization

**Product Images:**

- Compressed on upload (backend handles this)
- Multiple sizes generated (thumbnail 200x200, medium 600x600, large 1200x1200)
- Lazy loading as user scrolls (native browser lazy loading)
- Blur placeholder while loading
- WebP format for modern browsers, JPEG fallback

### State Management Strategy

**What Goes Where:**

**TanStack Query (Server State):**

- All data from API (products, stores, vendors, users)
- Automatically synced with server
- Cached and refetched based on rules
- Invalidated on mutations

**Zustand (Client State):**

- UI preferences (sidebar open/closed, theme dark/light)
- Favorites/wishlist (persisted to localStorage)
- Search filters currently applied
- Shopping preferences
- Recently viewed products

**React State (Component State):**

- Form inputs (managed by react-hook-form)
- Modal open/closed
- Dropdown expanded/collapsed
- Temporary UI state
- Component-specific toggles

---

## Development Workflow

### Adding shadcn/ui Components

**Initial Setup:**

```bash
# Initialize shadcn/ui in libs/shared/ui
cd libs/shared/ui
npx shadcn-ui@latest init
```

**Adding Components as Needed:**

```bash
# Add button component
npx shadcn-ui@latest add button

# Add form components
npx shadcn-ui@latest add input label select checkbox

# Add feedback components
npx shadcn-ui@latest add toast alert dialog

# Add data display
npx shadcn-ui@latest add table card badge
```

**Result:**

- Components copied to `libs/shared/ui/src/components/ui/`
- Fully customizable TypeScript components
- Already styled with Tailwind CSS
- All apps import from this shared library

### Building a New Feature

Let's say we want to add "Product Reviews":

**Step 1: Create Feature Library**
Generate feature library in libs/features

**Step 2: Define Types with Zod**
Create schemas for Review data structure with validation rules

**Step 3: Create API Service**
Add review service to data-access with API endpoints

**Step 4: Create TanStack Query Hooks**
useReviews, useReview, useReviewMutations with proper caching

**Step 5: Build UI Components**

- ReviewList component using shadcn/ui Table
- ReviewCard component using shadcn/ui Card
- ReviewForm component using shadcn/ui Form components
- Star rating using custom component or lucide-react icons

**Step 6: Add Storybook Stories**
Document all components with interactive examples

**Step 7: Use in Apps**

- Import ReviewList in Mall app product detail page
- Import ReviewForm in customer account area
- Import review moderation in Admin app
- No code duplication needed!

### Testing Strategy with Mcp Playwright e.g:

**Unit Tests:**

- Test Zod schemas validate correctly
- Test utility functions (formatting, calculations)
- Test service functions (API calls mocked)
- Test hooks in isolation

**Component Tests:**

- Test shadcn/ui components render correctly
- Test form validation with Zod
- Test button clicks trigger correct actions
- Test conditional rendering

**Integration Tests:**

- Test forms submit correctly
- Test data flows through TanStack Query
- Test authentication flows with react-auth-kit
- Test role-based access control

**E2E Tests:**

- Test complete CRUD workflows
- Test admin creating vendor and store
- Test vendor adding, editing, deleting product
- Test customer registration, browsing, account deletion

**Visual Tests:**

- Storybook captures screenshots of all components
- Detect unintended UI changes
- Test responsive layouts (mobile, tablet, desktop)
- Test different states (loading, error, empty, success)
- Test dark mode

---

## Deployment Architecture

### Build Process

**Development:**

- Run all three apps simultaneously in dev mode
- Hot reload on code changes
- TanStack Query DevTools visible for debugging
- React DevTools enabled
- Storybook running on separate port

**Production:**

- Build each app separately with optimizations
- Code split and minified
- Tree-shaking removes unused code
- Source maps generated for debugging
- Environment-specific configurations loaded

### Deployment Options

**Option A: Separate Subdomains**

- mall.yourplatform.com (Mall app)
- vendor.yourplatform.com (Vendor app)
- admin.yourplatform.com (Admin app)
- Pros: Easiest to deploy, clear separation
- Cons: Multiple SSL certificates (unless wildcard)

**Option B: Path-Based Routing**

- yourplatform.com (Mall app - default)
- yourplatform.com/vendor (Vendor app)
- yourplatform.com/admin (Admin app)
- Pros: Single domain, one SSL certificate
- Cons: Slightly more complex routing

**Recommended: Option A (Subdomains)** for clarity and separation

### CI/CD Pipeline

**On Every Commit:**

1. Lint code with ESLint
2. Run TypeScript type checking
3. Run unit tests
4. Build affected apps and libraries
5. If main branch → deploy to staging environment

**On Pull Request:**

1. All tests must pass
2. Code coverage report generated
3. Preview deployment created
4. Visual regression tests run
5. Storybook deployed for review

**On Release Tag:**

1. All tests pass
2. Build production bundles
3. Deploy to production environment
4. Run smoke tests
5. Health checks
6. Rollback mechanism if issues detected

---

### Data Storage & Security

#### Password Security

- All passwords **hashed** using bcrypt
- Never stored in plain text
- Password reset generates secure tokens
- Minimum 8 characters enforced by Zod validation

#### Authentication Tokens

- JWT (JSON Web Tokens) stored in **HttpOnly cookies**
- Cannot be accessed by JavaScript (prevents XSS attacks)
- Automatically expire after set time (e.g., 24 hours)
- Refresh tokens for extended sessions
- Tokens invalidated on logout

#### GDPR Compliance (if applicable)

- ✅ Right to portability: Data provided in machine-readable format
- ✅ Consent required: Clear opt-ins for data collection
- ✅ Cookie consent: User consent required for non-essential cookies
- ✅ Data breach notification: Users notified within 24 hours

#### Database Security

- Encrypted at rest
- Encrypted in transit (SSL/TLS)
- Regular automated backups
- Access restricted to authorized personnel only
- Audit logs track all data access

#### API Security

- HTTPS only (no plain HTTP)
- Rate limiting to prevent abuse
- CORS policies restrict unauthorized domains
- Input sanitization prevents injection attacks
- Authentication required for all protected endpoints

#### Data Retention Periods

- **Active accounts**: Retained indefinitely while active
- **Inactive accounts**: Customer accounts purged after 6 months of inactivity (with prior notice)
- **Audit logs**: Retained for 7 years (regulatory compliance)
- **Analytics data**: Anonymized and aggregated after 90 days

#### Backup & Recovery

- Daily automated backups
- Backups encrypted and stored separately
- 30-day backup retention
- Disaster recovery plan tested quarterly

#### Security Standards

- OWASP Top 10 security practices followed
- Regular security audits
- Penetration testing annually
- Vulnerability scanning automated
- Security patches applied promptly

### Data Breach Protocol

**In Case of Breach:**

1. **Immediate containment**: Isolate affected systems
2. **Assessment**: Determine scope and impact
3. **Notification**: Inform affected users within 24 hours
4. **Remediation**: Fix vulnerability, reset credentials
5. **Documentation**: Full incident report
6. **Prevention**: Implement additional safeguards

### Developer Responsibilities

#### Code Security

- No sensitive data in version control (use .env files)
- API keys stored in environment variables
- No console.log statements with user data in production
- Input validation on frontend AND backend
- SQL injection prevention (use parameterized queries)
- XSS prevention (sanitize user inputs)

### Language Support

- The system must support Hebrew and English languages.
- The user can choose which language the website is displayed in.
- By default, the site will be displayed in English.

<!-- ## Maintenance & Scalability

### Adding New CRUD Operations

Want to add "Categories" management?

**Step 1: Define Types**
Create Category interface and Zod schema

**Step 2: Create Service**
Add categoryService to data-access (CRUD methods)

**Step 3: Create Hooks**
useCategories, useCategory, useCategoryMutations

**Step 4: Build Components**

- CategoryForm (shadcn/ui inputs)
- CategoryList (shadcn/ui table)
- CategorySelect (for product creation)

**Step 5: Add to Admin App**
New routes for category management

**Step 6: Use in Other Apps**
Import CategorySelect in ProductForm
Display categories in Mall app filters

**Total Time: 2-3 days** (vs. 1-2 weeks building from scratch)

### Updating shadcn/ui Components

**Scenario: Update Button component with new variant**

1. Modify `libs/shared/ui/src/components/ui/button.tsx`
2. Add new variant to CVA configuration
3. Update Storybook story to show new variant
4. Export and use in any app
5. **All three apps get the update automatically** -->

<!-- ### Code Sharing Benefits

**Scenario: Add "Bulk Actions" Feature**

**Old Way (3 Separate Apps):**

- Build bulk delete in Admin app (3 days)
- Build bulk update in Vendor app (3 days)
- Build bulk export in all apps (2 days each)
- Total: 11 days

**New Way (Shared Libraries):**

- Build BulkActions component with shadcn/ui (2 days)
- Add to shared/ui library
- Import in Admin app (2 hours)
- Import in Vendor app (2 hours)
- Import in Mall app if needed (2 hours)
- Total: 2.5 days

**Savings: 77% faster development** -->

---

<!-- ## Project Timeline

### Week 1-2: Foundation

- Set up Nx monorepo structure
- Install all dependencies (TanStack Query/Router, react-auth-kit, etc.)
- Initialize shadcn/ui in shared/ui library
- Configure TypeScript, ESLint, Prettier
- Set up Storybook for component documentation
- Create basic folder structure

### Week 3: Type System & Validation

- Define all data models with TypeScript interfaces
- Create Zod validation schemas for all entities
- Set up shared types library
- Document type relationships
- Create utility type helpers

### Week 4: Data Layer

- Set up Axios HTTP client with interceptors
- Create all API service files (vendors, stores, products, users)
- Build TanStack Query hooks with proper caching
- Set up query key factories
- Test API integration with mock backend

### Week 5: Authentication

- Integrate react-auth-kit
- Build login/logout flows
- Create route guards (RequireAuth, RoleGuard)
- Implement role-based access control
- Test authentication with all three roles
- Build password reset flow

### Week 6: UI Component Library with shadcn/ui

- Add core shadcn/ui components (Button, Input, Label, etc.)
- Add form components (Select, Checkbox, Radio, Textarea)
- Add feedback components (Toast, Dialog, Alert)
- Add data display components (Table, Card, Badge)
- Create Storybook stories for all components
- Build custom components as needed
- Configure dark mode

### Week 7-8: Feature Libraries

- Build vendors feature (VendorForm, VendorList, CRUD hooks)
- Build stores feature (StoreForm, StoreList, CRUD hooks)
- Build products feature (ProductForm, ProductList, CRUD hooks)
- Build users feature (UserForm, profile management)
- Build search feature (SearchBar, filters, results)
- All with Zod validation and shadcn/ui components

### Week 9-11: Applications

- Build Admin app with TanStack Router
  - Dashboard with statistics
  - Vendor management (CRUD)
  - Store management (CRUD)
  - User management (CRUD)
  - Analytics pages
- Build Vendor app with TanStack Router
  - Dashboard with product count and performance
  - Product management (CRUD)
  - Inventory management
  - Store view (read-only)
- Build Mall app with TanStack Router
  - Homepage with featured content
  - Store browsing
  - Product browsing and search
  - Customer account management (CRUD)
  - Favorites functionality

### Week 12: Testing, Polish & Deployment

- Write comprehensive unit tests
- Write integration tests for all CRUD operations
- Write E2E tests for critical user journeys
- Fix bugs and polish UI
- Performance optimization
- Deploy to staging environment
- User acceptance testing
- Deploy to production
- Monitor and iterate

--- -->

<!-- ## Success Metrics

### Development Efficiency

- **60% less code duplication** (shared libraries vs. separate apps)
- **50% faster feature development** (build once, use everywhere)
- **70% reduction in bugs** (fix once, fixed everywhere)
- **80% faster developer onboarding** (learn library structure once)
- **40% faster iteration** (change shadcn/ui component, all apps update)

### Code Quality

- **100% TypeScript coverage** (no any types)
- **90%+ test coverage** (unit, integration, E2E)
- **All components documented in Storybook**
- **Consistent code style** (ESLint + Prettier)
- **Type-safe forms** (Zod + react-hook-form)

### User Experience

- **Fast page loads** (code splitting, prefetching)
- **Smooth navigation** (TanStack Router preloading)
- **Instant feedback** (optimistic updates)
- **Accessible** (shadcn/ui keyboard navigation, screen readers)
- **Consistent design** (shared component library)
- **Dark mode support** (user preference)

### Maintainability

- **Single source of truth** (shared libraries)
- **Easy to add features** (import from library)
- **Safe refactoring** (TypeScript catches errors)
- **Clear separation of concerns** (thin apps, thick libraries)
- **Scalable architecture** (add new apps easily) -->

---

<!-- ## Key Takeaways

### The "Thin App, Thick Library" Philosophy Wins

**What We Achieved:**

- Three applications sharing 80% of their code
- New features added once, available in all apps
- Bugs fixed once, resolved everywhere
- Consistent user experience across Mall, Vendor, and Admin
- Developers learn the system once, work on any app
- CRUD operations standardized across all entities

### Modern Tech Stack Benefits

**react-auth-kit:**

- Authentication just works out of the box
- No manual token management
- Secure cookie-based storage
- Role-based access control built-in

**TanStack Query:**

- Data stays fresh automatically
- Users see updates immediately
- Loading and error states handled automatically
- Network errors handled gracefully
- Optimistic updates for better UX

**TanStack Router:**

- Pages load fast with prefetching
- Type-safe navigation prevents broken links
- Smooth transitions between routes
- Route-based code splitting

**Zod + react-hook-form:**

- Forms validate perfectly every time
- Error messages are helpful and immediate
- Invalid data never reaches the API
- Type-safe forms prevent bugs
- Custom validation rules easy to add

**shadcn/ui:**

- Beautiful, accessible components out of the box
- Fully customizable since code is in your project
- Dark mode support built-in
- Keyboard navigation and screen readers work perfectly
- Consistent design across all apps
- Much faster than styling from scratch

**Storybook:**

- Components documented automatically
- Designers see components before integration
- Developers test components in isolation
- Living documentation that's always up to date
- Visual regression testing

**Zustand:**

- Simple global state management
- Minimal boilerplate
- Persistence to localStorage
- Easy to understand and debug -->

<!-- ### This Architecture Scales

**Easy to Add:**

- New user roles (e.g., "Moderator" role)
- New features (e.g., product reviews, ratings)
- New applications (e.g., "Warehouse" app for inventory)
- New integrations (e.g., payment gateways, shipping providers)
- New CRUD entities (e.g., categories, tags, discounts)

**Easy to Maintain:**

- Clear file structure (apps vs. libraries)
- Shared libraries for common functionality
- Comprehensive tests at all levels
- Good documentation in Storybook and code
- Type safety catches errors early

**Easy to Collaborate:**

- Multiple teams can work simultaneously
- Clear boundaries between apps and libraries
- Storybook facilitates design/dev collaboration
- TypeScript catches integration issues before runtime
- shadcn/ui ensures consistent design -->

---

## Conclusion

This architecture provides a **solid, scalable foundation** for a multi-tenant e-commerce platform with full CRUD capabilities across all entities. By investing time upfront in creating smart, reusable libraries, we've built a system that will be **faster to develop**, **easier to maintain**, and **more reliable** in the long run.

The combination of modern tools:

- **react-auth-kit** for authentication
- **TanStack Query/Router** for data and navigation
- **shadcn/ui** for beautiful, accessible UI components
- **Zod** for validation
- **Zustand** for state management
- **Storybook** for documentation

Combined with the **"Thin App, Thick Library" philosophy** creates a development experience that is both **powerful for developers** and **delightful for users**.

**Key Advantages:**

- ✅ Write once, use everywhere
- ✅ Fix once, fixed everywhere
- ✅ Beautiful UI out of the box
- ✅ Fully customizable components
- ✅ Type-safe everything
- ✅ Comprehensive CRUD for all entities
- ✅ Self-service for customers (create/update/delete account)
- ✅ Full control for admins (manage all entities)
- ✅ Efficient workflow for vendors (manage products)
- ✅ Fast, accessible, and maintainable
