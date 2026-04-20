# Changelog

All notable changes to RetourPro will be documented in this file.

## [0.2.0] - 2026-04-20

### Added

- **Dark/Light Theme Support**: All landing page components now fully support both light and dark themes with `LandingThemeSwitcher` component
- **SearchParamsBoundary Component**: Custom Suspense boundary wrapper for handling search params in Next.js pages with professional skeleton loaders
- **Theme-Aware Styling**:
  - Landing navbar with theme-aware colors
  - Feature cards with light/dark variants
  - Entity cards with adaptive styling
  - CTA section with theme support
  - Statistics cards with themed backgrounds
  - Footer with light/dark variants

### Fixed

- **useSearchParams() Suspense Error**: Resolved Next.js build errors by wrapping search params hooks in Suspense boundaries
- **API Base URL**: Corrected API endpoint from `http://localhost:3000/api` to `http://localhost:8080/api/v1`
- **Search Params Pages**: Applied SearchParamsBoundary pattern to:
  - History page (`/manager/history`)
  - Returns page (`/manager/returns`)
  - Non-Conformity page (`/manager/non-conformite`)
  - Users page (`/manager/users`)

### Technical Improvements

- Extracted search params logic into separate components for proper React Server Component handling
- Implemented consistent loading states across data-fetching pages
- Added professional skeleton loaders for better UX
- Ensured TypeScript strict mode compliance

### Pages Updated

- ✅ All management pages now prerender correctly with `○` static status
- ✅ Dynamic routes with parameters remain as `ƒ` (server-rendered on demand)

## [0.1.0] - 2026-04-19

### Initial Release

- Complete CRUD workflow for returns
- Non-conformity management system
- User management with role-based access control
- Audit history tracking
- Filter and pagination support
- Role-based security implementation
- Dark theme as default landing page
