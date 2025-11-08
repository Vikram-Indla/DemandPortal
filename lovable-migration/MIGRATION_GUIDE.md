# 🚀 Digital Services Roadmap Dashboard - Lovable Migration Guide

## 📋 Overview

This guide will help you migrate all 6 dashboard views from your Replit Express/React app to Lovable with Supabase backend.

**Migration Time Estimate:** 2-3 hours for complete migration

---

## ✅ What's Included in This Migration Package

### 📁 Files Provided

```
lovable-migration/
├── supabase/
│   └── migrations/
│       ├── 20251108000001_initial_schema.sql    # Database schema
│       └── 20251108000002_seed_data.sql         # Realistic mock data
├── src/
│   └── integrations/
│       └── supabase/
│           ├── client.ts                        # Supabase client config
│           └── hooks/
│               ├── useThemes.tsx                # Strategic Themes hooks
│               ├── useInitiatives.tsx           # Initiatives hooks
│               ├── useBusinessRequests.tsx      # Business Requests hooks
│               ├── useFeatures.tsx              # Features hooks
│               ├── useEpics.tsx                 # Epics hooks
│               └── useStories.tsx               # Stories hooks
└── MIGRATION_GUIDE.md                           # This file
```

### ✨ Features Preserved

- ✅ All 6 dashboards (Portfolio, Business Roadmap, Feature Roadmap, Epic Roadmap, Release Dashboard, Roadmap Guide)
- ✅ Strategic Theme Spotlight with status matrices
- ✅ PDF Export (Roadmap Guide)
- ✅ Dark mode support
- ✅ All filtering and search functionality
- ✅ Gantt charts and timeline views
- ✅ Mixed hierarchy (BR → Features AND/OR direct Epics)

---

## 📦 Step-by-Step Migration Process

### PHASE 1: Setup Lovable Project (15 minutes)

#### Step 1.1: Create New Lovable Project

