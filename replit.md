# Digital Services Roadmap Dashboard

## Overview

A full-stack enterprise roadmap visualization application for tracking strategic themes, initiatives, and project hierarchies. The application provides interactive Gantt charts and hierarchical tree views to visualize project timelines and dependencies across multiple organizational levels.

**Core Purpose:** Enable portfolio managers and stakeholders to visualize and track multi-level project hierarchies from strategic themes down to individual stories, with timeline visualization and status tracking.

**Key Capabilities:**
- Multi-level hierarchy visualization (Theme → Initiative → Business Request → Epic → Feature → Story/Bug/Incident → Subtask)
- Interactive Gantt timeline charts with date-based visualization
- Dual-view interface: collapsible tree navigation and timeline chart
- Portfolio dashboard with completion metrics and health indicators
- Filtering and search across hierarchy levels, status, and priority

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React 18 with TypeScript using Vite as the build tool

**UI Component System:**
- **Library:** shadcn/ui components built on Radix UI primitives
- **Styling:** Tailwind CSS with custom design tokens following Material Design principles
- **Theme System:** CSS custom properties for light/dark mode support with consistent color semantics

**State Management:**
- TanStack Query (React Query) for server state management
- Local component state for UI interactions
- No global state management library (Redux/Zustand) currently implemented

**Routing:** Wouter for lightweight client-side routing

**Design System:**
- Typography: Inter/Roboto via Google Fonts
- Spacing: Tailwind units (2, 4, 6, 8) for consistent visual rhythm
- Component patterns inspired by Linear (data visualization) and Asana (project management)
- Focus on information density and scannable hierarchies

**Key Component Structure:**
- `DashboardLayout`: Main shell with tabbed navigation (Status/Roadmap views)
- `RoadmapView`: Split-panel layout (30/70) for tree and Gantt chart
- `HierarchyTree`: Collapsible tree with expand/collapse, visual hierarchy differentiation
- `GanttChart`: Timeline visualization with color-coded status bars
- `StatusDashboard`: Portfolio metrics with circular gauge visualizations
- `FilterBar`: Multi-dimension filtering (type, status, priority, release, search)

### Backend Architecture

**Framework:** Express.js on Node.js with TypeScript

**API Design:**
- RESTful endpoints prefixed with `/api`
- Currently skeletal - routes registered in `server/routes.ts`
- Designed to integrate with Jira API for fetching hierarchical project data

**Data Layer:**
- In-memory storage implementation (`MemStorage`) for development
- Interface-based design (`IStorage`) allows swapping implementations
- Prepared for database integration (Drizzle ORM configured for PostgreSQL)

**Development Server:**
- Vite middleware integration for HMR
- Custom logging middleware for API request tracking
- Error overlay plugin for development

### Data Storage Solutions

**ORM:** Drizzle ORM configured for PostgreSQL (via `@neondatabase/serverless`)

**Current Schema:**
- Minimal user table defined in `shared/schema.ts`
- Schema uses Drizzle-Zod for runtime validation
- Migration setup configured via `drizzle.config.ts`

**Storage Strategy:**
- Interface-based abstraction allows switching between in-memory and persistent storage
- Current implementation: `MemStorage` (Map-based, non-persistent)
- Production-ready: PostgreSQL via Drizzle ORM (configured but not actively used)

**Intended Data Model (based on requirements):**
- Hierarchical project items: Theme → Initiative → Business Request → Epic → Feature → Story/Bug/Incident → Subtask
- Each level maintains parent-child relationships
- Attributes: dates, status, priority, completion percentage, story points

### Authentication and Authorization

**Current State:** No authentication implemented

**Prepared Infrastructure:**
- User schema with username/password fields defined
- Storage interface includes user CRUD methods
- Session management dependencies installed (`connect-pg-simple` for PostgreSQL-backed sessions)

**Intended Approach:**
- Session-based authentication (indicated by session store dependency)
- User credentials stored with hashed passwords
- Ready for implementation when needed

## External Dependencies

### Third-Party Services

**Jira Integration (Planned):**
- Purpose: Fetch hierarchical project data (themes, initiatives, epics, stories, bugs)
- Implementation: `@atlassian/jira-client` or axios for API calls
- Authentication: API token via environment variables
- Data aggregation into nested JSON for frontend consumption

### Database

**PostgreSQL via Neon:**
- Serverless PostgreSQL (`@neondatabase/serverless`)
- Connection configured via `DATABASE_URL` environment variable
- Drizzle ORM for schema management and queries
- Migration system configured (output to `./migrations`)

### UI & Visualization Libraries

**Component Libraries:**
- **Radix UI:** Comprehensive set of accessible, unstyled primitives for dialogs, dropdowns, tabs, tooltips, etc.
- **shadcn/ui:** Pre-styled components built on Radix with Tailwind CSS
- **Lucide React:** Icon library for consistent iconography

**Data Visualization:**
- Date manipulation: `date-fns` for timeline calculations
- Carousel: `embla-carousel-react` for potential multi-view scrolling
- Chart capabilities prepared (dependencies suggest future Chart.js or D3.js integration per requirements)

**Form Handling:**
- React Hook Form with Zod validation (`@hookform/resolvers`)
- Type-safe form schemas via Drizzle-Zod

### Development & Build Tools

- **Vite:** Fast build tool with React plugin, HMR, and Replit-specific plugins
- **TypeScript:** Full type safety across frontend, backend, and shared code
- **Tailwind CSS:** Utility-first styling with PostCSS
- **esbuild:** Bundle backend for production deployment

### Deployment Considerations

**Environment:**
- Designed for Vercel deployment (per requirements)
- Environment variables: `DATABASE_URL`, Jira credentials
- Production build: Frontend via Vite, backend via esbuild
- Static assets served from `dist/public`

**Configuration:**
- Path aliases: `@/` (client), `@shared/` (shared types), `@assets/` (static files)
- Module type: ESM throughout
- Build outputs separated: frontend to `dist/public`, backend to `dist`