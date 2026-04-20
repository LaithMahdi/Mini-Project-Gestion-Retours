# RetourPro v0.2.0 Release Notes

**Release Date:** April 20, 2026

## Overview

This release focuses on **user experience improvements** and **critical bug fixes** to ensure stable production deployment. All management pages now properly support dynamic search parameters without build errors.

## What's New

### 🎨 Dark & Light Theme Support

Users can now toggle between dark and light themes on the landing page for optimal viewing comfort. All components adapt seamlessly to the selected theme:

- Navigation bars
- Feature cards
- Entity cards
- Statistics sections
- CTA sections
- Footer

**Location:** Theme switcher button in top-right corner of landing page

### 🔧 Search Parameters Boundary Handler

Implemented a reusable `SearchParamsBoundary` component that properly handles Next.js search parameters with Suspense support. This fixes the production build errors that occurred when using `useSearchParams()` or `useQueryState()`.

**Affected Pages:**

- `/manager/history` - Return history tracking
- `/manager/returns` - Return management
- `/manager/non-conformite` - Non-conformity management
- `/manager/users` - User management

### ✨ Enhanced Loading States

Professional skeleton loaders now display while pages hydrate with search parameters, providing better visual feedback to users.

## Fixed Issues

### Critical Fixes

- ✅ **Build Error**: Fixed `useSearchParams() should be wrapped in a suspense boundary` error
- ✅ **API Endpoint**: Corrected API base URL to match backend service (`http://localhost:8080/api/v1`)
- ✅ **Page Prerendering**: All management pages now properly prerender as static content

## Installation & Deployment

### Prerequisites

- Node.js 18+ (Frontend)
- Java 17+ (Backend)
- MySQL 8.0+

### Using Docker Compose

```bash
# Build and start services
docker-compose up -d

# Services will be available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
# PhpMyAdmin: http://localhost:8088
```

### Environment Variables

Ensure `.env` file contains:

```
NEXT_PUBLIC_BASE_URL_API=http://localhost:8080/api/v1
NODE_ENV=production
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=gestion_retour
```

## Version Information

- **Frontend:** 0.2.0
- **Backend:** 0.2.0
- **Next.js:** 16.1.7
- **Spring Boot:** 4.0.3
- **MySQL:** 8.0+

## Known Limitations

- Dynamic routes with `[id]` parameters remain server-rendered (expected behavior)
- Theme selection persists in localStorage (browser-specific)

## Performance Metrics

- Production build time: ~5s
- TypeScript compilation: ~5.4s
- Page data collection: ~950ms
- Static generation: ~1.07s

## Migration Notes

No breaking changes from v0.1.0. Existing deployments can upgrade without data migration.

## Support & Issues

For bug reports or feature requests, please contact the development team.

---

**Happy Returns! 🎉**