1. Go to [lovable.dev](https://lovable.dev)
2. Click **"New Project"**
3. Name it: **"Digital Services Roadmap Dashboard"**
4. Wait for Lovable to initialize the project

#### Step 1.2: Initialize Supabase

1. In Lovable, click the **Supabase icon** in the left sidebar
2. Click **"Setup Supabase"** - Lovable will automatically create a Supabase project
3. Wait for confirmation (you'll see "Supabase Connected" ✅)

> **Note:** Lovable automatically configures environment variables for Supabase. You don't need to manually set `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY`.

---

### PHASE 2: Setup Database Schema (20 minutes)

#### Step 2.1: Access Supabase SQL Editor

1. In Lovable, click the **Supabase icon** → **"Open Supabase Dashboard"**
2. In the Supabase dashboard, navigate to **SQL Editor** (left sidebar)

#### Step 2.2: Run Initial Schema Migration

1. Click **"+ New Query"**
2. Open the file: `lovable-migration/supabase/migrations/20251108000001_initial_schema.sql`
3. **Copy the ENTIRE contents** of the file
4. **Paste into the SQL Editor**
5. Click **"Run"** button (bottom right)
6. Wait for success message: ✅ "Success. No rows returned"

**What this creates:**
- 7 tables: `strategic_themes`, `initiatives`, `business_requests`, `features`, `epics`, `stories`, `subtasks`
- Indexes for performance
- Automatic `updated_at` triggers
- Foreign key relationships

#### Step 2.3: Run Seed Data Migration

1. Click **"+ New Query"** again
2. Open the file: `lovable-migration/supabase/migrations/20251108000002_seed_data.sql`
3. **Copy the ENTIRE contents**
4. **Paste into the SQL Editor**
5. Click **"Run"**
6. Wait for success message ✅

**What this creates:**
- 5 Strategic Themes
- 5 Initiatives
- 8 Business Requests
- 10 Features
- 19 Epics
- 10 Stories (sample for Release Dashboard)
- 6 Subtasks

#### Step 2.4: Verify Data

1. In Supabase dashboard, go to **Table Editor** (left sidebar)
2. Click on `strategic_themes` table
3. You should see 5 themes: "Compliance & Security", "Customer Experience", etc.
4. Repeat for other tables to confirm data is loaded

---

### PHASE 3: Copy Dashboard Components (30-45 minutes)

#### Step 3.1: Copy Component Files

In Lovable chat, tell the AI to create these components by copying from your Replit project:

**Copy these files from `client/src/components/` to Lovable `src/components/`:**

1. **StatusDashboard.tsx** - Portfolio Dashboard
2. **StrategicThemeSpotlight.tsx** - Theme spotlight card
3. **BusinessRequestGrid.tsx** - BR grid with status breakdown
4. **CompactRiskList.tsx** - Risk list component
5. **RoadmapView.tsx** - Business Roadmap view
6. **FeatureRoadmap.tsx** - Feature Roadmap view
7. **EpicRoadmap.tsx** - Epic Roadmap view
8. **ReleaseDashboard.tsx** - Release Dashboard view
9. **HierarchyTree.tsx** - Tree view component
10. **GanttChart.tsx** - Gantt chart component
11. **FilterBar.tsx** - Filter and search bar
12. **DashboardLayout.tsx** - Main layout with tabs

**Copy these files from `client/src/pages/` to Lovable `src/pages/`:**

1. **RoadmapGuide.tsx** - Roadmap hierarchy guide with PDF export

**Example Lovable Chat Prompt:**

```
Create a new component at src/components/StatusDashboard.tsx with the following code:
[paste entire StatusDashboard.tsx contents here]
```

#### Step 3.2: Copy Shadcn UI Components

**Copy these from `client/src/components/ui/` to Lovable `src/components/ui/`:**

- card.tsx
- badge.tsx
- button.tsx
- progress.tsx
- tabs.tsx
- input.tsx
- select.tsx
- hover-card.tsx
- dialog.tsx
- toast.tsx
- toaster.tsx

> **Note:** Lovable already includes most shadcn components. You may only need to copy custom modifications.

#### Step 3.3: Copy Utility Files

**Copy from `client/src/lib/` to Lovable `src/lib/`:**

- utils.ts (cn function for className merging)

**Copy from `client/src/hooks/` to Lovable `src/hooks/`:**

- use-toast.ts (if not already in Lovable)

---

### PHASE 4: Integrate Supabase Hooks (30 minutes)

#### Step 4.1: Copy Supabase Integration Files

In Lovable chat:

```
Create the Supabase integration files at:
src/integrations/supabase/client.ts
src/integrations/supabase/hooks/useThemes.tsx
src/integrations/supabase/hooks/useInitiatives.tsx
src/integrations/supabase/hooks/useBusinessRequests.tsx
src/integrations/supabase/hooks/useFeatures.tsx
src/integrations/supabase/hooks/useEpics.tsx
src/integrations/supabase/hooks/useStories.tsx

[Paste contents from lovable-migration/src/integrations/supabase/ files]
```

#### Step 4.2: Update Dashboard Components to Use Supabase

**Replace Mock Data with Supabase Queries:**

**Example for StatusDashboard.tsx:**

```typescript
// OLD (Mock data)
import { initiativeMetricsMock, businessRequestMetricsMock } from '@/data/portfolioMetricsMock';

// NEW (Supabase)
import { useInitiatives } from '@/integrations/supabase/hooks/useInitiatives';
import { useBusinessRequests } from '@/integrations/supabase/hooks/useBusinessRequests';

export default function StatusDashboard() {
  const { data: initiatives, isLoading: initiativesLoading } = useInitiatives();
  const { data: businessRequests, isLoading: requestsLoading } = useBusinessRequests();

  if (initiativesLoading || requestsLoading) {
    return <div>Loading...</div>;
  }

  // Transform data to match existing component structure
  // ... rest of component logic
}
```

**Apply similar pattern to all dashboards:**

1. **Portfolio Dashboard** (`StatusDashboard.tsx`):
   - Use `useInitiativesByTheme()` 
   - Use `useBusinessRequestsByTheme()`

2. **Business Roadmap** (`RoadmapView.tsx`):
   - Use `useBusinessRequests()`
   - Use `useFeaturesByBusinessRequest()`
   - Use `useEpicsByBusinessRequest()`

3. **Feature Roadmap** (`FeatureRoadmap.tsx`):
   - Use `useFeatures()`

4. **Epic Roadmap** (`EpicRoadmap.tsx`):
   - Use `useEpics()`

5. **Release Dashboard** (`ReleaseDashboard.tsx`):
   - Use `useStoriesByAllReleases()`

---

### PHASE 5: Update Main App Layout (15 minutes)

#### Step 5.1: Create Main App Component

In Lovable, update `src/App.tsx`:

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import DashboardLayout from "@/components/DashboardLayout";
import StatusDashboard from "@/components/StatusDashboard";
import RoadmapView from "@/components/RoadmapView";
import FeatureRoadmap from "@/components/FeatureRoadmap";
import EpicRoadmap from "@/components/EpicRoadmap";
import ReleaseDashboard from "@/components/ReleaseDashboard";
import RoadmapGuide from "@/pages/RoadmapGuide";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DashboardLayout
          statusContent={<StatusDashboard />}
          roadmapContent={<RoadmapView />}
          featureRoadmapContent={<FeatureRoadmap />}
          epicRoadmapContent={<EpicRoadmap />}
          storyCompletionContent={<ReleaseDashboard />}
          roadmapGuideContent={<RoadmapGuide />}
        />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
```

---

### PHASE 6: Copy Styles (10 minutes)

#### Step 6.1: Copy Tailwind Configuration

Copy your Tailwind config customizations from `client/tailwind.config.ts` to Lovable's `tailwind.config.ts`.

**Important color variables from your project:**

```typescript
// Colors for status indicators, charts, etc.
colors: {
  border: "hsl(var(--border))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: "hsl(var(--primary))",
  // ... copy all custom colors
}
```

#### Step 6.2: Copy CSS Variables

Copy CSS variables from `client/src/index.css` to Lovable's `src/index.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    /* ... copy all CSS variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... copy dark mode variables */
  }
}
```

---

### PHASE 7: Test and Verify (20 minutes)

#### Step 7.1: Test Each Dashboard

1. **Portfolio Dashboard:**
   - Select different themes from dropdown
   - Verify Strategic Theme Spotlight displays correctly
   - Check Initiative Progress gauges
   - Test Business Request grid sorting and expansion

2. **Business Roadmap:**
   - Toggle tree view on/off
   - Switch between quarterly/monthly timeline
   - Test search and filtering

3. **Feature Roadmap:**
   - Navigate 8-week windows (Prev/Today/Next buttons)
   - Toggle between weekly/bi-weekly/monthly views
   - Verify hover cards show feature details

4. **Epic Roadmap:**
   - Test 8-week window navigation
   - Check status color coding
   - Verify epic details in hover cards

5. **Release Dashboard:**
   - Expand/collapse release versions
   - Check story details and subtasks
   - Verify risk list displays correctly

6. **Roadmap Guide:**
   - Test hierarchy visualization
   - Click on levels to see executive commentary modals
   - **Test PDF Export** - verify download works

#### Step 7.2: Test Dark Mode

1. Click theme toggle in header
2. Verify all dashboards render correctly in dark mode
3. Check color contrast and readability

#### Step 7.3: Test Mobile Responsiveness

1. In Lovable preview, test different screen sizes
2. Verify responsive layouts work correctly

---

## 🔧 Data Transformation Guide

### Converting Dates

Supabase stores dates as strings. Update your components to handle this:

```typescript
// OLD (Date objects)
startDate: new Date('2024-09-15')

