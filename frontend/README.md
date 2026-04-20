# Gestion Retours Frontend

Modern return management system frontend built with Next.js 16, featuring complete CRUD operations, real-time tracking, quality control, user management, and complete audit trail for product returns and non-conformities.

## 📋 Overview

**RetourPro** is a comprehensive product return and non-conformity management platform designed for logistics and quality control teams. The system provides real-time tracking, user management, validation workflows, and complete audit capabilities.

### Key Applications

- **Product Returns Management**: Track, process, and manage customer product returns
- **Non-Conformity Tracking**: Document and manage product quality issues
- **User Management**: Role-based access control with employee management
- **Return History**: Audit trail with complete change tracking
- **Quality Validation**: Multi-step validation workflow for returns

---

## 🎯 Features

### Returns Module (`/manager/returns`)

- ✅ **Full CRUD Operations**: Create, read, update, delete returns
- 🔍 **Advanced Search**: Filter by client name and product
- 📅 **Monthly Filtering**: View returns filtered by month
- 🎯 **Status Filtering**: Filter by processing status (Reçu, En cours, Validé, etc.)
- 📄 **Advanced Pagination**: Multi-option pagination with customizable page size
- 📊 **Data Export**: View detailed return information with history

### Non-Conformities Module (`/manager/non-conformite`)

- ✅ **Non-Conformity CRUD**: Full management of quality issues
- 🔍 **Smart Filtering**: Search and filter capabilities
- 📋 **List Management**: View all non-conformities with pagination
- 🗑️ **Bulk Operations**: Delete non-conformities (coming soon)

### Return History Module (`/manager/history`)

- 📜 **Action Logging**: Complete audit trail of all actions
- 👤 **Employee Tracking**: See which employee performed each action
- 🕐 **Timestamps**: Precise date and time for all actions
- 📋 **Action Types**: Track different types of actions (Défaut, Qualité, etc.)

### User Management Module (`/manager/users`)

- 👥 **User CRUD**: Create, read, update, delete users
- 👤 **Role Assignment**: Assign roles (MANAGER, AGENT, VALIDATOR)
- 🔑 **Permission Management**: Role-based access control
- ⚙️ **User Status**: Enable/disable users
- 🔍 **User Search**: Filter users by name or email

### Additional Features

- 🌙 **Dark/Light Theme**: Full theme support with next-themes
- 🚀 **Real-time Updates**: TanStack Query for data synchronization
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- ♿ **Accessibility**: Built with Radix UI components
- 🔐 **Session Management**: Zustand for state management
- 🎨 **Modern UI**: shadcn/ui components with custom styling

---

## 🏗️ Project Structure

```
gestion-retours-frontend/
├── public/                          # Static files
├── components/
│   ├── shared/                      # Reusable components
│   │   ├── custom_form_field.tsx   # Form field wrapper
│   │   ├── page-header.tsx         # Page headers
│   │   ├── GridPagination.tsx      # Pagination component
│   │   └── description-tooltip.tsx # Tooltips
│   └── ui/                          # UI primitives (shadcn/ui)
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── select.tsx
│       ├── table.tsx
│       ├── form.tsx
│       └── ... (30+ components)
│
├── src/
│   ├── app/
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Landing page
│   │   ├── (auth)/
│   │   │   └── login/              # Login page
│   │   └── (management)/
│   │       └── manager/
│   │           ├── page.tsx        # Dashboard
│   │           ├── layout.tsx      # Manager layout
│   │           ├── _components/    # Shared manager components
│   │           │   ├── Navbar.tsx
│   │           │   ├── Sidebar.tsx
│   │           │   ├── Navigation.tsx
│   │           │   └── ...
│   │           ├── returns/        # Returns module
│   │           ├── non-conformite/ # Non-conformities module
│   │           ├── history/        # History module
│   │           └── users/          # Users module
│   │
│   ├── config/
│   │   └── index.ts               # API endpoints, cache keys
│   │
│   ├── constants/
│   │   └── index.ts               # Constants (app name, items per page)
│   │
│   ├── hooks/
│   │   └── use-id.ts             # Custom hooks
│   │
│   ├── lib/
│   │   ├── api-client.ts         # Axios instance
│   │   └── utils.ts              # Utility functions
│   │
│   ├── providers/
│   │   ├── TanStackQueryProvider.tsx
│   │   └── ThemeProvider.tsx
│   │
│   └── stores/
│       └── use_session_store.ts  # Zustand session store
│
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
├── package.json
└── README.md
```

---

## 📦 Tech Stack

