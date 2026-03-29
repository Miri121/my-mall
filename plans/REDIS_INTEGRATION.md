# Redis Integration Guide - E-Commerce Platform

## Overview

Redis is integrated as a **distributed caching layer** and **session store** across all 7 microservices to improve performance, scalability, and user experience.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Client Applications                   │
│         (Mall App, Vendor App, Admin App)               │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              API Gateway (Port 3000)                     │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Redis Integration:                               │   │
│  │ • Rate Limiting (per IP/user)                   │   │
│  │ • Response Caching (GET requests)               │   │
│  │ • Session Validation                            │   │
│  │ • Request Deduplication                         │   │
│  └─────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
         ┌───────────────────────────────┐
         │   Redis Cluster (Port 6379)   │
         │   • Cache Storage             │
         │   • Session Storage           │
         │   • Rate Limit Counters       │
         │   • Pub/Sub (optional)        │
         └───────────────┬───────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Auth Service │  │Product Service│  │Admin Service │
│  (Port 3005) │  │  (Port 3004)  │  │  (Port 3006) │
│              │  │               │  │              │
│ • Sessions   │  │ • Search Cache│  │ • Stats Cache│
│ • Tokens     │  │ • Product Cache│ │ • Reports    │
│ • Login Track│  │ • Category Tree│ │ • Audit Logs │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## Redis Integration by Service

### 1. API Gateway (Port 3000) - CRITICAL

#### Use Cases

**Rate Limiting:**

```typescript
// Key Pattern: rate_limit:{ip}:{endpoint}
// TTL: 60 seconds (sliding window)
// Value: Request count

rate_limit:192.168.1.1:/api/products → 45 requests
rate_limit:192.168.1.1:/api/auth/login → 5 requests
```

**Response Caching:**

```typescript
// Key Pattern: cache:{method}:{path}:{query_hash}
// TTL: Varies by endpoint (5-30 minutes)
// Value: JSON response

cache:GET:/api/products:abc123 → { products: [...], total: 100 }
cache:GET:/api/stores:def456 → { stores: [...], total: 25 }
cache:GET:/api/categories:ghi789 → { categories: [...] }
```

**Session Validation:**

```typescript
// Key Pattern: session:{user_id}
// TTL: 24 hours (refreshed on activity)
// Value: Session data

session:user_123 → { userId: '123', role: 'customer', lastActivity: '...' }
```

#### Implementation Priority

- **Phase 1 (MVP)**: Rate limiting, basic response caching
- **Phase 2**: Advanced caching strategies, cache warming

#### Configuration

```typescript
// Rate Limits
const RATE_LIMITS = {
  '/api/auth/login': { max: 5, window: 60 }, // 5 per minute
  '/api/auth/register': { max: 3, window: 60 }, // 3 per minute
  '/api/products': { max: 100, window: 60 }, // 100 per minute
  '/api/search': { max: 50, window: 60 }, // 50 per minute
  default: { max: 200, window: 60 }, // 200 per minute
};

// Cache TTLs
const CACHE_TTL = {
  products: 900, // 15 minutes
  stores: 1800, // 30 minutes
  categories: 3600, // 1 hour
  search: 300, // 5 minutes
};
```

---

### 2. Auth Service (Port 3005) - CRITICAL

#### Use Cases

**Session Management:**

```typescript
// Key Pattern: session:{user_id}
// TTL: 24 hours (configurable)
// Value: Session object

session:user_123 → {
  userId: '123',
  email: 'user@example.com',
  role: 'customer',
  createdAt: '2024-01-01T00:00:00Z',
  lastActivity: '2024-01-01T12:00:00Z',
  deviceInfo: { ... }
}
```

**Refresh Token Storage:**

```typescript
// Key Pattern: refresh_token:{token_hash}
// TTL: 7 days (configurable)
// Value: User ID and metadata

refresh_token:abc123hash → {
  userId: '123',
  issuedAt: '2024-01-01T00:00:00Z',
  deviceId: 'device_456'
}
```

