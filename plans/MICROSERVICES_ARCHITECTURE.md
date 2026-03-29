# NestJS Microservices Architecture - 7 Services

## Overview

The backend uses **7 independent NestJS microservices** with **RabbitMQ** message broker for inter-service communication. Each service has a single, well-defined responsibility.

---

## Service Architecture

### 1. API Gateway (Port 3000)

**Technology:** NestJS with Express adapter

**Responsibilities:**

- Single entry point for all client requests
- Route requests to appropriate microservices
- JWT authentication middleware
- Rate limiting and request validation (Redis-based)
- Response caching (Redis-based)
- Response aggregation from multiple services
- API documentation (Swagger)

**Redis Integration:**

- **Rate Limiting**: Track request counts per IP/user (60-second sliding window)
- **Response Caching**: Cache GET responses for products, stores, categories (5-30 min TTL)
- **Session Validation**: Validate user sessions stored in Redis
- **Request Deduplication**: Prevent duplicate requests within short timeframes

**Endpoints:**

- `/api/auth/*` → Auth Service
- `/api/vendors/*` → Vendor Service
- `/api/users/*` → User Service
- `/api/stores/*` → Store Service
- `/api/products/*` → Product Service
- `/api/categories/*` → Product Service
- `/api/search/*` → Product Service
- `/api/admin/*` → Admin Service

---

### 2. Vendor Service (Port 3001)

**Technology:** NestJS Microservice

**Responsibilities:**

- Vendor CRUD operations (admin only)
- Vendor profile management
- Vendor statistics
- Vendor-store relationships

**Database:** PostgreSQL (vendor_db)

**Events Published:**

- `vendor.created` - When a new vendor is created
- `vendor.updated` - When vendor details are updated
- `vendor.deleted` - When a vendor is deleted

**Events Subscribed:**

- None (Vendor service is the source of truth)

**API Endpoints:**

```
POST   /vendors              - Create vendor (Admin only)
GET    /vendors              - List vendors (Admin only)
GET    /vendors/:id          - Get vendor details (Admin / Vendor self)
PUT    /vendors/:id          - Update vendor (Admin only - all fields)
PUT    /vendors/me/password  - Update password (Vendor self only)
DELETE /vendors/:id          - Delete vendor (Admin only)
GET    /vendors/:id/stores   - Get vendor's stores (Admin / Vendor self)
GET    /vendors/:id/stats    - Get vendor statistics (Admin only)
```

**Who Can Access:**

- Admin: Full CRUD on all fields
- Vendor: Read own profile + Update own password ONLY (cannot update email, name, company, phone)

---

### 3. User Service (Port 3002)

**Technology:** NestJS Microservice

**Responsibilities:**

- User (Customer) CRUD operations
- User profile management
- User preferences
- User activity tracking

**Database:** PostgreSQL (user_db)

**Events Published:**

- `user.created` - When a new user is created
- `user.updated` - When user details are updated
- `user.deleted` - When a user is deleted

**Events Subscribed:**

- None (User service is the source of truth)

**API Endpoints:**

```
POST   /users                - Create user (Self-registration or Admin)
GET    /users                - List users (Admin only)
GET    /users/:id            - Get user details (Admin or self)
GET    /users/me             - Get current user (Self)
PUT    /users/:id            - Update user (Admin or self)
PUT    /users/me             - Update current user (Self)
DELETE /users/:id            - Delete user (Admin or self)
DELETE /users/me             - Delete current user (Self)
POST   /users/me/avatar      - Upload avatar (Self)
```

**Who Can Access:**

- Admin: Full CRUD on all users
- Customer: CRUD on own account only

---

### 4. Store Service (Port 3003)

**Technology:** NestJS Microservice

**Responsibilities:**

- Store CRUD operations
- Store catalog management
- Store-product relationships
- Store analytics and statistics
- Store search and filtering

**Database:** PostgreSQL (store_db)

**Redis Integration:**

- **Store Caching**: Cache individual stores (30 min TTL)
- **Store List Caching**: Cache filtered store lists (30 min TTL)
- **Store Product Count**: Cache denormalized product counts (15 min TTL)
- **Store Statistics**: Cache vendor performance metrics (10 min TTL)

**Events Published:**

- `store.created` - When a new store is created
- `store.updated` - When store details are updated
- `store.deleted` - When a store is deleted

**Events Subscribed:**

- `vendor.deleted` - Cascade delete or deactivate stores
- `product.created` - Update store product count
- `product.deleted` - Update store product count

**API Endpoints:**