// NEW (Supabase)
startDate: '2024-09-15'

// In components, convert when needed:
const startDate = new Date(feature.start_date);
```

### Status Mapping

Ensure status values match database constraints:

```typescript
// Valid status values:
// Strategic Themes: 'on-track' | 'in-progress' | 'at-risk'
// Initiatives: 'on-track' | 'in-progress' | 'at-risk' | 'done' | 'blocked' | 'not-started'
// Business Requests, Features, Epics: 'done' | 'in-progress' | 'blocked' | 'not-started'
// Stories: 'todo' | 'in-progress' | 'done' | 'blocked'
```

### Priority Mapping

```typescript
// Valid priority values: 'high' | 'medium' | 'low'
```

---

## 🎨 Styling Notes

### Dark Mode

Your components already support dark mode via Tailwind's `dark:` prefix. Lovable preserves this.

### Custom Colors

Ensure all chart colors reference CSS variables:

```typescript
// ✅ GOOD
color: 'hsl(var(--chart-2))'

// ❌ BAD
color: '#10b981'
```

---

## 📝 Component Checklist

Use this checklist to track migration progress:

### Core Layout
- [ ] DashboardLayout.tsx
- [ ] App.tsx updated

### Portfolio Dashboard
- [ ] StatusDashboard.tsx
- [ ] StrategicThemeSpotlight.tsx
- [ ] BusinessRequestGrid.tsx
- [ ] CompactRiskList.tsx

### Business Roadmap
- [ ] RoadmapView.tsx
- [ ] HierarchyTree.tsx
- [ ] GanttChart.tsx
- [ ] FilterBar.tsx

### Feature Roadmap
- [ ] FeatureRoadmap.tsx

### Epic Roadmap
- [ ] EpicRoadmap.tsx

### Release Dashboard
- [ ] ReleaseDashboard.tsx

### Roadmap Guide
- [ ] RoadmapGuide.tsx

### Supabase Integration
- [ ] client.ts
- [ ] useThemes.tsx
- [ ] useInitiatives.tsx
- [ ] useBusinessRequests.tsx
- [ ] useFeatures.tsx
- [ ] useEpics.tsx
- [ ] useStories.tsx

### UI Components (shadcn)
- [ ] card.tsx
- [ ] badge.tsx
- [ ] button.tsx
- [ ] progress.tsx
- [ ] tabs.tsx
- [ ] input.tsx
- [ ] select.tsx
- [ ] hover-card.tsx
- [ ] dialog.tsx
- [ ] toast.tsx

### Utilities
- [ ] utils.ts (cn function)
- [ ] use-toast.ts

### Styles
- [ ] Tailwind config updated
- [ ] CSS variables copied
- [ ] Dark mode tested

### Testing
- [ ] Portfolio Dashboard working
- [ ] Business Roadmap working
- [ ] Feature Roadmap working
- [ ] Epic Roadmap working
- [ ] Release Dashboard working
- [ ] Roadmap Guide working
- [ ] PDF Export working
- [ ] Dark mode working
- [ ] Mobile responsive

---

## 🚨 Common Issues & Solutions

### Issue 1: "Cannot find module '@/components/...'"

**Solution:** Lovable uses the `@/` alias for `src/`. Ensure all imports use this pattern:

```typescript
// ✅ GOOD
import { Card } from '@/components/ui/card';