**Password Reset Tokens:**

```typescript
// Key Pattern: reset_token:{token}
// TTL: 1 hour
// Value: User ID and email

reset_token:xyz789 → {
  userId: '123',
  email: 'user@example.com',
  createdAt: '2024-01-01T12:00:00Z'
}
```

**Login Attempt Tracking:**

```typescript
// Key Pattern: login_attempts:{email}
// TTL: 15 minutes
// Value: Attempt count

login_attempts:user@example.com → 3
// Lock account after 5 failed attempts
```

**OAuth State Management:**

```typescript
// Key Pattern: oauth_state:{state}
// TTL: 10 minutes
// Value: OAuth flow data

oauth_state:state_abc123 → {
  provider: 'google',
  redirectUri: 'https://mall.domain.com/auth/callback',
  createdAt: '2024-01-01T12:00:00Z'
}
```

#### Implementation Priority

- **Phase 1 (MVP)**: Session management, refresh tokens, login attempt tracking
- **Phase 2**: OAuth state, advanced security features

#### Security Considerations

- All tokens stored as SHA-256 hashes
- Session data encrypted at rest
- Automatic cleanup of expired sessions
- Rate limiting on token operations

---

### 3. Product Service (Port 3004) - HIGH PRIORITY

#### Use Cases

**Product Caching:**

```typescript
// Key Pattern: product:{id}
// TTL: 15 minutes
// Value: Product object

product:prod_123 → {
  id: 'prod_123',
  name: 'Product Name',
  price: 99.99,
  storeId: 'store_456',
  categoryId: 'cat_789',
  images: [...],
  ...
}
```

**Product List Caching:**

```typescript
// Key Pattern: products:list:{filters_hash}
// TTL: 10 minutes
// Value: Product array with pagination

products:list:abc123 → {
  products: [...],
  total: 100,
  page: 1,
  pageSize: 20
}
```

**Search Results Caching:**

```typescript
// Key Pattern: search:products:{query_hash}
// TTL: 5 minutes
// Value: Search results

search:products:laptop → {
  results: [...],
  total: 45,
  suggestions: ['laptop bag', 'laptop stand']
}
```

**Search Suggestions (Autocomplete):**

```typescript
// Key Pattern: search:suggestions:{prefix}
// TTL: 1 hour
// Value: Suggestion array

search:suggestions:lap → ['laptop', 'laptop bag', 'laptop stand', 'lap desk']
```

**Category Tree Caching:**

```typescript
// Key Pattern: categories:tree
// TTL: 1 hour
// Value: Hierarchical category structure

categories:tree → {
  electronics: {
    computers: ['laptops', 'desktops', 'tablets'],
    phones: ['smartphones', 'accessories']
  },
  ...
}
```

**Product View Counts:**

```typescript
// Key Pattern: product:views:{id}
// TTL: No expiration (persistent counter)
// Value: View count

product:views:prod_123 → 1547
// Batch write to PostgreSQL every 5 minutes
```

**Popular Products:**

```typescript
// Key Pattern: products:popular:{timeframe}
// TTL: 10 minutes
// Value: Sorted set of product IDs by view count

products:popular:24h → [
  { productId: 'prod_123', score: 1547 },
  { productId: 'prod_456', score: 1234 },
  ...
]
```

#### Implementation Priority

- **Phase 1 (MVP)**: Product caching, search results caching
- **Phase 2**: Category tree, search suggestions, view counts
- **Phase 3**: Popular products, trending items

#### Cache Invalidation Strategy

```typescript
// Event-based invalidation via RabbitMQ
'product.created' → Invalidate products:list:*
'product.updated' → Invalidate product:{id}, products:list:*
'product.deleted' → Invalidate product:{id}, products:list:*, search:*
'category.updated' → Invalidate categories:tree
```

---

### 4. Store Service (Port 3003) - MEDIUM PRIORITY

