# My Mall - E-Commerce Platform Project Brief

## Project Overview
My Mall is a modern, full-stack e-commerce platform built using an Nx monorepo architecture. The project consists of a React-based storefront application and a Node.js/Express API backend, organized into reusable libraries following domain-driven design principles.

## Technology Stack

### Core Framework & Architecture
- **Monorepo Management**: Nx 22.5.1
- **Frontend Framework**: React 19.0.0
- **Build Tool**: Vite 7.x
- **Language**: TypeScript 5.9.2
- **Backend**: Node.js with Express 4.x

### State Management & Data Fetching
- **Server State**: TanStack React Query v5.100.5 with React Query DevTools
- **Client State**: Zustand v5.0.12
- **HTTP Client**: Axios v1.15.2

### Routing & Navigation
- **Router**: TanStack React Router v1.168.24 with Router DevTools
- **Legacy Support**: React Router DOM v6.30.3 (for migration)

### Forms & Validation
- **Form Management**: React Hook Form v7.74.0
- **Validation**: Zod v4.3.6
- **Resolvers**: @hookform/resolvers v5.2.2

### Authentication
- **Auth Solution**: React Auth Kit v4.0.2-alpha.11

### UI & Styling
- **Styling Framework**: Tailwind CSS 3.x
- **CSS Processing**: PostCSS with Autoprefixer
- **Utility Libraries**: 
  - clsx v2.1.1
  - tailwind-merge v3.5.0
  - class-variance-authority
- **Icons**: Lucide React v1.11.0
- **Dark Mode**: Configured via Tailwind (class strategy)

### Internationalization (i18n)
- **i18n Framework**: react-i18next with i18next
- **Language Detection**: i18next-browser-languagedetector
- **Resource Loading**: i18next-http-backend

### Development Tools
- **Component Development**: Storybook v9.1.20 (React Vite)
  - @storybook/react-vite
  - Compatible with Vite 7.x
- **Testing Framework**: Vitest with @vitest/ui
- **Testing Libraries**: 
  - @testing-library/react
  - @testing-library/jest-dom
- **E2E Testing**: Playwright
- **Process Management**: Concurrently v9.2.1

### Utilities
- **Date Handling**: date-fns v4.1.0

## Phase 1, Task 1.1 - Project Configuration & Dependencies

### Completed Subtasks

#### 1.1.1: Core Dependencies Installation ✅
All core dependencies were installed as production dependencies:
- @tanstack/react-query & @tanstack/react-query-devtools
- @tanstack/react-router & @tanstack/router-devtools
- react-auth-kit
- axios
- zod
- react-hook-form & @hookform/resolvers
- zustand
- date-fns
- lucide-react
- clsx & tailwind-merge
- concurrently

#### 1.1.2: UI & Styling Dependencies ✅
Installed as devDependencies and fully configured:
- tailwindcss, postcss, autoprefixer
- class-variance-authority

**Configuration Created:**
- [`tailwind.config.js`](../../tailwind.config.js) - Workspace-level Tailwind configuration
  - Content paths for apps and libs
  - Dark mode support (class strategy)
  - Extended theme with CSS variable-based colors
  - Custom color palette (primary, secondary, destructive, muted, accent, etc.)
  - Custom border radius utilities
  - Animation keyframes for UI components

- [`postcss.config.js`](../../postcss.config.js) - PostCSS configuration with Tailwind and Autoprefixer

- [`styles/globals.css`](../../styles/globals.css) - Global styles with theme variables
  - Light mode color scheme (HSL-based)
  - Dark mode color scheme (HSL-based)
  - Base styles for consistent theming
  - Tailwind directives (@base, @components, @utilities)

#### 1.1.3: Development & Testing Tools ✅
Installed as devDependencies:
- @storybook/react-vite@^8.6.14 & @storybook/addon-essentials@^8.6.14
  - Note: Installed with --legacy-peer-deps due to Vite 7.x compatibility
- vitest & @vitest/ui
- @testing-library/react & @testing-library/jest-dom
- @playwright/test