// ❌ BAD
import { Card } from '../components/ui/card';
```

### Issue 2: Type errors with Supabase data

**Solution:** Lovable auto-generates TypeScript types. If you see type errors:

1. In Lovable, the types are auto-generated in `src/integrations/supabase/types.ts`
2. Import the `Database` type if needed

### Issue 3: PDF export not working

**Solution:** Install html2pdf.js:

In Lovable chat:
```
Install the html2pdf.js package for PDF export functionality
```

### Issue 4: Dark mode colors not working

**Solution:** Ensure CSS variables are properly defined in `src/index.css` for both `:root` and `.dark` classes.

### Issue 5: Gantt chart date calculations off

**Solution:** Verify date parsing when converting from Supabase string dates to Date objects:

```typescript
const startDate = new Date(feature.start_date);
const endDate = new Date(feature.end_date);
```

---

## 💡 Pro Tips

### Tip 1: Use Lovable AI for Updates

After copying components, use Lovable's AI to make adjustments:

```
Update StatusDashboard.tsx to use the Supabase useInitiatives hook instead of mock data
```

### Tip 2: Batch Component Creation

Create multiple components in one chat:

```
Create the following components:
1. StatusDashboard.tsx with code: [paste code]
2. StrategicThemeSpotlight.tsx with code: [paste code]
3. BusinessRequestGrid.tsx with code: [paste code]
```

### Tip 3: Test Incrementally

Don't copy everything at once. Test each dashboard as you go:

1. Copy Portfolio Dashboard → Test → Fix issues
2. Copy Business Roadmap → Test → Fix issues
3. Continue for each dashboard

### Tip 4: Use Lovable Preview

Lovable provides real-time preview. Watch for errors in the browser console (right-click → Inspect → Console).

---

## 🎯 Success Criteria

Your migration is complete when:

- ✅ All 6 dashboards display correctly
- ✅ Data loads from Supabase (not mock data)
- ✅ Strategic Theme Spotlight shows status matrices
- ✅ PDF export works in Roadmap Guide
- ✅ Dark mode toggle works
- ✅ All filtering and search works
- ✅ Timeline navigation works (8-week windows)
- ✅ No console errors
- ✅ Mobile responsive layout works

---

## 📚 Additional Resources

- **Lovable Docs:** https://docs.lovable.dev
- **Supabase Docs:** https://supabase.com/docs
- **TanStack Query:** https://tanstack.com/query
- **Shadcn UI:** https://ui.shadcn.com

---

## 🆘 Need Help?

If you encounter issues during migration:

1. **Check Lovable Logs:** Look at browser console for errors
2. **Verify Supabase Connection:** Check if data queries return results
3. **Ask Lovable AI:** Use chat to debug specific issues
4. **Check SQL Editor:** Verify database has data

---

## 🎉 What's Next?

After successful migration to Lovable:

1. **Connect to Jira:** Replace mock data with real Jira API integration
2. **Add User Authentication:** Use Supabase Auth if needed
3. **Deploy:** Use Lovable's built-in deployment (one-click!)
4. **Custom Domain:** Configure your own domain in Lovable settings

---

**Estimated Total Time:** 2-3 hours
**Difficulty Level:** Intermediate
**Prerequisites:** Basic understanding of React, TypeScript, and SQL

Good luck with your migration! 🚀
