# E-Commerce Platform - Architecture Diagrams

## System Architecture Overview

```mermaid
graph TB
    subgraph "Frontend Applications"
        Mall[Mall App<br/>Port 4200<br/>Customer Interface]
        Vendor[Vendor App<br/>Port 4201<br/>Vendor Dashboard]
        Admin[Admin App<br/>Port 4202<br/>Admin Panel]
    end

    subgraph "Shared Libraries"
        UI[shared/ui<br/>shadcn/ui Components]
        DataAccess[shared/data-access<br/>TanStack Query Hooks]
        Types[shared/types<br/>Zod Schemas]
        Utils[shared/utils<br/>Helper Functions]
        I18n[shared/i18n<br/>Translations]
    end

    subgraph "Feature Libraries"
        Auth[features/auth<br/>Authentication]
        VendorFeature[features/vendors<br/>Vendor Management]
        StoreFeature[features/stores<br/>Store Management]
        ProductFeature[features/products<br/>Product Management]
        UserFeature[features/users<br/>User Management]
        SearchFeature[features/search<br/>Search & Filters]
    end

    subgraph "Domain Libraries"
        CustomerDomain[domain/customer<br/>Customer Logic]
        VendorDomain[domain/vendor<br/>Vendor Logic]
        AdminDomain[domain/admin<br/>Admin Logic]
    end

    subgraph "Backend"
        API[API Server<br/>Port 3000<br/>Express.js]
        DB[(PostgreSQL or MongoDB<br/>Database)]
        Storage[File Storage<br/>S3/Cloudinary]
    end

    Mall --> UI
    Mall --> DataAccess
    Mall --> Auth
    Mall --> StoreFeature
    Mall --> ProductFeature
    Mall --> SearchFeature
    Mall --> CustomerDomain

    Vendor --> UI
    Vendor --> DataAccess
    Vendor --> Auth
    Vendor --> ProductFeature
    Vendor --> VendorDomain

    Admin --> UI
    Admin --> DataAccess
    Admin --> Auth
    Admin --> VendorFeature
    Admin --> StoreFeature
    Admin --> UserFeature
    Admin --> AdminDomain

    DataAccess --> Types
    DataAccess --> Utils
    Auth --> Types
    VendorFeature --> Types
    StoreFeature --> Types
    ProductFeature --> Types
    UserFeature --> Types

    Mall --> I18n
    Vendor --> I18n
    Admin --> I18n

    DataAccess --> API
    API --> DB
    API --> Storage
```

---

## Data Flow - Customer Browsing Products

```mermaid
sequenceDiagram
    participant User
    participant MallApp
    participant ProductCard
    participant useProducts
    participant TanStackQuery
    participant API
    participant Database

    User->>MallApp: Navigate to Products Page
    MallApp->>useProducts: Call hook
    useProducts->>TanStackQuery: Query products

    alt Data in Cache
        TanStackQuery-->>useProducts: Return cached data
        useProducts-->>ProductCard: Display products
    else Cache Miss
        TanStackQuery->>API: GET /products
        API->>Database: Query products
        Database-->>API: Return products
        API-->>TanStackQuery: JSON response
        TanStackQuery-->>useProducts: Update cache
        useProducts-->>ProductCard: Display products
    end

    ProductCard-->>User: Show product list

    User->>ProductCard: Click product
    ProductCard->>MallApp: Navigate to detail
    MallApp->>useProducts: Prefetch product detail
```

---

## Data Flow - Vendor Creating Product

```mermaid
sequenceDiagram
    participant Vendor
    participant VendorApp
    participant ProductForm
    participant useCreateProduct
    participant TanStackQuery
    participant API
    participant Database

    Vendor->>VendorApp: Click Add Product
    VendorApp->>ProductForm: Show form
    Vendor->>ProductForm: Fill form data
    Vendor->>ProductForm: Upload images
    Vendor->>ProductForm: Submit

    ProductForm->>ProductForm: Validate with Zod

    alt Validation Success
        ProductForm->>useCreateProduct: Call mutation
        useCreateProduct->>TanStackQuery: Trigger mutation
        TanStackQuery->>API: POST /products
        API->>API: Validate auth & permissions
        API->>Database: Insert product
        Database-->>API: Return created product
        API-->>TanStackQuery: JSON response
        TanStackQuery->>TanStackQuery: Invalidate product queries
        TanStackQuery->>TanStackQuery: Update cache with setQueryData
        TanStackQuery-->>ProductForm: Success
        ProductForm->>ProductForm: Show success toast
        ProductForm->>VendorApp: Navigate to product list
    else Validation Error
        ProductForm->>ProductForm: Show error messages
    end
```