#### 1.1.4: i18n Dependencies ✅
Installed as production dependencies:
- react-i18next & i18next
- i18next-browser-languagedetector
- i18next-http-backend

#### 1.1.5: Nx Configuration ✅
Updated [`nx.json`](../../nx.json) with comprehensive configuration:

**Target Defaults:**
- `build`: Cached, depends on dependent builds, outputs to dist
- `serve` & `dev`: Non-cached, depends on dependent builds
- `test`: Cached with coverage outputs
- `lint`: Cached with proper input tracking
- `typecheck`: Cached, depends on dependent builds
- `e2e`: Cached with test results and reports outputs

**Caching Strategy:**
- Cacheable operations: build, lint, test, e2e, typecheck
- Proper input/output tracking for optimal cache hits
- Task dependencies configured for correct execution order

**Affected Configuration:**
- Default base branch set to "main"
- Enables efficient CI/CD with nx affected commands

#### 1.1.6: TypeScript Configuration ✅
Updated [`tsconfig.base.json`](../../tsconfig.base.json):

**Strict Mode Settings:**
- All strict checks enabled (strictNullChecks, strictFunctionTypes, etc.)
- noImplicitAny and noImplicitThis enabled
- noUnusedLocals enabled for cleaner code

**Library Configuration:**
- Added DOM and DOM.Iterable libraries for browser APIs
- ES2022 target with modern features
- React JSX support

**Path Mappings (Preparation for Future Libraries):**
```typescript
{
  "@my-mall/shared/types": ["libs/shared/types/src/index.ts"],
  "@my-mall/shared/utils": ["libs/shared/utils/src/index.ts"],
  "@my-mall/shared/hooks": ["libs/shared/hooks/src/index.ts"],
  "@my-mall/shared/constants": ["libs/shared/constants/src/index.ts"],
  "@my-mall/shared/models": ["libs/shared/models/src/index.ts"],
  "@my-mall/shared/ui": ["libs/shared/ui/src/index.ts"],
  "@my-mall/api/products": ["libs/api/products/src/index.ts"],
  "@my-mall/api/auth": ["libs/api/auth/src/index.ts"],
  "@my-mall/api/cart": ["libs/api/cart/src/index.ts"],
  "@my-mall/api/orders": ["libs/api/orders/src/index.ts"],
  "@my-mall/api/users": ["libs/api/users/src/index.ts"],
  "@my-mall/shop/data": ["libs/shop/data/src/index.ts"],
  "@my-mall/shop/feature-products": ["libs/shop/feature-products/src/index.ts"],
  "@my-mall/shop/feature-product-detail": ["libs/shop/feature-product-detail/src/index.ts"],
  "@my-mall/shop/feature-cart": ["libs/shop/feature-cart/src/index.ts"],
  "@my-mall/shop/feature-checkout": ["libs/shop/feature-checkout/src/index.ts"],
  "@my-mall/shop/feature-auth": ["libs/shop/feature-auth/src/index.ts"],
  "@my-mall/shop/shared-ui": ["libs/shop/shared-ui/src/index.ts"]
}
```

**Module Resolution:**
- Bundler mode for optimal tree-shaking
- ESM interop enabled
- Synthetic default imports allowed
- JSON module resolution enabled

#### 1.1.7: Environment Configuration ✅
Created [`.env.example`](../../.env.example) with comprehensive environment variable templates:

**Configuration Categories:**
1. **API Configuration**: Base URL, timeout settings
2. **Application Configuration**: Node environment, port numbers
3. **Authentication & Security**: JWT secrets, token expiration, cookie settings
4. **Database Configuration**: PostgreSQL and Redis URLs
5. **Payment Gateway**: Stripe and PayPal integration placeholders
6. **Email Service**: Email provider configuration
7. **File Storage**: AWS S3 configuration for asset storage
8. **Analytics & Monitoring**: GA, Application Insights, Sentry
9. **Feature Flags**: Toggle features on/off
10. **Internationalization**: Language settings
11. **Rate Limiting**: API protection settings
12. **CORS Configuration**: Security settings
13. **Logging**: Log level and request logging