```
POST   /stores               - Create store (Admin only) - URL field REQUIRED
GET    /stores               - List stores (Public)
GET    /stores/:id           - Get store details (Public)
GET    /stores/slug/:slug    - Get store by slug (Public)
PUT    /stores/:id           - Update store (Admin only)
DELETE /stores/:id           - Delete store (Admin only)
POST   /stores/:id/logo      - Upload store logo (Admin only)
POST   /stores/:id/cover     - Upload store cover (Admin only)
GET    /stores/:id/products  - Get store products (Public)
GET    /stores/:id/stats     - Get store statistics (Admin only)
```

**Note:** The `url` field is REQUIRED when creating a store. It stores the external website URL that will be displayed via iframe.

**Who Can Access:**

- Admin: Full CRUD
- Vendor: Read own stores only
- Customer: Read all active stores (public)

---

### 5. Product Service (Port 3004)

**Technology:** NestJS Microservice

**Responsibilities:**

- Product CRUD operations
- **Category management** (CRUD operations for product categories)
- Product search and filtering
- Image upload handling
- Product analytics

**Database:** PostgreSQL (product_db)

**Redis Integration:**

- **Product Caching**: Cache individual products (15 min TTL)
- **Product List Caching**: Cache filtered product lists (10 min TTL)
- **Search Results Caching**: Cache search queries and results (5 min TTL)
- **Search Suggestions**: Cache autocomplete suggestions (1 hour TTL)
- **Category Tree Caching**: Cache hierarchical categories (1 hour TTL)
- **Product View Counts**: Track views in Redis, batch write to PostgreSQL
- **Popular Products**: Maintain sorted sets of trending products

**Events Published:**

- `product.created` - When a new product is created
- `product.updated` - When product details are updated
- `product.deleted` - When a product is deleted
- `product.viewed` - When a product is viewed

**Events Subscribed:**

- `store.deleted` - Cascade delete or deactivate products
- `vendor.deleted` - Cascade delete vendor's products

**API Endpoints:**

```
POST   /products             - Create product (Vendor only)
GET    /products             - List products (Public, with filters)
GET    /products/:id         - Get product details (Public)
PUT    /products/:id         - Update product (Vendor only, own products)
DELETE /products/:id         - Delete product (Vendor only, own products)
POST   /products/:id/images  - Upload product images (Vendor only)
DELETE /products/:id/images/:imageId - Delete product image (Vendor only)

POST   /categories           - Create category (Admin only)
GET    /categories           - List categories (Public)
GET    /categories/:id       - Get category details (Public)
PUT    /categories/:id       - Update category (Admin only)
DELETE /categories/:id       - Delete category (Admin only)

GET    /search/products      - Search products (Public)
GET    /search/suggestions   - Get search suggestions (Public)
```

**Who Can Access:**

- Admin: Read all products
- Vendor: Full CRUD on own products only
- Customer: Read all active products (public)

---

### 6. Auth Service (Port 3005)

**Technology:** NestJS Microservice

**Responsibilities:**

- User authentication (login, register, logout)
- Vendor authentication
- Admin authentication
- JWT token generation and validation
- Password reset functionality
- OAuth integration (Google)
- Session management
- Refresh token handling

**Database:** PostgreSQL (auth_db)

**Redis Integration:**

- **Session Management**: Store active sessions across all services (24 hour TTL)
- **Refresh Token Storage**: Store refresh tokens with TTL (7 days)
- **Password Reset Tokens**: Temporary tokens with expiration (1 hour TTL)
- **Login Attempt Tracking**: Prevent brute force attacks (15 min TTL)
- **OAuth State Management**: Store OAuth flow state (10 min TTL)
- **Account Lockout**: Track failed login attempts and lock accounts

**Events Published:**

- `user.logged_in` - When a user logs in
- `user.logged_out` - When a user logs out
- `user.registered` - When a new user registers
- `password.reset` - When password is reset

**Events Subscribed:**

- `user.created` - Sync user credentials
- `user.updated` - Sync user updates
- `user.deleted` - Remove user credentials
- `vendor.created` - Sync vendor credentials
- `vendor.updated` - Sync vendor updates
- `vendor.deleted` - Remove vendor credentials

**API Endpoints:**

```
POST   /auth/login           - User/Vendor/Admin login
POST   /auth/register        - User registration (customers only)
POST   /auth/logout          - User logout
POST   /auth/refresh         - Refresh access token
POST   /auth/google          - Google OAuth login
POST   /auth/reset-password  - Request password reset
GET    /auth/verify-reset/:token - Verify reset token
POST   /auth/update-password - Update password with token
GET    /auth/me              - Get current authenticated user
```