#### Use Cases

**Store Caching:**

```typescript
// Key Pattern: store:{id}
// TTL: 30 minutes
// Value: Store object

store:store_123 → {
  id: 'store_123',
  name: 'Store Name',
  slug: 'store-name',
  vendorId: 'vendor_456',
  url: 'https://external-store.com',
  ...
}
```

**Store List Caching:**

```typescript
// Key Pattern: stores:list:{filters_hash}
// TTL: 30 minutes
// Value: Store array

stores:list:active → {
  stores: [...],
  total: 25
}
```

**Store Product Count:**

```typescript
// Key Pattern: store:product_count:{store_id}
// TTL: 15 minutes
// Value: Product count

store:product_count:store_123 → 145
```

**Store Statistics:**

```typescript
// Key Pattern: store:stats:{store_id}
// TTL: 10 minutes
// Value: Statistics object

store:stats:store_123 → {
  productCount: 145,
  viewCount: 5432,
  popularProducts: [...],
  recentProducts: [...]
}
```

#### Implementation Priority

- **Phase 2**: Store caching, store list caching
- **Phase 3**: Store statistics, product counts

---

### 5. Admin Service (Port 3006) - MEDIUM PRIORITY

#### Use Cases

**Dashboard Statistics:**

```typescript
// Key Pattern: admin:dashboard:stats
// TTL: 10 minutes
// Value: Aggregated statistics

admin:dashboard:stats → {
  totalVendors: 50,
  totalStores: 125,
  totalProducts: 5432,
  totalUsers: 10000,
  activeUsers24h: 1234,
  revenue24h: 54321.00,
  topStores: [...],
  topProducts: [...]
}
```

**Report Caching:**

```typescript
// Key Pattern: admin:report:{report_type}:{params_hash}
// TTL: 1 hour
// Value: Report data

admin:report:sales:monthly_2024_01 → {
  period: '2024-01',
  totalSales: 123456.78,
  orderCount: 543,
  breakdown: [...]
}
```

**Audit Log Buffer:**

```typescript
// Key Pattern: admin:audit_log:buffer
// TTL: No expiration (list)
// Value: Audit log entries (batch write to DB)

admin:audit_log:buffer → [
  { action: 'vendor.created', userId: '123', timestamp: '...' },
  { action: 'product.updated', userId: '456', timestamp: '...' },
  ...
]
// Flush to PostgreSQL every 30 seconds
```

#### Implementation Priority

- **Phase 2**: Dashboard statistics caching
- **Phase 3**: Report caching, audit log buffering

---

### 6. User Service (Port 3002) - LOW PRIORITY

#### Use Cases

**User Profile Caching:**

```typescript
// Key Pattern: user:{id}
// TTL: 30 minutes
// Value: User object

user:user_123 → {
  id: 'user_123',
  email: 'user@example.com',
  name: 'John Doe',
  role: 'customer',
  ...
}
```

#### Implementation Priority

- **Phase 3**: User profile caching (optional)

---

### 7. Vendor Service (Port 3001) - LOW PRIORITY

#### Use Cases

**Vendor Profile Caching:**

```typescript
// Key Pattern: vendor:{id}
// TTL: 30 minutes
// Value: Vendor object

vendor:vendor_123 → {
  id: 'vendor_123',
  email: 'vendor@example.com',
  companyName: 'Company Inc.',
  ...
}
```

#### Implementation Priority

- **Phase 3**: Vendor profile caching (optional)

---

## Cache Invalidation Strategy

### 1. Time-Based Invalidation (TTL)

All cached data has a TTL (Time To Live) to ensure freshness:

| Data Type       | TTL      | Reason                           |
| --------------- | -------- | -------------------------------- |
| Products        | 15 min   | Balance freshness vs performance |
| Stores          | 30 min   | Changes infrequently             |
| Categories      | 1 hour   | Rarely changes                   |
| Search Results  | 5 min    | Needs to be fresh                |
| Dashboard Stats | 10 min   | Acceptable staleness             |
| Sessions        | 24 hours | Security requirement             |
| Rate Limits     | 60 sec   | Sliding window                   |