## Project Structure

### Applications
- **apps/mall**: Customer-facing mall application (Vite + React, port 4200)
- **apps/vendor**: Vendor dashboard application (Vite + React, port 4201)
- **apps/admin**: Admin control panel application (Vite + React, port 4202)

### Shared Libraries
- **libs/shared/ui**: Shared UI components library (Vite bundler, React)
- **libs/shared/data-access**: Data access utilities and API clients (no bundler)
- **libs/shared/types**: TypeScript type definitions (no bundler)
- **libs/shared/utils**: Utility functions (no bundler)
- **libs/shared/config**: Configuration management (no bundler)
- **libs/shared/i18n**: Internationalization resources (no bundler)

### Feature Libraries
- **libs/features/auth**: Authentication feature (Vite bundler, React)
- **libs/features/vendors**: Vendor management feature (Vite bundler, React)
- **libs/features/stores**: Store management feature (Vite bundler, React)
- **libs/features/products**: Product management feature (Vite bundler, React)
- **libs/features/users**: User management feature (Vite bundler, React)
- **libs/features/search**: Search functionality feature (Vite bundler, React)

### Domain Libraries
- **libs/domain/customer**: Customer domain logic (Vite bundler, React)
- **libs/domain/vendor-domain**: Vendor domain logic (Vite bundler, React)
- **libs/domain/admin-domain**: Admin domain logic (Vite bundler, React)

## Phase 1, Task 1.2 - Workspace Structure Setup

### Completed Subtasks

#### 1.2.1: Generate Applications (3 apps) ✅
Generated three React applications with Vite bundler and routing:

1. **Mall App** (Customer-facing)
   - Directory: `apps/mall`
   - Port: 4200
   - Features: Vite bundler, React Router, CSS styling
   - Configuration: Custom port in [`vite.config.mts`](../../apps/mall/vite.config.mts)

2. **Vendor App** (Vendor dashboard)
   - Directory: `apps/vendor`
   - Port: 4201
   - Features: Vite bundler, React Router, CSS styling
   - Configuration: Custom port in [`vite.config.mts`](../../apps/vendor/vite.config.mts)

3. **Admin App** (Admin control panel)
   - Directory: `apps/admin`
   - Port: 4202
   - Features: Vite bundler, React Router, CSS styling
   - Configuration: Custom port in [`vite.config.mts`](../../apps/admin/vite.config.mts)

**Command Pattern Used:**
```bash
npx nx g @nx/react:app <name> --bundler=vite --routing=true --style=css --unitTestRunner=none --e2eTestRunner=none --directory=apps/<name>
```

#### 1.2.2: Generate Shared Libraries (6 libs) ✅
Generated shared libraries for cross-cutting concerns:

1. **UI Library** - `libs/shared/ui`
   - Bundler: Vite
   - Purpose: Shared UI components
   - Generator: `@nx/react:library`

2. **Data Access Library** - `libs/shared/data-access`
   - Bundler: None (TypeScript only)
   - Purpose: API clients and data access utilities
   - Generator: `@nx/js:library`

3. **Types Library** - `libs/shared/types`
   - Bundler: None (TypeScript only)
   - Purpose: Shared TypeScript type definitions
   - Generator: `@nx/js:library`

4. **Utils Library** - `libs/shared/utils`
   - Bundler: None (TypeScript only)
   - Purpose: Utility functions and helpers
   - Generator: `@nx/js:library`

5. **Config Library** - `libs/shared/config`
   - Bundler: None (TypeScript only)
   - Purpose: Configuration management
   - Generator: `@nx/js:library`

6. **i18n Library** - `libs/shared/i18n`
   - Bundler: None (TypeScript only)
   - Purpose: Internationalization resources
   - Generator: `@nx/js:library`