**Who Can Access:**

- Public: Login, register, password reset
- Authenticated: Logout, refresh, get current user

---

### 7. Admin Service (Port 3006)

**Technology:** NestJS Microservice

**Responsibilities:**

- Platform statistics and analytics (aggregated from events)
- Dashboard metrics aggregation
- System health monitoring
- Audit log management
- Platform-wide reports
- **DOES NOT handle CRUD operations** - only statistics and monitoring

**Important:** Admin Service does NOT perform CRUD operations on vendors, users, stores, or products. Those operations are handled by their respective services (Vendor Service, User Service, Store Service, Product Service). Admin Service ONLY aggregates statistics and manages audit logs.

**Database:** PostgreSQL (admin_db)

**Redis Integration:**

- **Dashboard Statistics Caching**: Cache aggregated platform stats (10 min TTL)
- **Report Caching**: Cache pre-computed reports (1 hour TTL)
- **Audit Log Buffer**: Buffer audit logs before batch writing to PostgreSQL
- **Real-time Metrics**: Track real-time platform metrics

**Events Published:**

- `admin.action.logged` - When admin performs an action

**Events Subscribed:**

- `vendor.created` - Update platform statistics
- `vendor.deleted` - Update platform statistics
- `user.created` - Update platform statistics
- `user.deleted` - Update platform statistics
- `store.created` - Update platform statistics
- `store.deleted` - Update platform statistics
- `product.created` - Update platform statistics
- `product.deleted` - Update platform statistics

**API Endpoints:**

```
GET    /admin/dashboard      - Get dashboard statistics (Admin only)
GET    /admin/stats          - Get platform statistics (Admin only)
GET    /admin/audit-logs     - Get audit logs (Admin only)
GET    /admin/reports        - Generate reports (Admin only)
GET    /admin/health         - System health check (Admin only)
```

**Who Can Access:**

- Admin only: All endpoints

---

## RabbitMQ Message Broker (Port 5672)

**Technology:** RabbitMQ

**Responsibilities:**

- Event-driven communication between services
- Ensures eventual consistency
- Handles async operations
- Retry mechanisms for failed messages
- Dead letter queues for error handling

**Exchange Types:**

- **Topic Exchange** - For event routing based on patterns
- **Direct Exchange** - For specific service-to-service communication

**Queues:**

- `vendor.events` - Vendor service events
- `user.events` - User service events
- `store.events` - Store service events
- `product.events` - Product service events
- `auth.events` - Auth service events
- `admin.events` - Admin service events

**Message Format:**

```typescript
{
  eventType: string;        // e.g., 'vendor.created'
  timestamp: Date;
  data: any;                // Event payload
  metadata: {
    userId?: string;
    correlationId: string;  // For tracing
    source: string;         // Service that published
  }
}
```

---

## Redis Cache Layer (Port 6379)

**Technology:** Redis 7

**Responsibilities:**

- Distributed caching across all microservices
- Session storage and management
- Rate limiting counters
- Real-time analytics and counters
- Temporary data storage (tokens, OTP, etc.)
- Pub/Sub for real-time features (optional)

**Integration Points:**

- **API Gateway**: Rate limiting, response caching, session validation
- **Auth Service**: Sessions, refresh tokens, password reset tokens, login tracking
- **Product Service**: Product caching, search results, category tree, view counts
- **Store Service**: Store caching, store lists, statistics
- **Admin Service**: Dashboard statistics, reports, audit log buffering
- **User Service**: User profile caching (optional)
- **Vendor Service**: Vendor profile caching (optional)

**Cache Invalidation Strategy:**

1. **Time-Based (TTL)**:

   - Products: 15 minutes
   - Stores: 30 minutes
   - Categories: 1 hour
   - Search results: 5 minutes
   - Dashboard stats: 10 minutes
   - Sessions: 24 hours

2. **Event-Based (via RabbitMQ)**:
   - `product.updated` → Invalidate product cache
   - `store.updated` → Invalidate store cache
   - `category.updated` → Invalidate category tree
   - `user.updated` → Invalidate user session

**Key Naming Convention:**

```
{service}:{entity}:{identifier}:{attribute}

Examples:
product:prod_123
products:list:active
search:products:laptop
session:user_123
rate_limit:192.168.1.1:/api/products
```

**Configuration:**

```typescript
{
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => Math.min(times * 50, 2000)
}
```

**Benefits:**

