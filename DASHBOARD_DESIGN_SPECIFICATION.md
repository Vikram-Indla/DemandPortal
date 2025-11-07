# Portfolio Dashboard Design Specification
## Consistent Design System Across All Views

---

## 🎨 Design Philosophy

**Core Principle**: Maintain visual consistency across all dashboard views while allowing content structure to vary based on data hierarchy (Features → Epics → Stories) and release cycles.

### Shared Design Language
All dashboards follow the same visual system:
- **Color Palette**: Consistent status colors (green/amber/red/slate)
- **Typography**: Same font sizes and weights across similar elements
- **Spacing**: Uniform padding and gaps
- **Components**: Shared UI components (Cards, Badges, Progress bars)
- **Interactions**: Consistent hover states and transitions

---

## 📊 Dashboard Views Overview

### 1. Portfolio Dashboard
**Purpose**: Executive overview of strategic initiatives
**Layout**: Card grid with circular gauges
**Key Metrics**: Initiative completion, business request progress
**Grouping**: Strategic themes

### 2. Portfolio Roadmap (Epic View)
**Purpose**: Timeline view of epics and features
**Layout**: Horizontal Gantt chart
**Key Metrics**: Date ranges, completion percentage, status
**Grouping**: Hierarchical (Features → Epics → Stories)

### 3. Feature Roadmap
**Purpose**: Timeline view of strategic features
**Layout**: Horizontal Gantt chart (same as Epic Roadmap)
**Key Metrics**: Date ranges, epic count, completion percentage
**Grouping**: Features with date ranges

### 4. Release Dashboard
**Purpose**: Tactical view of stories by release version
**Layout**: Card-based grouped lists
**Key Metrics**: Story counts, points, completion by version
**Grouping**: Release versions (e.g., v1.0, v1.1, v2.0)

---

## 🎨 Shared Design Tokens

### Color System
```typescript
// Status Colors (used across all views)
statusColors = {
  done: {
    bg: 'bg-green-100 dark:bg-green-950/30',
    border: 'border-green-500',
    text: 'text-green-800 dark:text-green-300'
  },
  'in-progress': {
    bg: 'bg-amber-100 dark:bg-amber-950/30',
    border: 'border-amber-500',
    text: 'text-amber-900 dark:text-amber-300'
  },
  blocked: {
    bg: 'bg-red-100 dark:bg-red-950/30',
    border: 'border-red-500',
    text: 'text-red-900 dark:text-red-300'
  },
  'not-started': {
    bg: 'bg-slate-100 dark:bg-slate-800/30',
    border: 'border-slate-400',
    text: 'text-slate-800 dark:text-slate-300'
  }
}

// Priority Colors (used across all views)
priorityColors = {
  high: 'text-red-600 dark:text-red-400',
  medium: 'text-amber-600 dark:text-amber-400',
  low: 'text-slate-600 dark:text-slate-400'
}
```

### Typography Scale
```typescript
// Consistent across all views
typography = {
  pageTitle: 'text-2xl font-semibold',
  sectionTitle: 'text-xl font-semibold',
  cardTitle: 'text-lg font-semibold',
  itemTitle: 'text-sm font-medium',
  body: 'text-sm',
  caption: 'text-xs',
  metric: 'text-2xl font-bold'
}
```

### Spacing System
```typescript
// Consistent spacing across all views
spacing = {
  pageContainer: 'p-6',
  sectionGap: 'space-y-6',
  cardPadding: 'p-4',
  itemGap: 'gap-3',
  iconText: 'gap-2'
}
```

### Component Patterns
- **Cards**: `<Card>` with hover-elevate
- **Badges**: `variant="secondary"` for types, `variant="outline"` for metadata
- **Progress**: `<Progress>` with h-2 height
- **Icons**: lucide-react, w-4/h-4 for inline, w-5/h-5 for headers

---

## 📐 View-Specific Layouts