#### 1.2.3: Generate Feature Libraries (6 libs) ✅
Generated feature libraries with Vite bundler for UI-focused features:

1. **Auth Feature** - `libs/features/auth`
   - Authentication and authorization features
   
2. **Vendors Feature** - `libs/features/vendors`
   - Vendor management functionality
   
3. **Stores Feature** - `libs/features/stores`
   - Store management and catalog features
   
4. **Products Feature** - `libs/features/products`
   - Product management and display
   
5. **Users Feature** - `libs/features/users`
   - User management and profiles
   
6. **Search Feature** - `libs/features/search`
   - Search and filtering functionality

**Command Pattern Used:**
```bash
npx nx g @nx/react:library <name> --directory=libs/features/<name> --bundler=vite --unitTestRunner=none --component=false
```

#### 1.2.4: Generate Domain Libraries (3 libs) ✅
Generated domain libraries for business logic:

1. **Customer Domain** - `libs/domain/customer`
   - Customer-specific business logic
   
2. **Vendor Domain** - `libs/domain/vendor-domain`
   - Vendor-specific business logic
   - Note: Named `vendor-domain` to avoid conflict with vendor app
   
3. **Admin Domain** - `libs/domain/admin-domain`
   - Admin-specific business logic
   - Note: Named `admin-domain` to avoid conflict with admin app

**Command Pattern Used:**
```bash
npx nx g @nx/react:library <name> --directory=libs/domain/<name> --bundler=vite --unitTestRunner=none --component=false
```

#### 1.2.5: Delete Existing Example Code ✅
Removed all sample/example code from the initial workspace:

**Deleted Directories:**
- `apps/shop/` - Sample shop application
- `apps/api/` - Sample API application
- `libs/shop/` - Sample shop libraries (data, feature-products, feature-product-detail, shared-ui)
- `libs/api/` - Sample API libraries (products)
- `libs/shared/models/` - Sample shared models

**Cleanup Method:**
```bash
rmdir /s /q <directory>
```

#### 1.2.6: Update TypeScript Path Mappings ✅
Updated [`tsconfig.base.json`](../../tsconfig.base.json) to reflect the new workspace structure:

**Updated Path Mappings:**
```typescript
{
  "@org/shared/ui": ["libs/shared/ui/src/index.ts"],
  "@org/shared/data-access": ["libs/shared/data-access/src/index.ts"],
  "@org/shared/types": ["libs/shared/types/src/index.ts"],
  "@org/shared/utils": ["libs/shared/utils/src/index.ts"],
  "@org/shared/config": ["libs/shared/config/src/index.ts"],
  "@org/shared/i18n": ["libs/shared/i18n/src/index.ts"],
  "@org/features/auth": ["libs/features/auth/src/index.ts"],
  "@org/features/vendors": ["libs/features/vendors/src/index.ts"],
  "@org/features/stores": ["libs/features/stores/src/index.ts"],
  "@org/features/products": ["libs/features/products/src/index.ts"],
  "@org/features/users": ["libs/features/users/src/index.ts"],
  "@org/features/search": ["libs/features/search/src/index.ts"],
  "@org/domain/customer": ["libs/domain/customer/src/index.ts"],
  "@org/domain/vendor": ["libs/domain/vendor-domain/src/index.ts"],
  "@org/domain/admin": ["libs/domain/admin-domain/src/index.ts"]
}
```

**Actions:**
- Removed old path mappings for deleted projects
- Added new path mappings for all generated libraries
- Verified paths match actual directory structure

### Workspace Statistics

**Total Projects Generated:** 18
- Applications: 3
- Shared Libraries: 6
- Feature Libraries: 6
- Domain Libraries: 3

