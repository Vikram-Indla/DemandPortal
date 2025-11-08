# Digital Services Roadmap Dashboard

## Overview

A full-stack enterprise roadmap visualization application for tracking strategic themes, initiatives, and project hierarchies. The application provides multiple specialized dashboard views designed for different organizational levels, with consistent visual design and interactive timeline visualizations. Its core purpose is to enable portfolio managers and stakeholders to visualize and track multi-level project hierarchies from strategic themes down to individual stories, with timeline visualization, status tracking, and role-based access preparation.

Key capabilities include:
- Six specialized dashboard views (Portfolio Dashboard, Business Roadmap, Feature Roadmap, Epic Roadmap, Release Dashboard, Roadmap Guide)
- Multi-level hierarchy visualization (Theme → Initiative → Business Request → Epic → Feature → Story → Subtask)
- Interactive Gantt timeline charts with date-based visualization and explicit status badges
- Strategic Theme Spotlight with circular gauge for completion percentage
- Filtering and search capabilities with recursive tree filtering
- Consistent design system across all views
- Prepared for role-based access control.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React 18 and TypeScript, using Vite as the build tool. UI components leverage shadcn/ui (built on Radix UI primitives) and styled with Tailwind CSS, following a consistent design system. State management primarily uses TanStack Query for server state, with local component state for UI interactions. Wouter is used for client-side routing. The design emphasizes information density and scannable hierarchies, inspired by tools like Linear and Asana.

Key components include:
- `DashboardLayout` with six-tab navigation
- `StatusDashboard` for portfolio metrics
- `RoadmapView` (Business Roadmap) displays only business requests with quarterly/monthly timeline toggle
  - Tree view hidden by default (can be toggled visible)
  - Shows only business requests in Gantt chart (no child epics/stories visible)
  - Timeline defaults to quarterly view with quarter-aligned headers (Q4 2024, Q1 2025, etc.)
  - Toggle button allows switching between quarterly and monthly timeline views
  - Item counter displays filtered count relative to total business requests (e.g., "Showing 4 of 4 items")
  - Filter dropdowns removed (All Types, All Status, All Priority, All Releases) - only search and export remain
- `FeatureRoadmap` and `EpicRoadmap` for feature/epic-specific timeline visualizations
  - Support weekly, bi-weekly (default), and monthly timeline views with toggle buttons
  - Weekly view: Shows 7-day periods aligned to Monday-Sunday with date range labels
  - Bi-weekly view: Shows 14-day periods aligned to Monday with date range labels
  - Monthly view: Shows monthly periods with month/year labels
  - Minimum 1-day width for single-day items (milestones) to ensure visibility
- `ReleaseDashboard` for release-version grouping
- `RoadmapGuide` for educational hierarchy visualization with executive commentary via a centered modal dialog
- `FilterBar` with configurable filters for level, status, priority, release, and search
- `HierarchyTree` and `GanttChart` supporting multiple work item types including business-request with quarterly/monthly timeline modes.

### Backend Architecture

The backend is built with Express.js on Node.js using TypeScript. It features RESTful API endpoints, currently using an in-memory storage implementation for development but designed with an interface (`IStorage`) for future integration with persistent storage. The architecture is prepared for database integration and designed to integrate with external APIs like Jira.

### Data Storage Solutions

The project is configured to use Drizzle ORM for PostgreSQL (specifically via `@neondatabase/serverless`). While currently using `MemStorage` (in-memory) for development, the design allows for easy swapping to persistent PostgreSQL. The intended data model supports hierarchical project items (Theme to Subtask) with parent-child relationships and attributes like dates, status, priority, and completion percentage.

**Mock Data:**
- Business Roadmap uses externalized mock data from `client/src/data/businessRoadmapMock.ts`
- Contains 4 business requests with child epics and stories spanning Q4 2024 - Q3 2025
- Organized by themes: Compliance & Security, Customer Experience, Platform Reliability
- Designed for easy replacement with real Jira API data
- Recent improvements:
  - Fixed quarterly timeline alignment to ensure grid columns match timeline range
  - Fixed item counter to show business request count only (not including child items)
  - Added quarterly/monthly toggle with default quarterly view

### Authentication and Authorization

Authentication is not yet implemented but the infrastructure is prepared. This includes a user schema, user CRUD methods in the storage interface, and session management dependencies (`connect-pg-simple`), indicating an intended session-based authentication approach with hashed passwords.

## External Dependencies

### Third-Party Services

- **Jira Integration (Planned):** For fetching hierarchical project data (themes, initiatives, epics, stories, bugs) using `@atlassian/jira-client` or axios.

### Database

- **PostgreSQL via Neon:** Serverless PostgreSQL (`@neondatabase/serverless`) managed with Drizzle ORM for schema and queries.

### UI & Visualization Libraries

- **Radix UI:** Accessible, unstyled primitives.
- **shadcn/ui:** Pre-styled components built on Radix with Tailwind CSS.
- **Lucide React:** Icon library.
- **date-fns:** For date manipulation in timeline calculations.
- **embla-carousel-react:** For potential carousel functionalities.
- **React Hook Form with Zod:** For form handling and validation.

### Development & Build Tools

- **Vite:** Fast build tool with React plugin and HMR.
- **TypeScript:** For type safety.
- **Tailwind CSS:** For utility-first styling.
- **esbuild:** For bundling the backend.