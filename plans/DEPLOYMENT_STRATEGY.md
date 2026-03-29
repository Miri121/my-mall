# Deployment Strategy - Separate Subdomains

## ✅ Selected Deployment Approach: Option A - Separate Subdomains

---

## 🌐 Domain Structure

### Production Domains

```
mall.yourplatform.com      → Mall App (Customer Interface)
vendor.yourplatform.com    → Vendor App (Vendor Dashboard)
admin.yourplatform.com     → Admin App (Admin Panel)
api.yourplatform.com       → Backend API
```

### Staging Domains (Optional)

```
mall.staging.yourplatform.com      → Mall App (Staging)
vendor.staging.yourplatform.com    → Vendor App (Staging)
admin.staging.yourplatform.com     → Admin App (Staging)
api.staging.yourplatform.com       → Backend API (Staging)
```

---

## 📋 DNS Configuration

### Required DNS Records

```dns
# A Records (or CNAME if using hosting platform)
mall.yourplatform.com       → Points to Vercel/hosting IP
vendor.yourplatform.com     → Points to Vercel/hosting IP
admin.yourplatform.com      → Points to Vercel/hosting IP
api.yourplatform.com        → Points to Railway/backend hosting IP

# Optional: Wildcard SSL
*.yourplatform.com          → For easier subdomain management
```

---

## 🔒 SSL/TLS Certificates

### Option 1: Wildcard Certificate (Recommended)

- Single certificate: `*.yourplatform.com`
- Covers all subdomains
- Easier to manage
- Most hosting platforms provide this automatically

### Option 2: Individual Certificates

- Separate certificate for each subdomain
- More granular control
- Slightly more complex management

**Recommendation:** Use wildcard certificate provided by hosting platform (Vercel, Railway, etc.)

---

## 🚀 Hosting Configuration

### Frontend Apps (Vercel - Recommended)

#### Mall App

```yaml
Project: mall-app
Domain: mall.yourplatform.com
Build Command: npx nx build mall --prod
Output Directory: dist/apps/mall
Environment Variables:
  - VITE_API_URL=https://api.yourplatform.com
  - VITE_APP_ENV=production
```

#### Vendor App

```yaml
Project: vendor-app
Domain: vendor.yourplatform.com
Build Command: npx nx build vendor --prod
Output Directory: dist/apps/vendor
Environment Variables:
  - VITE_API_URL=https://api.yourplatform.com
  - VITE_APP_ENV=production
```

#### Admin App

```yaml
Project: admin-app
Domain: admin.yourplatform.com
Build Command: npx nx build admin --prod
Output Directory: dist/apps/admin
Environment Variables:
  - VITE_API_URL=https://api.yourplatform.com
  - VITE_APP_ENV=production
```

### Backend API (Railway - Recommended)

```yaml
Project: api-server
Domain: api.yourplatform.com
Start Command: node dist/apps/api/main.js
Environment Variables:
  - DATABASE_URL=postgresql://...
  - JWT_SECRET=...
  - JWT_REFRESH_SECRET=...
  - GOOGLE_CLIENT_ID=...
  - GOOGLE_CLIENT_SECRET=...
  - ALLOWED_ORIGINS=https://mall.yourplatform.com,https://vendor.yourplatform.com,https://admin.yourplatform.com
  - NODE_ENV=production
```

---

## 🔐 CORS Configuration

### Backend API CORS Settings

```typescript
// apps/api/src/main.ts
const allowedOrigins = [
  'https://mall.yourplatform.com',
  'https://vendor.yourplatform.com',
  'https://admin.yourplatform.com',
  // Staging
  'https://mall.staging.yourplatform.com',
  'https://vendor.staging.yourplatform.com',
  'https://admin.staging.yourplatform.com',
  // Local development
  'http://localhost:4200',
  'http://localhost:4201',
  'http://localhost:4202',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
```

---

## 🔄 CI/CD Pipeline Configuration

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy-production.yml
name: Deploy to Production

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy-mall:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx nx build mall --prod
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_MALL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./

  deploy-vendor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx nx build vendor --prod
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_VENDOR_PROJECT_ID }}
          vercel-args: '--prod'

  deploy-admin:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx nx build admin --prod
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_ADMIN_PROJECT_ID }}
          vercel-args: '--prod'

  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx nx build api --prod
      # Deploy to Railway
      - uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: api-server
```

---

## 🌍 Environment Variables by App

### Mall App (Customer)

```env
VITE_API_URL=https://api.yourplatform.com
VITE_APP_NAME=Mall
VITE_APP_ENV=production
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=your-sentry-dsn
```

### Vendor App

```env
VITE_API_URL=https://api.yourplatform.com
VITE_APP_NAME=Vendor
VITE_APP_ENV=production
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_SENTRY_DSN=your-sentry-dsn
```

### Admin App

```env
VITE_API_URL=https://api.yourplatform.com
VITE_APP_NAME=Admin
VITE_APP_ENV=production
VITE_SENTRY_DSN=your-sentry-dsn
```

### API Server

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
REDIS_HOST=your-redis-host.railway.app
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
REDIS_TLS=true
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ALLOWED_ORIGINS=https://mall.yourplatform.com,https://vendor.yourplatform.com,https://admin.yourplatform.com
AWS_S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
SENTRY_DSN=your-sentry-dsn
NODE_ENV=production
PORT=3000
```