- 60-80% reduction in database queries
- Sub-100ms response times for cached data
- Horizontal scalability
- Improved user experience
- Reduced infrastructure costs

---

## Inter-Service Communication

### Synchronous Communication (HTTP/REST)

**When to use:**

- Client needs immediate response
- CRUD operations
- Data retrieval

**Flow:**

```
Client → API Gateway → Microservice → Database → Response
```

### Asynchronous Communication (RabbitMQ)

**When to use:**

- Events that don't need immediate response
- Background tasks
- Cross-service data synchronization
- Notifications

**Flow:**

```
Service → RabbitMQ → Subscribed Services
```

---

## Data Flow Examples

### Example 1: Admin Creates Vendor

```
1. Admin App → API Gateway (POST /api/vendors)
2. API Gateway validates JWT and admin role
3. API Gateway → Vendor Service (HTTP)
4. Vendor Service:
   - Validates request data
   - Hashes password
   - Saves vendor to vendor_db
   - Publishes 'vendor.created' event to RabbitMQ
5. RabbitMQ routes event to:
   - Auth Service (syncs credentials)
   - Admin Service (updates statistics)
6. Vendor Service returns response to API Gateway
7. API Gateway returns response to Admin App
```

### Example 2: Vendor Creates Product

```
1. Vendor App → API Gateway (POST /api/products)
2. API Gateway validates JWT and vendor role
3. API Gateway → Product Service (HTTP)
4. Product Service:
   - Validates vendor owns the store
   - Uploads images to S3
   - Saves product to product_db
   - Publishes 'product.created' event to RabbitMQ
5. RabbitMQ routes event to:
   - Store Service (updates product count)
   - Admin Service (updates statistics)
6. Product Service returns response to API Gateway
7. API Gateway returns response to Vendor App
```

### Example 3: Customer Registers Account

```
1. Mall App → API Gateway (POST /api/users)
2. API Gateway → User Service (HTTP)
3. User Service:
   - Validates email not already exists
   - Hashes password
   - Saves user to user_db
   - Publishes 'user.created' event to RabbitMQ
4. RabbitMQ routes event to:
   - Auth Service (syncs credentials)
   - Admin Service (updates statistics)
5. User Service returns response to API Gateway
6. API Gateway returns response to Mall App
7. Mall App auto-logs in the user
```

### Example 4: Admin Deletes Vendor (Cascade)

```
1. Admin App → API Gateway (DELETE /api/vendors/:id)
2. API Gateway validates JWT and admin role
3. API Gateway → Vendor Service (HTTP)
4. Vendor Service:
   - Marks vendor as deleted in vendor_db
   - Publishes 'vendor.deleted' event to RabbitMQ
5. RabbitMQ routes event to:
   - Store Service (deactivates vendor's stores)
   - Auth Service (removes vendor credentials)
   - Admin Service (updates statistics)
6. Store Service publishes 'store.deleted' events
7. Product Service listens and deactivates products
8. Vendor Service returns response to API Gateway
9. API Gateway returns response to Admin App
```

---

## Database Strategy

### Database per Service Pattern

Each microservice has its own database:

- `vendor_db` - Vendors
- `user_db` - Users (Customers)
- `store_db` - Stores
- `product_db` - Products, Categories
- `auth_db` - User credentials, Refresh tokens, Sessions
- `admin_db` - Audit logs, Platform statistics

**Benefits:**

- Data isolation
- Independent scaling
- Technology flexibility
- Fault isolation
- Clear ownership

---

## Port Allocation

| Service             | Port  | Database/Storage  |
| ------------------- | ----- | ----------------- |
| API Gateway         | 3000  | None (uses Redis) |
| Vendor Service      | 3001  | vendor_db         |
| User Service        | 3002  | user_db           |
| Store Service       | 3003  | store_db          |
| Product Service     | 3004  | product_db        |
| Auth Service        | 3005  | auth_db           |
| Admin Service       | 3006  | admin_db          |
| RabbitMQ            | 5672  | N/A               |
| RabbitMQ Management | 15672 | N/A               |
| Redis               | 6379  | N/A               |

---

## Deployment Architecture

### Docker Compose (Development)