### 2. Event-Based Invalidation (RabbitMQ)

When data changes, publish events to invalidate related caches:

```typescript
// Product Service publishes event
eventBus.publish('product.updated', { productId: 'prod_123' });

// Cache invalidation handler (in each service)
eventBus.subscribe('product.updated', async (event) => {
  await redis.del(`product:${event.productId}`);
  await redis.del('products:list:*'); // Invalidate all product lists
  await redis.del('search:*'); // Invalidate all search results
});
```

**Event → Cache Invalidation Mapping:**

| Event              | Invalidate Keys                                                                |
| ------------------ | ------------------------------------------------------------------------------ |
| `product.created`  | `products:list:*`, `search:*`, `store:product_count:{storeId}`                 |
| `product.updated`  | `product:{id}`, `products:list:*`, `search:*`                                  |
| `product.deleted`  | `product:{id}`, `products:list:*`, `search:*`, `store:product_count:{storeId}` |
| `store.created`    | `stores:list:*`                                                                |
| `store.updated`    | `store:{id}`, `stores:list:*`                                                  |
| `store.deleted`    | `store:{id}`, `stores:list:*`, `products:list:*`                               |
| `vendor.deleted`   | `vendor:{id}`, `stores:list:*`, `products:list:*`                              |
| `category.created` | `categories:tree`                                                              |
| `category.updated` | `categories:tree`                                                              |
| `category.deleted` | `categories:tree`, `products:list:*`                                           |
| `user.updated`     | `user:{id}`, `session:{userId}`                                                |

### 3. Write-Through Pattern

For critical data, use write-through caching:

```typescript
// Update database first
await productRepository.update(productId, data);

// Then update cache
await redis.set(`product:${productId}`, JSON.stringify(updatedProduct), 'EX', 900);

// Publish event for other services
await eventBus.publish('product.updated', { productId });
```

### 4. Cache-Aside Pattern

For read-heavy operations, use cache-aside:

```typescript
async function getProduct(productId: string) {
  // Try cache first
  const cached = await redis.get(`product:${productId}`);
  if (cached) {
    return JSON.parse(cached);
  }

  // Cache miss - fetch from database
  const product = await productRepository.findById(productId);

  // Store in cache
  await redis.set(`product:${productId}`, JSON.stringify(product), 'EX', 900);

  return product;
}
```

---

## Redis Configuration

### Development Environment (Docker Compose)

```yaml
# docker-compose.yml
services:
  redis:
    image: redis:7-alpine
    container_name: ecommerce-redis
    ports:
      - '6379:6379'
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 3s
      retries: 3

volumes:
  redis-data:
```

### Production Environment (Railway/Cloud)

**Option 1: Railway Redis Plugin**

- Automatic provisioning
- Managed backups
- High availability
- Cost: ~$5-15/month

**Option 2: Upstash Redis**

- Serverless Redis
- Pay-per-request pricing
- Global replication
- Cost: ~$0-30/month (based on usage)

**Option 3: Redis Cloud**

- Fully managed
- High availability with replication
- Advanced features (Redis Stack)
- Cost: Free tier available, then ~$10-50/month

### Redis Connection Configuration

```typescript
// libs/shared/config/src/lib/redis.config.ts
import { RedisOptions } from 'ioredis';

export const redisConfig: RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: 0,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  enableOfflineQueue: true,
  lazyConnect: false,
};

// Connection pool settings
export const redisPoolConfig = {
  min: 2,
  max: 10,
};
```

---

## Implementation Guide

### Step 1: Install Redis Client

```bash
# Install ioredis (recommended Redis client for Node.js)
npm install ioredis
npm install -D @types/ioredis
```

### Step 2: Create Redis Module (NestJS)

