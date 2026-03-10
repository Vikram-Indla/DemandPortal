# Test Coverage Analysis

## Current State: Zero Test Coverage

The codebase has **no test files, no testing framework configured, and no CI/CD pipeline running tests**. There are 87+ TypeScript source files across client, server, and shared modules — all completely untested.

The `tsconfig.json` excludes `**/*.test.ts` files (suggesting intent to add tests), but no test infrastructure has been set up yet.

---

## Recommended Testing Framework Setup

Since the project uses Vite + React + TypeScript, the natural choice is:

| Layer | Tool | Purpose |
|-------|------|---------|
| Unit/Component | **Vitest** + **React Testing Library** | Fast, Vite-native test runner with JSX support |
| Server | **Vitest** + **supertest** | Express route and middleware testing |
| E2E (later) | **Playwright** | Full browser-based testing |

---

## Priority Areas for Test Coverage

### Tier 1 — Critical Business Logic (highest impact, start here)

1. **`GanttChart.tsx`** — Contains 90+ lines of date math for timeline calculations, quarterly/monthly alignment, and item positioning. Date logic is notoriously bug-prone and should be extracted into pure utility functions and unit tested thoroughly.

2. **`HierarchyTree.tsx`** — Recursive tree rendering with expand/collapse state management across 4 hierarchy levels (business-request → feature → epic → story). Edge cases around deep nesting and empty nodes need coverage.

3. **`FeatureRoadmap.tsx` / `EpicRoadmap.tsx`** — Both contain rolling-window timeline navigation with 3 view modes (weekly, bi-weekly, monthly) and Monday-aligned date calculations. The date math and window boundary logic are prime candidates for unit tests.

4. **`BusinessRequestGrid.tsx`** — Sorting (3 fields), search filtering, row expansion, and pagination logic. Incorrect sorting or filtering directly impacts user experience.

5. **`server/storage.ts`** — The `IStorage` interface and `MemStorage` implementation. Testing the CRUD operations (`getUser`, `getUserByUsername`, `createUser`) now will establish patterns for when you swap to a real database.

### Tier 2 — Important Integration Points

6. **`StatusDashboard.tsx`** — Metric aggregation across initiatives and business requests with `CircularGauge` and `ItemBreakdown` calculations.

7. **`ReleaseDashboard.tsx`** — Story grouping by release version, subtask expansion, and risk detection via `CompactRiskList`.

8. **`lib/queryClient.ts`** — The `apiRequest()` wrapper and `getQueryFn()` factory handle auth (401 detection), error formatting, and credential management.

9. **`hooks/use-toast.ts`** — A reducer-based state machine with queue management (`TOAST_LIMIT = 1`), timeouts, and listener patterns.

10. **`RoadmapView.tsx`** — Integration component coordinating `HierarchyTree` + `GanttChart` with panel collapse/expand and filter state.

### Tier 3 — Lower Priority (cover last)

11. **UI library components** (`components/ui/`) — 47 shadcn/ui wrappers. Snapshot tests only; these are well-tested upstream.

12. **Mock data files** (`data/`) — Type-level validation to ensure mock data conforms to interfaces.

13. **`lib/utils.ts`** — The `cn()` utility is trivial but easy to test as a starting exercise.

14. **Pages** (`Dashboard.tsx`, `RoadmapGuide.tsx`) — Smoke/integration tests to verify they render without crashing.

---

## Specific Recommendations

### Extract pure logic from components

Several components (especially `GanttChart`, `FeatureRoadmap`, `EpicRoadmap`) mix date calculations with rendering. Extract functions like `calculateTimelinePosition()`, `alignToMonday()`, `getQuarterBoundaries()` into a `lib/timeline-utils.ts` and test them independently.

### Test the server layer before it grows

Right now `routes.ts` is a stub and `storage.ts` is in-memory. Writing tests now establishes patterns and catches regressions as you add real database integration and API routes.

### Validate mock data structure

The 5 mock data files (1,700+ lines) define the implicit contract for your data layer. Write tests that validate these objects match your TypeScript interfaces — this protects you when interfaces evolve.

### Add test scripts to `package.json`

Currently the scripts are `dev`, `build`, `start`, `check`, and `db:push`. Add:

```json
{
  "test": "vitest",
  "test:coverage": "vitest --coverage"
}
```

### Set up CI

There is no `.github/workflows/` directory. A basic CI pipeline that runs `npm test` on PRs would prevent regressions from landing.

---

## File Inventory Summary

| Area | Files | Current Tests | Priority |
|------|-------|---------------|----------|
| Business components | 13 | 0 | Tier 1-2 |
| Server code | 4 | 0 | Tier 1 |
| Shared schemas | 1 | 0 | Tier 1 |
| Custom hooks | 2 | 0 | Tier 2 |
| Utility libraries | 2 | 0 | Tier 2-3 |
| UI library components | 47 | 0 | Tier 3 |
| Mock data files | 5 | 0 | Tier 3 |
| Pages | 3 | 0 | Tier 3 |
| **Total** | **77+** | **0** | — |