```yaml
version: '3.8'
services:
  api-gateway:
    build: ./apps/backend/api-gateway
    ports: ['3000:3000']
    depends_on: [rabbitmq, redis]
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379

  vendor-service:
    build: ./apps/backend/vendor-service
    ports: ['3001:3001']
    depends_on: [vendor-db, rabbitmq, redis]
    environment:
      - REDIS_HOST=redis

  user-service:
    build: ./apps/backend/user-service
    ports: ['3002:3002']
    depends_on: [user-db, rabbitmq, redis]
    environment:
      - REDIS_HOST=redis

  store-service:
    build: ./apps/backend/store-service
    ports: ['3003:3003']
    depends_on: [store-db, rabbitmq, redis]
    environment:
      - REDIS_HOST=redis

  product-service:
    build: ./apps/backend/product-service
    ports: ['3004:3004']
    depends_on: [product-db, rabbitmq, redis]
    environment:
      - REDIS_HOST=redis

  auth-service:
    build: ./apps/backend/auth-service
    ports: ['3005:3005']
    depends_on: [auth-db, rabbitmq, redis]
    environment:
      - REDIS_HOST=redis

  admin-service:
    build: ./apps/backend/admin-service
    ports: ['3006:3006']
    depends_on: [admin-db, rabbitmq, redis]
    environment:
      - REDIS_HOST=redis

  rabbitmq:
    image: rabbitmq:3-management
    ports: ['5672:5672', '15672:15672']

  redis:
    image: redis:7-alpine
    ports: ['6379:6379']
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 3s
      retries: 3

  vendor-db:
    image: postgres:15
    environment:
      POSTGRES_DB: vendor_db

  user-db:
    image: postgres:15
    environment:
      POSTGRES_DB: user_db

  store-db:
    image: postgres:15
    environment:
      POSTGRES_DB: store_db

  product-db:
    image: postgres:15
    environment:
      POSTGRES_DB: product_db

  auth-db:
    image: postgres:15
    environment:
      POSTGRES_DB: auth_db

  admin-db:
    image: postgres:15
    environment:
      POSTGRES_DB: admin_db

volumes:
  redis-data:
```

---

## Advantages of 7-Service Architecture

### Clear Separation of Concerns

✅ Each service has a single, well-defined responsibility
✅ Vendor management separate from user management
✅ Store operations independent
✅ Product catalog isolated

### Independent Scaling

✅ Scale Vendor Service independently (fewer operations)
✅ Scale User Service independently (high traffic)
✅ Scale Product Service independently (most queries)
✅ Scale Store Service independently (moderate traffic)

### Team Autonomy

✅ Different teams can own different services
✅ Vendor team owns Vendor Service
✅ User team owns User Service
✅ Product team owns Product + Store Services

### Fault Isolation

✅ Vendor Service failure doesn't affect User Service
✅ Product Service failure doesn't affect authentication
✅ Better system resilience

### Technology Flexibility

✅ Each service can use different database if needed
✅ Can upgrade services independently
✅ Can use different tech stacks per service

---

## Security Considerations

### API Gateway Security

- JWT validation
- Rate limiting (per IP, per user)
- CORS configuration
- Request size limits
- Input sanitization

### Service-to-Service Security

- Internal network isolation
- Service authentication (API keys)
- Encrypted communication (TLS)
- Network policies (Kubernetes)

### Database Security

- Connection pooling
- Prepared statements
- Encrypted connections
- Regular backups
- Access control lists

### Redis Security

- Password authentication (production)
- TLS encryption for connections
- Network isolation (internal only)
- Key expiration policies
- Memory limits and eviction policies
- Regular backups (AOF persistence)

---

## Monitoring & Observability

### Metrics (Prometheus)

- Request rate, latency, error rate per service
- RabbitMQ queue depth and message rate
- Database connection pool usage
- CPU and memory usage per service
- **Redis metrics:**
  - Cache hit/miss rate
  - Memory usage and eviction rate
  - Connection count
  - Command latency
  - Key expiration rate

### Logging (ELK Stack)

- Centralized logging from all services
- Correlation IDs for request tracing
- Structured JSON logs
- Log levels: ERROR, WARN, INFO, DEBUG

### Tracing (Jaeger)

- Distributed tracing across services
- Request flow visualization
- Performance bottleneck identification
- Latency analysis

### Dashboards (Grafana)

- Service health overview
- Request throughput
- Error rates
- Database performance
- RabbitMQ metrics
- **Redis performance:**
  - Cache hit rate trends
  - Memory usage over time
  - Top cached keys
  - Slow commands

---

This 7-microservice architecture with Redis caching provides maximum flexibility, scalability, and maintainability for the e-commerce platform.

**Key Benefits of Redis Integration:**

- 60-80% reduction in database load
- Sub-100ms response times for cached data
- Improved scalability and user experience
- Reduced infrastructure costs
- Enhanced security with rate limiting and session management