```typescript
// libs/shared/redis/src/lib/redis.module.ts
import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
```

### Step 3: Create Redis Service

```typescript
// libs/shared/redis/src/lib/redis.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { redisConfig } from '@org/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  async onModuleInit() {
    this.client = new Redis(redisConfig);

    this.client.on('connect', () => {
      console.log('Redis connected');
    });

    this.client.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  // Cache operations
  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.setex(key, ttl, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async delPattern(pattern: string): Promise<void> {
    const keys = await this.client.keys(pattern);
    if (keys.length > 0) {
      await this.client.del(...keys);
    }
  }

  // JSON operations
  async getJSON<T>(key: string): Promise<T | null> {
    const data = await this.get(key);
    return data ? JSON.parse(data) : null;
  }

  async setJSON<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.set(key, JSON.stringify(value), ttl);
  }

  // Counter operations
  async incr(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async decr(key: string): Promise<number> {
    return this.client.decr(key);
  }

  // TTL operations
  async expire(key: string, seconds: number): Promise<void> {
    await this.client.expire(key, seconds);
  }

  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  // List operations
  async lpush(key: string, ...values: string[]): Promise<number> {
    return this.client.lpush(key, ...values);
  }

  async rpush(key: string, ...values: string[]): Promise<number> {
    return this.client.rpush(key, ...values);
  }

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    return this.client.lrange(key, start, stop);
  }

  // Set operations
  async sadd(key: string, ...members: string[]): Promise<number> {
    return this.client.sadd(key, ...members);
  }

  async smembers(key: string): Promise<string[]> {
    return this.client.smembers(key);
  }

  // Sorted set operations
  async zadd(key: string, score: number, member: string): Promise<number> {
    return this.client.zadd(key, score, member);
  }

  async zrange(key: string, start: number, stop: number): Promise<string[]> {
    return this.client.zrange(key, start, stop);
  }

  async zrevrange(key: string, start: number, stop: number): Promise<string[]> {
    return this.client.zrevrange(key, start, stop);
  }

  // Health check
  async ping(): Promise<string> {
    return this.client.ping();
  }
}
```

### Step 4: Create Cache Decorator