**Redis Configuration Options:**

**Option 1: Railway Redis Plugin (Recommended)**

- Automatic provisioning with Railway
- Environment variables auto-injected
- Cost: ~$5-15/month
- Setup: Add Redis plugin in Railway dashboard

**Option 2: Upstash Redis (Serverless)**

- Serverless, pay-per-request
- Global replication available
- Cost: Free tier available, then ~$0-30/month
- Setup: Create database at upstash.com, copy connection URL

**Option 3: Redis Cloud**

- Fully managed Redis
- High availability with replication
- Cost: Free tier (30MB), then ~$10-50/month
- Setup: Create database at redis.com, copy connection details

---

## 📊 Monitoring & Analytics

### Subdomain-Specific Tracking

```typescript
// libs/shared/config/src/lib/analytics.config.ts
export const analyticsConfig = {
  mall: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    trackingEnabled: true,
  },
  vendor: {
    googleAnalyticsId: 'G-YYYYYYYYYY',
    trackingEnabled: false, // Optional: Don't track vendor actions
  },
  admin: {
    googleAnalyticsId: 'G-ZZZZZZZZZZ',
    trackingEnabled: false, // Optional: Don't track admin actions
  },
};
```

---

## 🔍 Health Checks

### API Health Check Endpoint

```typescript
// apps/api/src/routes/health.routes.ts
app.get('/health', async (req, res) => {
  const redisStatus = await checkRedisHealth();
  const dbStatus = await checkDatabaseHealth();

  res.json({
    status: redisStatus && dbStatus ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    services: {
      redis: redisStatus ? 'connected' : 'disconnected',
      database: dbStatus ? 'connected' : 'disconnected',
    },
  });
});

app.get('/health/redis', async (req, res) => {
  try {
    const pong = await redis.ping();
    const info = await redis.info('stats');
    res.json({
      status: 'healthy',
      redis: pong === 'PONG' ? 'connected' : 'disconnected',
      stats: parseRedisInfo(info),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      redis: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});
```

### Frontend Health Checks

Each app should have a health check route:

- `https://mall.yourplatform.com/health`
- `https://vendor.yourplatform.com/health`
- `https://admin.yourplatform.com/health`

---

## 🚨 Rollback Strategy

### Quick Rollback Steps

1. **Vercel (Frontend Apps)**

   - Go to Vercel dashboard
   - Select the project
   - Navigate to "Deployments"
   - Click on previous successful deployment
   - Click "Promote to Production"

2. **Railway (Backend API)**

   - Go to Railway dashboard
   - Select the service
   - Navigate to "Deployments"
   - Click on previous deployment
   - Click "Redeploy"

3. **Via GitHub**
   - Revert the commit/tag
   - Push to trigger new deployment

---

## 📝 Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] DNS records set up
- [ ] SSL certificates configured
- [ ] Database migrations ready
- [ ] Backup database
- [ ] **Redis instance provisioned and configured**
- [ ] **Redis connection tested**
- [ ] CORS settings verified

### Deployment

- [ ] **Deploy Redis first (if not using managed service)**
- [ ] Deploy API first
- [ ] Run database migrations
- [ ] **Verify Redis connectivity from API**
- [ ] **Warm Redis cache with initial data (optional)**
- [ ] Deploy Mall app
- [ ] Deploy Vendor app
- [ ] Deploy Admin app
- [ ] Verify all health checks
- [ ] **Verify Redis cache is working (check hit rates)**

### Post-Deployment

- [ ] Test login on all apps
- [ ] Test CRUD operations
- [ ] Verify CORS working
- [ ] **Monitor Redis metrics:**
  - [ ] Check cache hit rate (target > 80%)
  - [ ] Monitor memory usage
  - [ ] Verify TTL expiration working
  - [ ] Check connection count
- [ ] **Test Redis-dependent features:**
  - [ ] Rate limiting working correctly
  - [ ] Session management functional
  - [ ] Cached responses returning quickly
- [ ] Check error tracking (Sentry)
- [ ] Monitor performance
- [ ] Check analytics tracking
- [ ] Verify email notifications

---

## 🎯 Benefits of Subdomain Approach

✅ **Clear Separation** - Each app has its own URL
✅ **Better Security** - Isolated cookie domains
✅ **Independent Deployment** - Deploy apps separately
✅ **Easier Scaling** - Scale apps independently
✅ **Better Analytics** - Track each app separately
✅ **Professional** - Looks more professional
✅ **SEO Friendly** - Better for search engines (Mall app)

---

## 📞 Support Contacts

- **DNS Provider:** [Your DNS provider]
- **Hosting (Frontend):** Vercel Support
- **Hosting (Backend):** Railway Support
- **SSL Certificates:** Automatic via hosting platforms
- **Domain Registrar:** [Your domain registrar]

---

## 🔗 Quick Links

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Nx Deployment Guide](https://nx.dev/recipes/deployment)
- [DNS Configuration Guide](https://www.cloudflare.com/learning/dns/dns-records/)

---

**Status:** ✅ Deployment strategy confirmed and documented
**Next Step:** Proceed with Phase 1 implementation
