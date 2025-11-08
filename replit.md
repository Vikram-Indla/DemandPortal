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

The frontend is built with React 18 and TypeScript, using Vite. UI components leverage shadcn/ui (built on Radix UI) and styled with Tailwind CSS. State management uses TanStack Query for server state. Wouter is used for client-side routing. The design emphasizes information density and scannable hierarchies.

Key features include:
- **Six specialized dashboard views**: Portfolio, Business Roadmap, Feature Roadmap, Epic Roadmap, Release Dashboard, and Roadmap Guide.
- **Portfolio Dashboard**: Displays initiative progress, a strategic theme spotlight with compact circular gauges and status matrices, and a business request grid with status breakdowns.
- **Roadmap Views (Business, Feature, Epic)**: Interactive Gantt charts with configurable timeline windows (e.g., 8-week fixed window for Feature/Epic, quarterly/monthly for Business Roadmap) and navigation controls.
- **Roadmap Guide**: Provides a visual, branching diagram of a 7-level hierarchy (Strategic Theme → Initiative → Business Request → Feature → Epic → Story → Subtask) with three possible execution paths from a Business Request. Includes a PDF export feature for the hierarchy visualization.
- **Mixed Hierarchy Support**: Business Requests can contain both Features and direct Epics, with automated completion percentage calculations based on immediate children.

### Backend Architecture

The backend is built with Express.js on Node.js using TypeScript. It features RESTful API endpoints and is designed with an `IStorage` interface for future integration with persistent storage. The architecture is prepared for database integration and designed to integrate with external APIs like Jira.

### Data Model Architecture

The data model supports a multi-level hierarchy: Theme → Initiative → Feature → Epic → Story → Subtask. A "Business Request" can uniquely contain both Features and direct Epics, using discriminated union types for flexibility and type safety (`isFeature()`, `isEpic()`, `isStory()`). Completion percentages are calculated recursively based on immediate children.

## External Dependencies

### Third-Party Services

- **Jira Integration (Planned):** For fetching hierarchical project data.

### Database

- **PostgreSQL via Neon:** Serverless PostgreSQL managed with Drizzle ORM.

### UI & Visualization Libraries

- **Radix UI:** Accessible, unstyled primitives.
- **shadcn/ui:** Pre-styled components built on Radix with Tailwind CSS.
- **Lucide React:** Icon library.
- **date-fns:** For date manipulation.
- **html2pdf.js:** Client-side HTML-to-PDF conversion.

### Development & Build Tools

- **Vite:** Fast build tool.
- **TypeScript:** For type safety.
- **Tailwind CSS:** For styling.