```typescript
// libs/shared/redis/src/lib/cache.decorator.ts
import { RedisService } from './redis.service';

export function Cacheable(ttl: number = 900) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const redis: RedisService = this.redisService;
      const cacheKey = `${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`;

      // Try cache first
      const cached = await redis.getJSON(cacheKey);
      if (cached) {
        return cached;
      }

      // Cache miss - execute method
      const result = await originalMethod.apply(this, args);

      // Store in cache
      await redis.setJSON(cacheKey, result, ttl);

      return result;
    };

    return descriptor;
  };
}
```

### Step 5: Implement Rate Limiting Middleware

```typescript
// apps/backend/api-gateway/src/middleware/rate-limit.middleware.ts
import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from '@org/redis';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(private readonly redis: RedisService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;
    const endpoint = req.path;
    const key = `rate_limit:${ip}:${endpoint}`;

    const limit = this.getLimit(endpoint);
    const current = await this.redis.incr(key);

    if (current === 1) {
      await this.redis.expire(key, 60); // 60 second window
    }

    if (current > limit) {
      throw new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS);
    }

    res.setHeader('X-RateLimit-Limit', limit.toString());
    res.setHeader('X-RateLimit-Remaining', (limit - current).toString());

    next();
  }

  private getLimit(endpoint: string): number {
    if (endpoint.includes('/auth/login')) return 5;
    if (endpoint.includes('/auth/register')) return 3;
    if (endpoint.includes('/search')) return 50;
    return 100;
  }
}
```

---

## Monitoring and Maintenance

### Key Metrics to Monitor

1. **Cache Hit Rate**: Target > 80%
2. **Memory Usage**: Keep below 80% of allocated memory
3. **Connection Count**: Monitor active connections
4. **Command Latency**: Target < 5ms for most operations
5. **Eviction Rate**: Should be low (< 5% of operations)

### Redis CLI Commands for Monitoring

```bash
# Check Redis info
redis-cli INFO

# Monitor real-time commands
redis-cli MONITOR

# Check memory usage
redis-cli INFO memory

# Check cache hit rate
redis-cli INFO stats

# List all keys (use with caution in production)
redis-cli KEYS *

# Check specific key TTL
redis-cli TTL product:prod_123

# Get key type
redis-cli TYPE product:prod_123
```

### Health Check Endpoint

```typescript
// apps/backend/api-gateway/src/health/health.controller.ts
@Get('/health/redis')
async checkRedis() {
  try {
    const pong = await this.redis.ping();
    return {
      status: 'healthy',
      redis: pong === 'PONG' ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      redis: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}
```

---

## Best Practices

### 1. Key Naming Convention

Use consistent, hierarchical key naming:

```
{service}:{entity}:{identifier}:{attribute}

Examples:
product:prod_123
products:list:active
search:products:laptop
session:user_123
rate_limit:192.168.1.1:/api/products
```

### 2. Always Set TTL

Never store data without TTL (except for specific use cases like counters):

```typescript
// Good
await redis.set('product:123', data, 900);

// Bad (no TTL)
await redis.set('product:123', data);
```

### 3. Handle Cache Failures Gracefully

```typescript
async function getProduct(id: string) {
  try {
    const cached = await redis.get(`product:${id}`);
    if (cached) return JSON.parse(cached);
  } catch (error) {
    console.error('Redis error:', error);
    // Continue to database
  }

  // Fallback to database
  return await database.findProduct(id);
}
```

### 4. Use Pipelining for Bulk Operations

```typescript
// Good - use pipeline
const pipeline = redis.pipeline();
for (const product of products) {
  pipeline.set(`product:${product.id}`, JSON.stringify(product), 'EX', 900);
}
await pipeline.exec();

// Bad - individual operations
for (const product of products) {
  await redis.set(`product:${product.id}`, JSON.stringify(product), 'EX', 900);
}
```

### 5. Implement Circuit Breaker

```typescript
class RedisCircuitBreaker {
  private failures = 0;
  private lastFailure: Date | null = null;
  private readonly threshold = 5;
  private readonly timeout = 60000; // 1 minute

  async execute<T>(operation: () => Promise<T>): Promise<T | null> {
    if (this.isOpen()) {
      console.warn('Circuit breaker is open, skipping Redis operation');
      return null;
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private isOpen(): boolean {
    if (this.failures >= this.threshold) {
      if (this.lastFailure && Date.now() - this.lastFailure.getTime() > this.timeout) {
        this.reset();
        return false;
      }
      return true;
    }
    return false;
  }

  private onSuccess() {
    this.failures = 0;
    this.lastFailure = null;
  }

  private onFailure() {
    this.failures++;
    this.lastFailure = new Date();
  }

  private reset() {
    this.failures = 0;
    this.lastFailure = null;
  }
}
```

---

## Performance Optimization

### 1. Cache Warming

Pre-populate cache with frequently accessed data:

```typescript
async function warmCache() {
  // Warm popular products
  const popularProducts = await database.getPopularProducts(100);
  for (const product of popularProducts) {
    await redis.setJSON(`product:${product.id}`, product, 900);
  }

  // Warm category tree
  const categories = await database.getCategoryTree();
  await redis.setJSON('categories:tree', categories, 3600);

  // Warm active stores
  const stores = await database.getActiveStores();
  await redis.setJSON('stores:list:active', stores, 1800);
}
```

### 2. Lazy Loading

Load cache on first access:

```typescript
async function getCategories() {
  let categories = await redis.getJSON('categories:tree');

  if (!categories) {
    categories = await database.getCategoryTree();
    await redis.setJSON('categories:tree', categories, 3600);
  }

  return categories;
}
```

### 3.