---

## Data Flow - Admin Creating Vendor

```mermaid
sequenceDiagram
    participant Admin
    participant AdminApp
    participant VendorForm
    participant useCreateVendor
    participant TanStackQuery
    participant API
    participant Database
    participant EmailService

    Admin->>AdminApp: Click Create Vendor
    AdminApp->>VendorForm: Show form
    Admin->>VendorForm: Fill vendor data
    Admin->>VendorForm: Submit

    VendorForm->>VendorForm: Validate with Zod

    alt Validation Success
        VendorForm->>useCreateVendor: Call mutation
        useCreateVendor->>TanStackQuery: Trigger mutation
        TanStackQuery->>API: POST /vendors
        API->>API: Check admin role
        API->>API: Hash password
        API->>Database: Insert vendor
        Database-->>API: Return created vendor
        API->>EmailService: Send credentials email
        API-->>TanStackQuery: JSON response
        TanStackQuery->>TanStackQuery: Invalidate vendor queries
        TanStackQuery->>TanStackQuery: Update cache with setQueryData
        TanStackQuery-->>VendorForm: Success
        VendorForm->>VendorForm: Show success toast
        VendorForm->>AdminApp: Close dialog
    else Validation Error
        VendorForm->>VendorForm: Show error messages
    end
```

---

## Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant App
    participant LoginForm
    participant useLogin
    participant API
    participant Database
    participant AuthKit

    User->>App: Navigate to login
    App->>LoginForm: Show login form
    User->>LoginForm: Enter credentials
    User->>LoginForm: Submit

    LoginForm->>LoginForm: Validate with Zod

    alt Validation Success
        LoginForm->>useLogin: Call mutation
        useLogin->>API: POST /auth/login
        API->>Database: Find user by email
        Database-->>API: Return user
        API->>API: Compare password hash

        alt Credentials Valid
            API->>API: Generate JWT tokens
            API-->>useLogin: Return tokens + user
            useLogin->>AuthKit: Store tokens in cookies
            AuthKit->>AuthKit: Set user state
            AuthKit-->>App: Authentication success

            alt User is Admin
                App->>App: Redirect to /admin/dashboard
            else User is Vendor
                App->>App: Redirect to /vendor/dashboard
            else User is Customer
                App->>App: Redirect to /stores
            end
        else Invalid Credentials
            API-->>LoginForm: 401 Unauthorized
            LoginForm->>LoginForm: Show error message
        end
    else Validation Error
        LoginForm->>LoginForm: Show validation errors
    end
```

---

## Library Dependency Graph

```mermaid
graph LR
    subgraph "Applications Layer"
        Mall[Mall App]
        Vendor[Vendor App]
        Admin[Admin App]
    end

    subgraph "Domain Layer"
        CustomerDomain[Customer Domain]
        VendorDomain[Vendor Domain]
        AdminDomain[Admin Domain]
    end

    subgraph "Feature Layer"
        Auth[Auth Feature]
        Vendors[Vendors Feature]
        Stores[Stores Feature]
        Products[Products Feature]
        Users[Users Feature]
        Search[Search Feature]
    end

    subgraph "Shared Layer"
        UI[UI Components]
        DataAccess[Data Access]
        Types[Types & Schemas]
        Utils[Utils]
        Config[Config]
        I18n[i18n]
    end

    Mall --> CustomerDomain
    Mall --> Auth
    Mall --> Stores
    Mall --> Products
    Mall --> Search
    Mall --> UI
    Mall --> DataAccess
    Mall --> I18n

    Vendor --> VendorDomain
    Vendor --> Auth
    Vendor --> Products
    Vendor --> UI
    Vendor --> DataAccess
    Vendor --> I18n

    Admin --> AdminDomain
    Admin --> Auth
    Admin --> Vendors
    Admin --> Stores
    Admin --> Users
    Admin --> UI
    Admin --> DataAccess
    Admin --> I18n

    CustomerDomain --> UI
    CustomerDomain --> DataAccess
    VendorDomain --> UI
    VendorDomain --> DataAccess
    AdminDomain --> UI
    AdminDomain --> DataAccess

    Auth --> UI
    Auth --> DataAccess
    Auth --> Types
    Vendors --> UI
    Vendors --> DataAccess
    Vendors --> Types
    Stores --> UI
    Stores --> DataAccess
    Stores --> Types
    Products --> UI
    Products --> DataAccess
    Products --> Types
    Users --> UI
    Users --> DataAccess
    Users --> Types
    Search --> UI
    Search --> DataAccess
    Search --> Types

    DataAccess --> Types
    DataAccess --> Utils
    DataAccess --> Config
    UI --> Utils