**Deleted Projects:** 9
- Applications: 2 (shop, api)
- Libraries: 7 (shop/*, api/*, shared/models)

**Net Change:** +9 projects

## Issues Encountered

### Task 1.2 - Workspace Structure Setup Issues

#### Storybook + Vite 7 Peer Dependency Conflicts (RESOLVED)
- **Issue**: npm install fails during library generation with ERESOLVE error
- **Root Cause**: `@storybook/react-vite@8.6.14` requires Vite ^4.0.0 || ^5.0.0 || ^6.0.0, but project uses Vite 7.3.1
- **Impact**:
  - Exit code 1 on npm install after each library generation
  - Libraries and configuration files ARE created successfully
  - Only the npm install step fails
- **Actual Behavior**: All 18 projects generated successfully despite npm errors
- **Resolution** (2026-04-27):
  - Upgraded Storybook from v8.6.14 to v9.1.20
  - Storybook v9.1.20 officially supports Vite 7 (peer deps: `^5.0.0 || ^6.0.0 || ^7.0.0`)
  - Removed `@storybook/addon-essentials@8.6.14` (not compatible with Storybook v9)
  - No peer dependency warnings after upgrade
  - Mall app successfully starts with Vite 7.3.1
- **Status**: ✅ Resolved

#### Naming Conflict - Domain Libraries
- **Issue**: Cannot create `libs/domain/vendor` and `libs/domain/admin` due to naming conflicts
- **Root Cause**: Nx prevents duplicate project names; `apps/vendor` and `apps/admin` already exist
- **Resolution**: Created as `libs/domain/vendor-domain` and `libs/domain/admin-domain`
- **Impact**: Path mappings use `@org/domain/vendor` and `@org/domain/admin` pointing to `-domain` directories
- **Status**: Resolved with naming convention adjustment

### Task 1.1 - Previous Issues

#### Storybook Version Compatibility (RESOLVED)
- **Issue**: Storybook v8.6.14 has peer dependency requirements for Vite ^4.0.0 || ^5.0.0 || ^6.0.0
- **Current Vite**: v7.3.2
- **Initial Resolution**: Installed with `--legacy-peer-deps` flag
- **Impact**: Functional but required monitoring for compatibility issues
- **Final Resolution** (2026-04-27): Upgraded to Storybook v9.1.20 which fully supports Vite 7
- **Status**: ✅ Resolved

### Package Vulnerabilities
- **Status**: 48 vulnerabilities detected (18 moderate, 30 high)
- **Note**: Common in npm ecosystems; most are in dev dependencies
- **Action**: Deferred to later phase; will audit and address before production

## Next Steps (Task 1.3)
As per the master implementation plan:
1. Set up authentication infrastructure
2. Configure state management (Zustand + React Query)
3. Implement routing structure with TanStack Router
4. Create base UI components
5. Set up i18n configuration

## Configuration Best Practices Applied

### Nx Monorepo
- Efficient caching to speed up builds and tests
- Proper task dependencies for correct execution order
- Affected command support for CI/CD optimization

### TypeScript
- Strict mode enabled to catch errors early
- Path mappings for clean imports
- Comprehensive type checking

### Styling
- CSS variables for theme flexibility
- Dark mode support out of the box
- Utility-first approach with Tailwind

### Development Workflow
- Concurrent dev servers for full-stack development
- Component isolation with Storybook
- Testing at multiple levels (unit, integration, E2E)

## Maintenance Updates

### Nx Configuration Migration (2026-04-26)
- **Issue**: Deprecated `affected` configuration block in [`nx.json`](../../nx.json)
- **Resolution**: Migrated from deprecated nested `affected.defaultBase` to root-level `defaultBase` property
- **Changes**:
  - Removed deprecated `"affected": { "defaultBase": "main" }` block (lines 129-131)
  - Added `"defaultBase": "main"` at root level (line 3)
- **Impact**: Maintains affected command functionality while following Nx best practices for newer versions
- **Reference**: Nx configuration schema updates for improved performance and clarity

---

**Last Updated**: 2026-04-27
**Phase**: Phase 1 - Foundation
**Current Task**: 1.2 - Workspace Structure Setup
**Status**: ✅ Complete

**Completed Tasks:**
- ✅ Task 1.1 - Project Configuration & Dependencies
- ✅ Task 1.2 - Workspace Structure Setup
