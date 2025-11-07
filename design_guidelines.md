# Digital Services Roadmap Dashboard - Design Guidelines

## Design Approach

**Selected System**: Material Design with Enterprise Enhancements
- Justification: Data-dense dashboard requiring clear hierarchy, professional appearance, and established interaction patterns
- Primary Reference: Linear (clean data visualization) + Asana (project management UI patterns)
- Key Principles: Information clarity, scannable hierarchies, purposeful interactions

## Core Design Elements

### A. Typography
- **Primary Font**: Inter or Roboto via Google Fonts CDN
- **Headings**: 
  - H1 (Dashboard title): font-semibold, text-2xl
  - H2 (Section headers): font-medium, text-xl
  - H3 (Card titles): font-medium, text-lg
- **Body Text**: text-sm for data tables, text-base for descriptions
- **Monospace**: Use for IDs, technical details (font-mono)

### B. Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, and 8
- Component padding: p-4 or p-6
- Section margins: my-6 or my-8
- Card gaps: gap-4
- Dense data areas: p-2, gap-2

**Grid Structure**:
- Main layout: Fixed navbar (h-16), content area fills remaining viewport
- Roadmap View: 30/70 split (left: hierarchical tree, right: Gantt chart)
- Use `flex` for header/content, `grid` for data displays

### C. Component Library

**Navigation & Structure**:
- Top navbar: Fixed header with tabs (Status, Roadmap), logo left, actions right
- Tab design: Underline indicator on active tab, subtle hover states
- Sidebar tree: Collapsible nodes with chevron icons, indentation levels using pl-4 increments

**Data Display Components**:
- **Gantt Chart Area**: 
  - Timeline header: Sticky months/quarters row with vertical gridlines
  - Task bars: Rounded rectangles (rounded-md) with status colors
  - Height per row: h-10 with gap-1 between rows
- **Tree View**:
  - Node levels: Distinct visual weight by hierarchy (Theme: font-bold, Initiative: font-semibold, etc.)
  - Expand/collapse: Chevron icon transitions
  - Selection state: Subtle background highlight

**Cards & Containers**:
- Card style: Subtle border, shadow-sm, rounded-lg, bg-white
- Section containers: Border or subtle background differentiation
- Status badges: Pill-shaped with status-specific backgrounds (opacity-20 with matching text color)

**Interactive Elements**:
- **Filters Bar**: Horizontal layout with dropdowns, search input, and date range picker
- **Dropdowns**: Material-style with label above, outlined border
- **Buttons**: 
  - Primary: Solid blue (per user spec), rounded-md, px-4 py-2
  - Secondary: Outlined variant
  - Icon buttons: Circular or square with icon-only
- **Tooltips**: Dark background, white text, arrow pointer, appear on hover with subtle delay

**Data Status Indicators**:
- Color coding: 
  - Green (#10b981): Completed
  - Yellow (#f59e0b): In Progress
  - Red (#ef4444): Blocked
  - Gray (#6b7280): Not Started
- Progress bars: Horizontal fill with percentage label
- Health gauges: Circular or radial progress in modals

### D. Animations

**Minimal & Purposeful**:
- Tree expand/collapse: Smooth height transition (duration-200)
- Tooltip appearance: Fade-in (duration-150)
- Button hover: Subtle scale or brightness shift
- Loading spinners: Rotating border animation
- NO timeline zoom animations, NO scroll-triggered effects, NO decorative motion

## Application-Specific Design Decisions

**Color Palette** (per user specification):
- Primary Blue: Use Material Design blue scale (500-600 for primary actions)
- Neutrals: Gray scale for backgrounds, borders, text hierarchy
- Status colors: As defined above

**Footer**:
- Include mountain image background as specified
- Overlay with subtle dark gradient for text readability
- Height: h-32 to h-48
- Content: Centered or left-aligned company info, links

**Responsive Behavior**:
- Desktop (lg+): Full split-screen roadmap view
- Tablet (md): Stack tree above Gantt, collapsible sidebar
- Mobile (base): Single-column, hide tree by default with toggle button

**Data Density**:
- Compact mode available via toggle for power users
- Default: Comfortable spacing (p-4, gap-4)
- Compact: Tighter spacing (p-2, gap-2), smaller text

**Loading & Error States**:
- Skeleton screens for Gantt chart during data fetch
- Empty state illustrations for no data scenarios
- Error alerts: Top-positioned banner with retry action

## Images

**Footer Mountain Image**:
- Placement: Full-width background in footer section
- Treatment: Slightly desaturated, subtle overlay for text contrast
- Purpose: Brand identity and visual grounding per user specification

**No Hero Images**: This is a dashboard application - prioritize immediate data visibility over marketing imagery

## Accessibility

- Keyboard navigation: Tab through all interactive elements, arrow keys in tree
- ARIA labels: On all icons, status indicators, chart elements
- Focus indicators: Visible outline on all focusable elements
- Color contrast: WCAG AA compliant for all text/background combinations
- Screen reader: Announce hierarchy levels, status changes, progress updates