```

---

## Database Schema

```mermaid
erDiagram
    USERS ||--o{ VENDORS : "has role"
    USERS ||--o{ REFRESH_TOKENS : "has"
    USERS ||--o{ AUDIT_LOGS : "creates"
    VENDORS ||--o{ STORES : "owns"
    STORES ||--o{ PRODUCTS : "contains"
    CATEGORIES ||--o{ PRODUCTS : "categorizes"
    CATEGORIES ||--o{ CATEGORIES : "parent-child"
    PRODUCTS ||--o{ PRODUCT_IMAGES : "has"

    USERS {
        uuid id PK
        string email UK
        string password
        string name
        enum role
        string avatar
        boolean isActive
        timestamp createdAt
        timestamp updatedAt
    }

    VENDORS {
        uuid id PK
        uuid userId FK
        string company
        string phone
        timestamp createdAt
        timestamp updatedAt
    }

    STORES {
        uuid id PK
        string name
        string slug UK
        text description
        string logo
        string coverImage
        uuid vendorId FK
        boolean isActive
        timestamp createdAt
        timestamp updatedAt
    }

    PRODUCTS {
        uuid id PK
        string name
        text description
        decimal price
        decimal comparePrice
        integer stock
        uuid storeId FK
        uuid categoryId FK
        boolean isActive
        timestamp createdAt
        timestamp updatedAt
    }

    PRODUCT_IMAGES {
        uuid id PK
        uuid productId FK
        string url
        integer order
        timestamp createdAt
    }

    CATEGORIES {
        uuid id PK
        string name
        string slug UK
        text description
        uuid parentId FK
        timestamp createdAt
        timestamp updatedAt
    }

    REFRESH_TOKENS {
        uuid id PK
        uuid userId FK
        string token UK
        timestamp expiresAt
        timestamp createdAt
    }

    AUDIT_LOGS {
        uuid id PK
        uuid userId FK
        string action
        string entity
        uuid entityId
        json changes
        string ipAddress
        string userAgent
        timestamp createdAt
    }
```

---

## Component Hierarchy - Mall App

```mermaid
graph TD
    App[App Root]
    App --> AuthProvider[AuthProvider]
    AuthProvider --> QueryProvider[QueryClientProvider]
    QueryProvider --> I18nProvider[I18nProvider]
    I18nProvider --> Router[TanStack Router]

    Router --> HomePage[Home Page]
    Router --> StoresPage[Stores Page]
    Router --> StorePage[Store Detail Page]
    Router --> ProductsPage[Products Page]
    Router --> ProductPage[Product Detail Page]
    Router --> SearchPage[Search Page]
    Router --> ProfilePage[Profile Page]

    HomePage --> Header[Header]
    HomePage --> Hero[Hero Section]
    HomePage --> FeaturedStores[Featured Stores]
    HomePage --> PopularProducts[Popular Products]
    HomePage --> Footer[Footer]

    StoresPage --> Header
    StoresPage --> StoreGrid[Store Grid]
    StoresPage --> Footer
    StoreGrid --> StoreCard[Store Card]

    ProductsPage --> Header
    ProductsPage --> ProductFilters[Product Filters]
    ProductsPage --> ProductGrid[Product Grid]
    ProductsPage --> Footer
    ProductGrid --> ProductCard[Product Card]

    ProductPage --> Header
    ProductPage --> ProductDetail[Product Detail]
    ProductPage --> RelatedProducts[Related Products]
    ProductPage --> Footer
    ProductDetail --> ImageGallery[Image Gallery]
    ProductDetail --> ProductInfo[Product Info]
```

---

## Deployment Architecture

```mermaid
graph TB
    subgraph "CDN Layer"
        CloudFront[CloudFront CDN]
    end

    subgraph "Frontend Hosting - Vercel"
        MallDeploy[Mall App<br/>mall.domain.com]
        VendorDeploy[Vendor App<br/>vendor.domain.com]
        AdminDeploy[Admin App<br/>admin.domain.com]
    end

    subgraph "Backend Hosting - Railway"
        APIDeploy[API Server<br/>api.domain.com]
        DBDeploy[(PostgreSQL or MongoDB<br/>Database)]
    end

    subgraph "File Storage"
        S3[AWS S3<br/>Images & Files]
    end

    subgraph "Monitoring"
        Sentry[Sentry<br/>Error Tracking]
        Analytics[Analytics<br/>User Tracking]
    end

    subgraph "CI/CD"
        GitHub[GitHub Actions]
    end

    Users[Users] --> CloudFront
    CloudFront --> MallDeploy
    CloudFront --> VendorDeploy
    CloudFront --> AdminDeploy

    MallDeploy --> APIDeploy
    VendorDeploy --> APIDeploy
    AdminDeploy --> APIDeploy

    APIDeploy --> DBDeploy
    APIDeploy --> S3

    MallDeploy --> Sentry
    VendorDeploy --> Sentry
    AdminDeploy --> Sentry
    APIDeploy --> Sentry

    MallDeploy --> Analytics

    GitHub --> MallDeploy
    GitHub --> VendorDeploy
    GitHub --> AdminDeploy
    GitHub --> APIDeploy
```

---

## Technology Stack Layers

```mermaid
graph TB
    subgraph "Presentation Layer"
        React[React 19]
        TailwindCSS[Tailwind CSS]
        ShadcnUI[shadcn/ui]
        Storybook[Storybook]
    end

    subgraph "State Management Layer"
        TanStackQuery[TanStack Query<br/>Server State]
        Zustand[Zustand<br/>Client State]
        ReactHookForm[React Hook Form<br/>Form State]
    end

    subgraph "Routing & Navigation"
        TanStackRouter[TanStack Router]
    end

    subgraph "Authentication Layer"
        ReactAuthKit[react-auth-kit]
        JWT[JWT Tokens]
    end

    subgraph "Validation Layer"
        Zod[Zod Schemas]
    end

    subgraph "API Layer"
        Axios[Axios HTTP Client]
    end

    subgraph "Backend Layer"
        Express[Express.js]
        Prisma[Prisma ORM]
    end

    subgraph "Database Layer"
        PostgreSQL[PostgreSQL] or
        MongoDB[MongoDB]
    end

    subgraph "Build & Dev Tools"
        Nx[Nx Monorepo]
        Vite[Vite Bundler]
        TypeScript[TypeScript]
    end

    React --> TanStackQuery
    React --> Zustand
    React --> ReactHookForm
    React --> TanStackRouter
    React --> ReactAuthKit
    React --> ShadcnUI

    ReactHookForm --> Zod
    TanStackQuery --> Axios
    ReactAuthKit --> JWT

    Axios --> Express
    Express --> Prisma
    Prisma --> PostgreSQL or MongoDB

    Nx --> Vite
    Vite --> TypeScript
```

---

## Notes

These diagrams provide a visual representation of:

1. **System Architecture** - How all components fit together
2. **Data Flows** - How data moves through the system
3. **Authentication** - How users log in and access resources
4. **Dependencies** - How libraries depend on each other
5. **Database Schema** - How data is structured
6. **Component Hierarchy** - How UI components are organized
7. **Deployment** - How the system is deployed to production
8. **Technology Stack** - How technologies layer on each other

Use these diagrams as reference when implementing the system to understand the big picture and how components interact.