| Layer                   | Technologies                     |
| ----------------------- | -------------------------------- |
| **Framework**           | Next.js 16 (App Router)          |
| **UI Library**          | React 19 + TypeScript            |
| **Styling**             | Tailwind CSS 4                   |
| **Components**          | shadcn/ui + Radix UI             |
| **State Management**    | Zustand, TanStack React Query    |
| **Form Handling**       | React Hook Form + Zod validation |
| **HTTP Client**         | Axios                            |
| **Date Handling**       | date-fns                         |
| **Icons**               | HugeIcons                        |
| **Toast Notifications** | Sonner                           |
| **Tables**              | TanStack Table (React Table)     |
| **Theme**               | next-themes                      |
| **Routing**             | nuqs (URL state)                 |

---

## 🗂️ Routes Overview

### Public Routes

- `/` - Landing page with features and call-to-action
- `/login` - User authentication

### Protected Routes (Manager)

- `/manager` - Dashboard
- `/manager/returns` - Returns management
  - `/manager/returns/create` - Create new return
  - `/manager/returns/[id]` - View return details
  - `/manager/returns/[id]/edit` - Edit return
- `/manager/users` - User management
- `/manager/history` - Return action history
- `/manager/non-conformite` - Non-conformity management

---

## 📋 Modules Details

### Returns Module

**File**: `src/app/(management)/manager/returns/`

**Components**:

- `DataTableReturns.tsx` - Main data table with sorting and filtering
- `ReturnsFilter.tsx` - Filter component (status, search)
- `ReturnsMonth.tsx` - Month filter component
- `MoreButton.tsx` - Action menu (view, edit, delete)
- `DeleteButton.tsx` - Delete confirmation dialog

**Features**:

- Server-side pagination
- Monthly filtering
- Search by client or product
- Status filtering with color codes
- Inline actions (view, edit, delete)

### Non-Conformities Module

**File**: `src/app/(management)/manager/non-conformite/`

**Components**:

- `DataTableNonConformites.tsx` - Data table
- `NonConFormiteFilter.tsx` - Filter UI
- `NonConformityDialog.tsx` - Create/Edit dialog
- `DeleteButton.tsx` - Delete action

### History Module

**File**: `src/app/(management)/manager/history/`

**Components**:

- `DataTableHistory.tsx` - History timeline view
- `HistoryDialog.tsx` - Create history entry
- `TableColumns.tsx` - Column definitions

**Features**:

- Track all actions on returns
- Employee accountability
- Action type categorization
- Complete audit trail

### Users Module

**File**: `src/app/(management)/manager/users/`

**Components**:

- `DataTableUsers.tsx` - User listing
- `UserDialog.tsx` - Create/Edit user
- `TableColumns.tsx` - User table columns
- `UserSwither.tsx` - User status toggle

**Features**:

- Role-based access control
- User creation and management
- Active/Inactive status
- Permission management

---

## 🎨 Shared Components

### Form Components

- `CustomFormField.tsx` - Unified form field component supporting:
  - Text inputs
  - Textareas
  - Checkboxes
  - Date pickers
  - Select dropdowns
  - Password fields

### Pagination Components

- `GridPagination.tsx` - Advanced pagination with info display
- `AdvancedPagination.tsx` - Customizable page size and navigation
- `NextPreviousButtons.tsx` - Simple prev/next navigation

### UI Components (shadcn/ui)

- Button, Dialog, Select, Table, Tabs
- Badge, Alert, Card, Popover
- Dropdown Menu, Context Menu
- Form primitives, Input, Textarea
- And 20+ more components

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (Recommended: 20+)
- npm or bun package manager
- Backend API running (Java Spring Boot)

### Installation

```bash
# Clone the repository
git clone https://github.com/LaithMahdi/gestion-retours-frontend.git
cd gestion-retours-frontend

# Install dependencies
bun install
# or
npm install

# Create .env.local file (if needed)
# Typically configured via environment variables
```

### Development

```bash
# Start development server
bun dev
# or
npm run dev

# Opens at: http://localhost:3000
```

### Build & Deployment

```bash
# Create production build
bun run build
# or
npm run build

# Start production server
bun start
# or
npm start
```

### Linting

```bash
npm run lint
# or
bun lint
```

---

## 🔌 API Integration

### Base Configuration

**File**: `src/config/index.ts`

Contains all API endpoints and cache keys:

```typescript
// Endpoints
RETURNS_ENDPOINT: "/api/returns";
RETURNS_KEY: "returns";
USERS_ENDPOINT: "/api/users";
USERS_KEY: "users";
HISTORY_ENDPOINT: "/api/history";
HISTORY_KEY: "history";
NON_CONFORMITE_ENDPOINT: "/api/non-conformites";
NON_CONFORMITE_KEY: "non-conformites";
```

### API Client

**File**: `src/lib/api-client.ts`

Axios instance with:

- Base URL configuration
- Authentication token injection
- Error handling
- Request/response interceptors

### Data Fetching Pattern

Uses TanStack Query for:

- Server-side caching
- Automatic refetching
- Background synchronization
- Error handling and retry logic

**Example**:

```typescript
const { data, isFetching } = useQuery({
  queryKey: [RETURNS_KEY, page],
  queryFn: () => apiClient.get(RETURNS_ENDPOINT, { params: { page } }),
});
```

---

## 🔐 State Management

### Session Store (Zustand)

**File**: `src/stores/use_session_store.ts`

Manages:

- Current user information
- Session tokens/authentication
- Global modal states
- User preferences

**Usage**:

```typescript
const { currentUser, setCurrentUser } = useSessionStore();
```

### Data Caching (TanStack Query)

- Automatically caches API responses
- Invalidates cache on mutations
- Background refetching for fresh data
- Smart retry logic on failures

---

## 📝 Forms & Validation

### Validation Schemas

All forms use **Zod** for schema definition and validation:

**Returns Form** (`src/app/(management)/manager/returns/_components/schema/`):

- Validates return status, product, client
- Date validation and formatting
- Client/product name requirements

**History Form** (`src/app/(management)/manager/history/_components/schema/`):

- Employee ID validation
- Return ID validation
- Action type validation
- Date/time validation

**Non-Conformity Form**:

- Title and description validation
- Severity level validation
- Category validation

### Form Field Component

`CustomFormField.tsx` provides:

- Unified form field rendering
- Support for multiple input types
- Error message display
- Loading states
- Accessibility features

---

## 🎨 Styling & Theme

### Tailwind CSS 4

- Utility-first CSS framework
- Dark mode support with `next-themes`
- Custom color schemes
- Responsive design utilities

### Color Scheme

- **Primary**: Blue (blue-500 to blue-700)
- **Secondary**: Slate (slate-700 to slate-900)
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red
- **Info**: Sky blue

### Dark Mode

Implemented with `next-themes`:

- System preference detection
- Manual toggle with `ThemeProvider`
- Persistent user preference
- Seamless switching

---

## 📊 Data Types & Interfaces

### Return Entity

```typescript
type Item = {
  id: number;
  client: string;
  produit: string;
  etatTraitement: string;
  dateRetour: string;
  // ... other fields
};
```

### User Entity

```typescript
type UserItem = {
  id: string;
  nom: string;
  email: string;
  role: "MANAGER" | "AGENT" | "VALIDATOR";
};
```

### History Entry

```typescript
type HistoryItem = {
  id: number;
  retourId: number;
  action: string;
  employeId: string;
  date: string;
};
```

### Non-Conformity

```typescript
type NonConformityItem = {
  id: number;
  titre: string;
  description: string;
  severite: string;
  date: string;
};
```

---

## 🔄 Common Workflows

### Creating a Return

1. Navigate to `/manager/returns/create`
2. Fill form with product, client, reason details
3. Submit form
4. API validates and creates return
5. User redirected to details page
6. Cache invalidated, list refreshes

### Filtering Returns

1. Use search bar to filter by client or product
2. Use status dropdown to filter by state
3. Use month selector for date range
4. Filters persist in URL via `nuqs`
5. Data refetches with new parameters

### Managing History

1. Navigate to `/manager/history`
2. View all actions on returns
3. Filter by employee or date
4. Create new history entry with dialog
5. Audit trail updated automatically

---

## 🧪 Testing & Quality

### ESLint Configuration

- File: `eslint.config.mjs`
- Next.js recommended rules
- TypeScript support
- Automatic fixing available

```bash
npm run lint
```

### TypeScript

- Strict mode enabled
- Full type coverage
- Automatic type inference
- Path aliases configured (`@/` imports)

---

## 📱 Responsive Design

The application is fully responsive:

- **Mobile**: Touch-friendly, full-width layouts
- **Tablet**: Optimized navigation, stacked components
- **Desktop**: Full feature set, sidebar navigation

### Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 🚀 Performance Optimizations

### Code Splitting

- Automatic with Next.js App Router
- Component-level code splitting
- Dynamic imports for heavy components

### Caching Strategies

