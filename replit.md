# Digital Services Roadmap Dashboard

## Overview

A full-stack enterprise roadmap visualization application for tracking strategic themes, initiatives, and project hierarchies. The application provides multiple specialized dashboard views designed for different organizational levels, with consistent visual design and interactive timeline visualizations.

**Core Purpose:** Enable portfolio managers and stakeholders to visualize and track multi-level project hierarchies from strategic themes down to individual stories, with timeline visualization, status tracking, and role-based access preparation.

**Key Capabilities:**
- **Six Dashboard Views:**
  - Portfolio Dashboard: Strategic initiative overview with circular gauges and theme filtering with Strategic Theme Spotlight
  - Portfolio Roadmap: Interactive Gantt chart with full hierarchy tree navigation (Feature → Epic → Story)
  - Feature Roadmap: Timeline view of strategic features with date ranges and status indicators
  - Epic Roadmap: Timeline view of epics across features with progress tracking
  - Release Dashboard: Tactical view of stories grouped by release version with expandable subtasks
  - **Roadmap Guide:** Educational pyramid visualization showing work item hierarchy with executive commentary for change management
- Multi-level hierarchy visualization (Theme → Initiative → Business Request → Epic → Feature → Story → Subtask)
- Interactive Gantt timeline charts with date-based visualization and explicit status badges
- Strategic Theme Spotlight with circular gauge for completion percentage
- Filtering and search across hierarchy levels, status, and priority
- Consistent design system across all views with shared components
- Prepared for role-based access control (Executive, PM, Team Lead, Developer roles)

## User Preferences

Preferred communication style: Simple, everyday language.

## Design System

**Consistent Visual Language:**
All four dashboard views follow the same design system to ensure cohesive user experience:

- **Shared Color Palette:**
  - Status colors: Green (done), Amber (in-progress), Red (blocked), Slate (not-started)
  - Tinted backgrounds: 100/950 shades for light/dark mode
  - Strong borders: 500 shades for status indicators
  - Priority colors: Red (high), Amber (medium), Slate (low)

- **Typography Scale:**
  - Page titles: text-2xl font-semibold
  - Section titles: text-xl font-semibold
  - Card titles: text-lg
  - Item titles: text-sm font-medium
  - Metrics: text-2xl font-bold
  - Body/captions: text-sm, text-xs

- **Spacing System:**
  - Page container: p-6
  - Section gaps: space-y-6
  - Card padding: p-4
  - Consistent icon sizes: w-4 h-4 (inline), w-5 h-5 (headers)

- **Shared Components:**
  - Card, Badge (secondary/outline variants), Progress bars
  - HoverCard for detailed information
  - Tabs for navigation
  - Lucide React icons throughout

**View-Specific Layouts:**
While maintaining visual consistency, each view uses the layout that best fits its data:
- Portfolio Dashboard: Card grid with circular gauges
- Portfolio Roadmap: Horizontal Gantt chart with hierarchy tree
- Feature Roadmap: Horizontal Gantt chart (strategic level)
- Release Dashboard: Grouped cards with story lists by release version

See `DASHBOARD_DESIGN_SPECIFICATION.md` for complete design documentation.

## Recent Changes

**November 7, 2025 (Latest):**
- ✅ Created Roadmap Guide page with pyramid hierarchy visualization for change management education
- ✅ Interactive hover states showing executive-level commentary for each work item type
- ✅ Pyramid displays 5 levels: Initiative → Feature → Epic → Story → Subtask with progressive widths
- ✅ Executive insights include characteristics, examples, typical duration, and portfolio counts
- ✅ Change Management Insights card with strategic alignment, value delivery, execution planning, and delivery cadence guidance
- ✅ Enhanced risk items with work item type badges (Initiative/Feature/Epic/Story) using distinct icons
- ✅ Added hierarchy breadcrumbs showing parent-to-child path (e.g., "Security Enhancement → Compliance & Audit")
- ✅ Implemented priority badges with colored backgrounds (High=Red, Medium=Amber, Low=Slate)
- ✅ Two-row compact layout: title row (key, title, priority badge) + metadata row (type, hierarchy, progress, date)
- ✅ Type differentiation: Initiative (Zap), Feature (Target), Epic (Layers), Story (FileText) icons
- ✅ Redesigned risk displays as compact, data-focused lists showing priority, progress, and end dates
- ✅ Moved Portfolio Risks under Business Requests section for better contextual placement
- ✅ Added Release Risks section under Release Dashboard with same compact format
- ✅ Added explicit status badges to all roadmap views (Portfolio, Feature, Epic) in left column

**November 7, 2025:**
- ✅ Created Epic Roadmap view with timeline visualization for 13 epics across features
- ✅ Added circular gauge to Strategic Theme Spotlight matching initiative card style
- ✅ Theme gauge shows completion percentage with color-coded progress (green ≥75%, amber ≥50%, blue ≥25%, red <25%)
- ✅ Implemented expandable subtask functionality in Release Dashboard
- ✅ Subtasks display with status badges, assignee, and hierarchical visual borders
- ✅ Moved Strategic Theme Spotlight from Portfolio Roadmap to Portfolio Dashboard
- ✅ Removed theme filtering from Portfolio Roadmap (now shows all items)
- ✅ Created Feature Roadmap component with Gantt-style timeline view
- ✅ Created Release Dashboard with release version grouping (formerly Story Completion Dashboard)
- ✅ Redesigned both new dashboards to match consistent design language
- ✅ Added five-tab navigation in DashboardLayout
- ✅ Created comprehensive design specification document
- ✅ Added mock data for features, epics, stories, and subtasks
- ✅ Strategic Theme Spotlight now has smart visibility (shows only when specific theme selected)

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
- `DashboardLayout`: Main shell with six-tab navigation (Portfolio Dashboard, Portfolio Roadmap, Feature Roadmap, Epic Roadmap, Release Dashboard, Roadmap Guide)
- `StatusDashboard`: Portfolio metrics with circular gauges, Strategic Theme Spotlight, and compact Portfolio Risks
- `CompactRiskList`: Space-efficient risk display showing priority, progress, and end dates for at-risk items
- `RoadmapView`: Split-panel layout (collapsible tree + Gantt chart) for full hierarchy with explicit status badges
- `FeatureRoadmap`: Gantt-style timeline for strategic features with hover cards and status indicators
- `EpicRoadmap`: Gantt-style timeline for epics across features with progress tracking and status badges
- `ReleaseDashboard`: Card-based view grouping stories by release version with expandable subtasks and Release Risks
- `RoadmapGuide`: Educational pyramid showing work item hierarchy (Initiative→Feature→Epic→Story→Subtask) with executive commentary on hover
- `HierarchyTree`: Collapsible tree with expand/collapse, visual hierarchy differentiation
- `GanttChart`: Timeline visualization with color-coded status bars and completion overlays
- `StrategicThemeSpotlight`: Theme-specific metrics banner (conditional visibility)
- `FilterBar`: Multi-dimension filtering (type, status, priority, release, search)
- `BusinessRequestGrid`: Compact grid view for business request tracking

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