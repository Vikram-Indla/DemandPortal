# 📋 Component Migration Checklist

Use this checklist to track which components you've successfully migrated to Lovable.

---

## 🎨 Core Layout Components

- [ ] **DashboardLayout.tsx** - Main layout with 6-tab navigation
  - Location: `client/src/components/DashboardLayout.tsx` → `src/components/DashboardLayout.tsx`
  - Dependencies: Tabs, Button, theme toggle
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

- [ ] **App.tsx** - Main app component with QueryClient
  - Location: `client/src/App.tsx` → `src/App.tsx`  
  - Dependencies: All dashboard components
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

---

## 📊 Dashboard 1: Portfolio Dashboard

- [ ] **StatusDashboard.tsx** - Main portfolio view
  - Location: `client/src/components/StatusDashboard.tsx` → `src/components/StatusDashboard.tsx`
  - Supabase Hook: `useInitiativesByTheme()`, `useBusinessRequestsByTheme()`
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

- [ ] **StrategicThemeSpotlight.tsx** - Theme spotlight card
  - Location: `client/src/components/StrategicThemeSpotlight.tsx` → `src/components/StrategicThemeSpotlight.tsx`
  - Dependencies: CircularGauge, StatusMatrixRow
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

- [ ] **BusinessRequestGrid.tsx** - BR grid with breakdown
  - Location: `client/src/components/BusinessRequestGrid.tsx` → `src/components/BusinessRequestGrid.tsx`
  - Dependencies: Table, Badge, Progress
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

- [ ] **CompactRiskList.tsx** - Risk items list
  - Location: `client/src/components/CompactRiskList.tsx` → `src/components/CompactRiskList.tsx`
  - Dependencies: Card, Badge
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

---

## 🗺️ Dashboard 2: Business Roadmap

- [ ] **RoadmapView.tsx** - Business roadmap main view
  - Location: `client/src/components/RoadmapView.tsx` → `src/components/RoadmapView.tsx`
  - Supabase Hook: `useBusinessRequests()`, `useFeatures()`, `useEpics()`
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

- [ ] **HierarchyTree.tsx** - Tree view component
  - Location: `client/src/components/HierarchyTree.tsx` → `src/components/HierarchyTree.tsx`
  - Dependencies: Recursive tree rendering
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

- [ ] **GanttChart.tsx** - Gantt timeline chart
  - Location: `client/src/components/GanttChart.tsx` → `src/components/GanttChart.tsx`
  - Dependencies: HoverCard, Badge, Progress
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

- [ ] **FilterBar.tsx** - Filter and search bar
  - Location: `client/src/components/FilterBar.tsx` → `src/components/FilterBar.tsx`
  - Dependencies: Input, Select, Button
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

---

## 🎯 Dashboard 3: Feature Roadmap

- [ ] **FeatureRoadmap.tsx** - Feature timeline view
  - Location: `client/src/components/FeatureRoadmap.tsx` → `src/components/FeatureRoadmap.tsx`
  - Supabase Hook: `useFeatures()`
  - Dependencies: 8-week window navigation, HoverCard
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

---

## 🚀 Dashboard 4: Epic Roadmap

- [ ] **EpicRoadmap.tsx** - Epic timeline view
  - Location: `client/src/components/EpicRoadmap.tsx` → `src/components/EpicRoadmap.tsx`
  - Supabase Hook: `useEpics()`
  - Dependencies: 8-week window navigation, HoverCard
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

---

## 📦 Dashboard 5: Release Dashboard

- [ ] **ReleaseDashboard.tsx** - Release version grouping
  - Location: `client/src/components/ReleaseDashboard.tsx` → `src/components/ReleaseDashboard.tsx`
  - Supabase Hook: `useStoriesByAllReleases()`
  - Dependencies: CompactRiskList, Card, Badge
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

---

## 📚 Dashboard 6: Roadmap Guide

- [ ] **RoadmapGuide.tsx** - Hierarchy guide with PDF export
  - Location: `client/src/pages/RoadmapGuide.tsx` → `src/pages/RoadmapGuide.tsx`
  - Dependencies: Dialog, html2pdf.js
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

---

## 🧩 Shadcn UI Components

Copy from `client/src/components/ui/` to `src/components/ui/`:

- [ ] **card.tsx** - Card, CardHeader, CardContent, etc.
- [ ] **badge.tsx** - Badge component
- [ ] **button.tsx** - Button component  
- [ ] **progress.tsx** - Progress bar
- [ ] **tabs.tsx** - Tabs, TabsList, TabsTrigger, TabsContent
- [ ] **input.tsx** - Input field
- [ ] **select.tsx** - Select dropdown
- [ ] **hover-card.tsx** - HoverCard component
- [ ] **dialog.tsx** - Dialog/Modal component
- [ ] **toast.tsx** - Toast notifications
- [ ] **toaster.tsx** - Toaster container
- [ ] **tooltip.tsx** - Tooltip component

**Note:** Lovable includes most shadcn components by default. Only copy if you have customizations.

---

## 🛠️ Utility Files

- [ ] **utils.ts** - cn() function for className merging
  - Location: `client/src/lib/utils.ts` → `src/lib/utils.ts`
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

- [ ] **use-toast.ts** - Toast hook
  - Location: `client/src/hooks/use-toast.ts` → `src/hooks/use-toast.ts`
  - Status: ⏳ Not started | ⚙️ In progress | ✅ Complete

