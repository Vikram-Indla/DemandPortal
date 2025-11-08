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
  - Fixed 8-week (56-day) timeline window with navigation controls
  - Navigation: "Prev 8 Weeks", "Today", "Next 8 Weeks" buttons to move through time
  - Window always starts Monday at midnight, ends 55 days later at end-of-day
  - Only items overlapping current 8-week window are displayed
  - Support weekly, bi-weekly (default), and monthly timeline views with toggle buttons
  - Weekly view: Shows exactly 8 columns (8 weeks) with date range labels
  - Bi-weekly view: Shows exactly 4 columns (4 periods) with date range labels
  - Monthly view: Shows 2-3 month columns depending on window alignment
  - Date range display shows current window span (e.g., "Nov 4, 2024 - Dec 29, 2024")
  - Minimum 1-day width for single-day items (milestones) to ensure visibility
  - Inclusive duration calculation ensures both start and end dates are properly represented
- `ReleaseDashboard` for release-version grouping
- `RoadmapGuide` for educational hierarchy visualization with executive commentary via a centered modal dialog
- `FilterBar` with configurable filters for level, status, priority, release, and search
- `HierarchyTree` and `GanttChart` supporting multiple work item types including business-request with quarterly/monthly timeline modes.

### Backend Architecture

The backend is built with Express.js on Node.js using TypeScript. It features RESTful API endpoints, currently using an in-memory storage implementation for development but designed with an interface (`IStorage`) for future integration with persistent storage. The architecture is prepared for database integration and designed to integrate with external APIs like Jira.

### Data Storage Solutions

The project is configured to use Drizzle ORM for PostgreSQL (specifically via `@neondatabase/serverless`). While currently using `MemStorage` (in-memory) for development, the design allows for easy swapping to persistent PostgreSQL. 

**Data Model Architecture:**
- **Hierarchical Items**: Theme → Initiative → Feature → Epic → Story → Subtask (traditional hierarchy)
- **Business Request Mixed Hierarchy**: Business Request can contain BOTH Features and direct Epics
  - **Feature Path**: Business Request → Feature → Epic → Story
  - **Direct Epic Path**: Business Request → Epic → Story (no feature parent)
  - Uses discriminated union types with `type` field ('feature', 'epic', 'story')
  - Type guards ensure type safety: `isFeature()`, `isEpic()`, `isStory()`
  - Completion percentages automatically calculated from immediate children
  - Business request % = average of ALL direct children (Features AND Epics)
  - Feature % = average of child epics
  - Epic % = average of child stories (or explicit value if no stories)
  - Story % = explicit value
  - Separate from Feature/Epic roadmaps to avoid coupling

**Mock Data:**
All mock data is organized in `client/src/data/` for easy maintenance and eventual replacement with Jira API:
- **businessRoadmapMock.ts**: Business requests with mixed hierarchy (Q4 2024 - Q3 2025)
  - **Mixed hierarchy model**: Business Request can have Features AND/OR direct Epics
  - 4 business requests with diverse structures:
    - BR-1: Has 1 Feature + 1 direct Epic (mixed children)
    - BR-2: Has 2 Features (no direct epics)
    - BR-3: Has 1 Feature with 2 Epics
    - BR-4: Has only direct Epic (no features)
  - Total: 4 Features, 7 Epics, 11 Stories
  - **Discriminated union types**: BaseWorkItem, Story, Epic, Feature, BusinessRequest
  - **Automatic percentage calculation**: Recursive averaging from immediate children
    - Business request % = average of Features + direct Epics
    - Feature % = average of child Epics
    - Epic % = average of child Stories
  - Type guards for type safety: `isFeature()`, `isEpic()`, `isStory()`
  - Quarterly/monthly timeline support
  - Helper functions: `buildBusinessRequestTree()`, `flattenToGanttItems()` for tree/timeline visualization
  - Mirrors real-world Jira Advanced Roadmaps structure
- **featureRoadmapMock.ts**: 12 features spanning Sept 2024 - March 2026
  - Includes completed, in-progress, blocked, and not-started features
  - Contains milestone feature (single-day) to test minimum width rendering
  - Current period (Nov 2025) has multiple active features visible in default 8-week window
  - Dates designed to test 8-week window navigation
- **epicRoadmapMock.ts**: 20 epics spanning Sept 2024 - Feb 2026
  - Epics linked to features with realistic completion percentages
  - Includes milestone epic (single-day), blocked epics, and not-started epics
  - Current period (Nov 2025) has 6 epics visible in default 8-week window with all status types
  - Comprehensive coverage for 8-week window testing with status diversity
- **portfolioMetricsMock.ts**: Portfolio Dashboard metrics
  - 5 initiatives with aggregated metrics
  - 8 business requests with item counts and status breakdowns
- **releaseDashboardMock.ts**: 25 stories across 4 release versions (v1.0, v1.1, v2.0, v2.1)
  - Stories include subtasks with assignees
  - Organized by fixVersion for release grouping
  
All mock data is temporary and will be replaced with real Jira API integration.

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