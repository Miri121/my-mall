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
- Rate limiting and request validation
- Response aggregation from multiple services
- API documentation (Swagger)

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
GET    /vendors/:id          - Get vendor details (Admin only)
PUT    /vendors/:id          - Update vendor (Admin only)
DELETE /vendors/:id          - Delete vendor (Admin only)
GET    /vendors/:id/stores   - Get vendor's stores (Admin only)
GET    /vendors/:id/stats    - Get vendor statistics (Admin only)
```

**Who Can Access:**
- Admin: Full CRUD
- Vendor: Read own profile only (via Auth Service)

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
POST   /stores               - Create store (Admin only)
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
- Platform statistics and analytics
- Dashboard metrics aggregation
- System health monitoring
- Audit log management
- Platform-wide reports
- Admin-specific business logic

**Database:** PostgreSQL (admin_db)

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

| Service | Port | Database |
|---------|------|----------|
| API Gateway | 3000 | None |
| Vendor Service | 3001 | vendor_db |
| User Service | 3002 | user_db |
| Store Service | 3003 | store_db |
| Product Service | 3004 | product_db |
| Auth Service | 3005 | auth_db |
| Admin Service | 3006 | admin_db |
| RabbitMQ | 5672 | N/A |
| RabbitMQ Management | 15672 | N/A |

---

## Deployment Architecture

### Docker Compose (Development)

```yaml
version: '3.8'
services:
  api-gateway:
    build: ./apps/backend/api-gateway
    ports: ["3000:3000"]
    depends_on: [rabbitmq]
    
  vendor-service:
    build: ./apps/backend/vendor-service
    ports: ["3001:3001"]
    depends_on: [vendor-db, rabbitmq]
    
  user-service:
    build: ./apps/backend/user-service
    ports: ["3002:3002"]
    depends_on: [user-db, rabbitmq]
    
  store-service:
    build: ./apps/backend/store-service
    ports: ["3003:3003"]
    depends_on: [store-db, rabbitmq]
    
  product-service:
    build: ./apps/backend/product-service
    ports: ["3004:3004"]
    depends_on: [product-db, rabbitmq]
    
  auth-service:
    build: ./apps/backend/auth-service
    ports: ["3005:3005"]
    depends_on: [auth-db, rabbitmq]
    
  admin-service:
    build: ./apps/backend/admin-service
    ports: ["3006:3006"]
    depends_on: [admin-db, rabbitmq]
    
  rabbitmq:
    image: rabbitmq:3-management
    ports: ["5672:5672", "15672:15672"]
    
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

---

## Monitoring & Observability

### Metrics (Prometheus)
- Request rate, latency, error rate per service
- RabbitMQ queue depth and message rate
- Database connection pool usage
- CPU and memory usage per service

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

---

This 7-microservice architecture provides maximum flexibility, scalability, and maintainability for the e-commerce platform.
