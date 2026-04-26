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
- **Component Development**: Storybook v8.6.14 (React Vite)
  - @storybook/react-vite
  - @storybook/addon-essentials
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

### Current Applications
- **apps/shop**: React-based storefront application (Vite)
- **apps/api**: Express-based API server

### Current Libraries
- **libs/shared/models**: Shared data models
- **libs/api/products**: Product service library
- **libs/shop/data**: Data access hooks for shop
- **libs/shop/feature-products**: Product listing feature
- **libs/shop/feature-product-detail**: Product detail feature
- **libs/shop/shared-ui**: Shared UI components (cards, spinners, grids)

## Issues Encountered

### Storybook Version Compatibility
- **Issue**: Storybook v8.6.14 has peer dependency requirements for Vite ^4.0.0 || ^5.0.0 || ^6.0.0
- **Current Vite**: v7.3.2
- **Resolution**: Installed with `--legacy-peer-deps` flag
- **Impact**: Functional but may require monitoring for compatibility issues
- **Future Action**: Monitor Storybook releases for Vite 7 support or consider downgrading Vite if issues arise

### Package Vulnerabilities
- **Status**: 48 vulnerabilities detected (18 moderate, 30 high)
- **Note**: Common in npm ecosystems; most are in dev dependencies
- **Action**: Deferred to later phase; will audit and address before production

## Next Steps (Task 1.2)
As per the master implementation plan:
1. Generate shared libraries (types, utils, hooks, constants, UI)
2. Generate API domain libraries (auth, cart, orders, users)
3. Generate shop feature libraries (cart, checkout, auth)
4. Update existing sample code to use new architecture
5. Remove deprecated/sample code

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

**Last Updated**: 2026-04-26  
**Phase**: Phase 1 - Foundation  
**Task**: 1.1 - Project Configuration & Dependencies  
**Status**: ✅ Complete