---

## 🗄️ Supabase Integration

### Database Setup

- [ ] **Schema Migration** - Run initial_schema.sql
  - File: `lovable-migration/supabase/migrations/20251108000001_initial_schema.sql`
  - Status: ⏳ Not started | ✅ Complete

- [ ] **Seed Data** - Run seed_data.sql
  - File: `lovable-migration/supabase/migrations/20251108000002_seed_data.sql`
  - Status: ⏳ Not started | ✅ Complete

### Supabase Client & Hooks

- [ ] **client.ts** - Supabase client config
  - Location: `lovable-migration/src/integrations/supabase/client.ts` → `src/integrations/supabase/client.ts`
  - Status: ⏳ Not started | ✅ Complete

- [ ] **useThemes.tsx** - Strategic Themes hooks
  - Location: `lovable-migration/src/integrations/supabase/hooks/useThemes.tsx` → `src/integrations/supabase/hooks/useThemes.tsx`
  - Status: ⏳ Not started | ✅ Complete

- [ ] **useInitiatives.tsx** - Initiatives hooks
  - Location: `lovable-migration/src/integrations/supabase/hooks/useInitiatives.tsx` → `src/integrations/supabase/hooks/useInitiatives.tsx`
  - Status: ⏳ Not started | ✅ Complete

- [ ] **useBusinessRequests.tsx** - Business Requests hooks
  - Location: `lovable-migration/src/integrations/supabase/hooks/useBusinessRequests.tsx` → `src/integrations/supabase/hooks/useBusinessRequests.tsx`
  - Status: ⏳ Not started | ✅ Complete

- [ ] **useFeatures.tsx** - Features hooks
  - Location: `lovable-migration/src/integrations/supabase/hooks/useFeatures.tsx` → `src/integrations/supabase/hooks/useFeatures.tsx`
  - Status: ⏳ Not started | ✅ Complete

- [ ] **useEpics.tsx** - Epics hooks
  - Location: `lovable-migration/src/integrations/supabase/hooks/useEpics.tsx` → `src/integrations/supabase/hooks/useEpics.tsx`
  - Status: ⏳ Not started | ✅ Complete

- [ ] **useStories.tsx** - Stories hooks
  - Location: `lovable-migration/src/integrations/supabase/hooks/useStories.tsx` → `src/integrations/supabase/hooks/useStories.tsx`
  - Status: ⏳ Not started | ✅ Complete

---

## 🎨 Styling & Configuration

- [ ] **Tailwind Config** - Copy custom colors and theme
  - Location: `client/tailwind.config.ts` → `tailwind.config.ts`
  - Status: ⏳ Not started | ✅ Complete

- [ ] **CSS Variables** - Copy color variables
  - Location: `client/src/index.css` → `src/index.css`
  - Include: :root and .dark classes
  - Status: ⏳ Not started | ✅ Complete

---

## 🧪 Testing Checklist

After migration, test each component:

### Functional Testing

- [ ] **Portfolio Dashboard** loads with Supabase data
- [ ] **Strategic Theme Spotlight** displays correctly
- [ ] **Business Roadmap** tree view toggles
- [ ] **Business Roadmap** quarterly/monthly toggle works
- [ ] **Feature Roadmap** 8-week navigation works
- [ ] **Feature Roadmap** weekly/bi-weekly/monthly toggle works
- [ ] **Epic Roadmap** 8-week navigation works
- [ ] **Release Dashboard** expand/collapse works
- [ ] **Roadmap Guide** hierarchy displays
- [ ] **Roadmap Guide** PDF export works

### Visual Testing

- [ ] All dashboards render correctly in **light mode**
- [ ] All dashboards render correctly in **dark mode**
- [ ] Status colors match design (green/blue/red/gray)
- [ ] Circular gauges display correct percentages
- [ ] Gantt charts align properly

### Responsiveness Testing

- [ ] Mobile view (< 768px) works
- [ ] Tablet view (768px - 1024px) works
- [ ] Desktop view (> 1024px) works

### Data Testing

- [ ] Themes load from Supabase
- [ ] Initiatives load from Supabase
- [ ] Business Requests load from Supabase
- [ ] Features load from Supabase
- [ ] Epics load from Supabase
- [ ] Stories load from Supabase
- [ ] Status breakdowns calculate correctly
- [ ] Completion percentages display correctly

---

## 📊 Migration Progress

Track your overall progress:

**Components Migrated:** 0 / 13 core components  
**Hooks Created:** 0 / 6 Supabase hooks  
**Dashboards Working:** 0 / 6 dashboards  
**Tests Passing:** 0 / 10 functional tests  

---

## 🎯 Quick Tips

### Efficient Migration Order

1. ✅ Setup database first (schema + seed data)
2. ✅ Create Supabase hooks
3. ✅ Migrate one dashboard at a time (start with simplest)
4. ✅ Test each dashboard before moving to next

### Recommended Order

1. **Roadmap Guide** (simplest, no Supabase needed initially)
2. **Feature Roadmap** (simple data structure)
3. **Epic Roadmap** (similar to Feature Roadmap)
4. **Release Dashboard** (moderate complexity)
5. **Portfolio Dashboard** (complex aggregations)
6. **Business Roadmap** (most complex, hierarchical)

---

**Last Updated:** November 8, 2025