### Portfolio Dashboard
```
┌─────────────────────────────────────────────┐
│ Header: Title + Theme Tabs                  │
├─────────────────────────────────────────────┤
│ Strategic Theme Spotlight (conditional)     │
├─────────────────────────────────────────────┤
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐│
│ │Circular│ │Circular│ │Circular│ │Circular││
│ │ Gauge  │ │ Gauge  │ │ Gauge  │ │ Gauge  ││
│ │Initiative│Initiative│Initiative│Initiative│
│ └────────┘ └────────┘ └────────┘ └────────┘│
├─────────────────────────────────────────────┤
│ Business Requests Grid                      │
└─────────────────────────────────────────────┘
```

### Portfolio Roadmap & Feature Roadmap
```
┌─────────────────────────────────────────────┐
│ [Tree] │ Month │ Month │ Month │ Month │... │ ← Sticky Header
├────────┼───────┴───────┴───────┴───────┴────┤
│ Item 1 │ ═══════════════                    │ ← Gantt Bar
├────────┼────────────────────────────────────┤
│ Item 2 │     ═══════                        │
├────────┼────────────────────────────────────┤
│ Item 3 │           ══════════════           │
└────────┴────────────────────────────────────┘
         │ Grid lines │
         └────────────┘
```

### Story Completion Dashboard
```
┌─────────────────────────────────────────────┐
│ Header: Title                               │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ Fix Version 1.0   [Metrics] [Progress]  │ │
│ ├─────────────────────────────────────────┤ │
│ │ ○ PROJ-123  Story Title    [Status]     │ │
│ │ ○ PROJ-124  Story Title    [Status]     │ │
│ │ ○ PROJ-125  Story Title    [Status]     │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ Fix Version 2.0   [Metrics] [Progress]  │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## 🎯 Interaction Patterns

### Hover States
- **All clickable items**: `hover-elevate` class for consistent elevation
- **Gantt bars**: Group hover effect showing interaction availability
- **Cards**: Subtle elevation on hover

### Hover Cards (Gantt Views Only)
- **Trigger**: Gantt bar hover
- **Content**: Detailed information with same structure:
  - Title + Status badge
  - Progress bar
  - Date range
  - Additional metrics
  - Theme/categorization

### Progress Indicators
- **Dual Progress** (Gantt): Visual completion overlay + percentage text
- **Single Progress** (Cards): Progress bar below metrics
- **Circular Gauge** (Dashboard): Animated circular progress

---

## 🔐 Role-Based Access (Future)

All views maintain the same design system, with access controlled by role:

```typescript
enum Role {
  EXECUTIVE,    // Portfolio Dashboard + Feature Roadmap
  PM,           // All roadmap views
  TEAM_LEAD,    // Roadmap + Story Completion
  DEVELOPER,    // Story Completion only
  ADMIN         // All views
}
```

---

## ✨ Key Design Principles

1. **Consistency First**: Same colors, typography, spacing across all views
2. **Content Drives Structure**: Layout varies (cards vs. gantt vs. lists) based on data type
3. **Hierarchy Through Layout**: Not visual styling (all use same components)
4. **Responsive Design**: All views adapt to smaller screens
5. **Accessibility**: WCAG AA compliance across all views
6. **Dark Mode**: Full support with consistent theming

---

## 📦 Shared Components

All dashboards use these components from the design system:
- `Card`, `CardHeader`, `CardTitle`, `CardContent`
- `Badge` (secondary, outline variants)
- `Progress`
- `HoverCard`, `HoverCardTrigger`, `HoverCardContent`
- `Tabs`, `TabsList`, `TabsTrigger`
- Icons from `lucide-react`

---

## 🚀 Implementation Notes

1. **Single Theme**: All views use tokens from `design_guidelines.md`
2. **No Custom Styling**: Avoid view-specific color/typography overrides
3. **Component Reuse**: Maximize shared component usage
4. **Consistent Icons**: Same icon size for same purposes across views
5. **Uniform Spacing**: Use design system spacing tokens

---

This specification ensures visual consistency across all portfolio views while allowing each to present data in the most appropriate format for its purpose.