- Server-side page caching (Next.js)
- Client-side data caching (TanStack Query)
- HTTP caching headers
- Browser caching

### Image Optimization

- Next.js Image component for optimization
- Lazy loading
- Responsive image sizes

### Bundle Analysis

```bash
ANALYZE=true npm run build
```

---

## 🐛 Common Issues & Solutions

### Select Component Not Updating

**Issue**: SelectItem value doesn't match form value
**Solution**: Ensure value is converted to string with `String(value)`

**File**: `components/shared/custom_form_field.tsx`

```typescript
value={String(field.value || "")}
```

### Date Format Errors

**Issue**: Backend expects `yyyy-MM-dd'T'HH:mm:ss` format
**Solution**: Format date before sending

```typescript
const formattedDate = dateObj.toISOString().split("T")[0] + "T00:00:00";
```

### API Type Mismatches

**Issue**: Number values submitted as strings
**Solution**: Convert in mutation function

```typescript
retourId: parseInt(data.retourId);
```

---

## 📚 Documentation & Resources

### Official Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Hooks Docs](https://react.dev/reference/react)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Zod Validation](https://zod.dev)

### Project Documentation

- [API Documentation](#api-integration)
- [Routes Guide](#-routes-overview)
- [Component Architecture](#-modules-details)

---

## 🤝 Contributing

### Development Process

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes following code style
3. Test thoroughly on mobile and desktop
4. Commit with descriptive messages
5. Push and create pull request
6. Request review from team members

### Code Standards

- TypeScript strict mode
- ESLint violations must be fixed
- Components must be typed
- Props interfaces required
- Comments for complex logic

---

## 📄 Backend Integration

### Backend Technology

- **Language**: Java (Spring Boot)
- **API Type**: REST with OpenAPI/Swagger
- **Documentation**: Available at `/v3/api-docs`

### Key Endpoints

| Method | Endpoint               | Purpose                  |
| ------ | ---------------------- | ------------------------ |
| GET    | `/api/returns`         | List returns (paginated) |
| POST   | `/api/returns`         | Create return            |
| GET    | `/api/returns/{id}`    | Get return details       |
| PATCH  | `/api/returns/{id}`    | Update return            |
| DELETE | `/api/returns/{id}`    | Delete return            |
| GET    | `/api/users/all`       | List all users           |
| GET    | `/api/history`         | Get action history       |
| POST   | `/api/history/create`  | Create history entry     |
| GET    | `/api/non-conformites` | List non-conformities    |

### Environment Setup

Backend should be running on `http://localhost:8080` (configurable in `.env.local`)

---

## 📦 Deployment

### Building for Production

```bash
npm run build
```

Creates optimized production build with:

- Minified JavaScript
- Optimized images
- CSS minification
- Tree shaking

### Hosting Options

- **Vercel**: Direct deployment from GitHub
- **Docker**: Containerized deployment
- **Traditional Servers**: Node.js server
- **AWS/Azure**: Cloud deployment

### Environment Variables

Configure these for production:

```
NEXT_PUBLIC_API_URL=https://api.example.com
NODE_ENV=production
```

---

## 📊 Project Statistics

- **Components**: 30+ UI components
- **Pages**: 5+ main pages
- **Modules**: 4 core modules (Returns, History, Users, Non-Conformities)
- **Code Size**: Optimized for performance
- **Bundle Size**: ~250KB (optimized)

---

## 🔄 Version History

### v0.1.0 (Current)

- Initial release
- Core CRUD functionality
- User management
- History tracking
- Non-conformity management
- Dark/light theme
- Advanced filtering and pagination

---

## 📞 Support & Contact

For issues, questions, or suggestions:

- **GitHub Issues**: [Create an issue](https://github.com/LaithMahdi/gestion-retours-frontend/issues)
- **Email**: Contact project maintainer
- **Documentation**: Check this README first

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI Components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [HugeIcons](https://hugeicons.com)
- State management with [Zustand](https://zustand-demo.pmnd.rs)
- Form handling with [React Hook Form](https://react-hook-form.com)
- Data validation with [Zod](https://zod.dev)

---

## 🔗 Links

- **GitHub**: [LaithMahdi/gestion-retours-frontend](https://github.com/LaithMahdi/gestion-retours-frontend)
- **Live Demo**: (Configure based on deployment)
- **Backend API**: (Java Spring Boot repository)
- **API Docs**: `http://localhost:8080/swagger-ui.html`

---

**Last Updated**: April 2026  
**Maintained By**: Development Team  
**Status**: Active Development
