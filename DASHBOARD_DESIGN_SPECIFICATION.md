# Portfolio Dashboard Design Specification
## Three-Tiered Visual Hierarchy for Role-Based Access

---

## 🎨 Design Philosophy

Each dashboard level represents a different organizational perspective:
- **Features** = Strategic/Executive View
- **Epics** = Program/Portfolio Management View  
- **Stories** = Team/Tactical View

### Visual Language Progression
```
STRATEGIC ────────► TACTICAL
Spacious          Dense
Cards             Tables
Timelines         Lists
Bold              Compact
```

---

## 1️⃣ Feature Roadmap (Strategic Level)

### **Visual Identity: Expansive & Executive**

#### Color Palette
- **Primary**: Full brand colors with rich saturations
- **Accents**: Bold status indicators (green-500, blue-500, red-500)
- **Border**: 4px colored left border for priority coding

#### Typography
- **Titles**: text-xl font-bold (20px)
- **Body**: text-sm (14px) 
- **Metrics**: text-2xl font-bold (24px)
- **Icon Size**: w-6 h-6 (24px)

#### Layout & Spacing
- **Card-based**: Full-width cards with generous padding
- **Spacing**: space-y-8 (32px) between features
- **Content**: CardHeader + CardContent pattern
- **Height**: Auto-height with breathing room

#### Components
- **Timeline**: Visual milestone-based timeline with colored bars
- **Progress**: Dual indicators (visual timeline bar + progress bar)
- **Metrics Row**: Horizontal layout with icons, dates, owner, epic count
- **Status Badge**: Large badges with icons (px-3 py-1)

#### Unique Elements
- Target icon (w-6 h-6) as feature identifier
- Visual timeline overlay on month grid
- Description field for strategic context
- Owner attribution
- Epic completion tracking

---

## 2️⃣ Epic Roadmap (Program Level)

### **Visual Identity: Balanced & Professional**

#### Color Palette
- **Primary**: Subtle tinted backgrounds (100/950 shades)
- **Accents**: Medium saturation (green-500, amber-500)
- **Border**: 2px colored borders for status

#### Typography  
- **Titles**: text-sm font-medium (14px)
- **Body**: text-xs (12px)
- **Metrics**: text-sm font-bold (14px)  
- **Icon Size**: w-3.5 h-3.5 (14px)

#### Layout & Spacing
- **Gantt Chart**: Row-based timeline with sticky header
- **Row Height**: h-20 (80px) for comfortable scanning
- **Spacing**: Compact vertical spacing
- **Columns**: Fixed title column + flexible timeline

#### Components
- **Gantt Bars**: Rounded colored bars with completion overlay
- **Hierarchy**: Left panel tree navigation (optional)
- **Dates**: Positioned at bar edges (start/end)
- **Progress**: Transparent percentage overlay on bars
- **Hover Cards**: Portal-rendered detail cards

#### Unique Elements
- Priority icons at bar edges
- Health dots for quick status scanning
- Collapsible hierarchy tree
- Filter bar for advanced searching
- Timeline grid with month columns

---

## 3️⃣ Story Completion Dashboard (Tactical Level)

### **Visual Identity: Dense & Functional**

#### Color Palette
- **Primary**: Functional status colors (slate, blue, green, red)
- **Accents**: Minimal - only for status/priority indicators
- **Border**: 2px grouped card borders

#### Typography
- **Titles**: text-lg font-bold (18px) for version headers
- **Body**: text-sm (14px) for story summaries
- **Keys**: text-xs font-mono (12px) for JIRA keys
- **Metrics**: text-2xl font-bold (24px) for version metrics
- **Icon Size**: w-4 h-4 (16px)

#### Layout & Spacing
- **Table-based**: Sortable data table within version groups
- **Row Height**: Compact (default table row height)
- **Grouping**: Fix Version cards containing story tables
- **Zebra Striping**: Alternating row backgrounds

#### Components
- **Version Cards**: Card per fix version with header metrics
- **Story Table**: 7-column sortable table
- **Status Icons**: Small circle/check icons
- **Priority Badges**: Compact outline badges
- **Search**: Global search across all fields

#### Unique Elements
- Package icon for fix versions
- Mono-spaced font for JIRA keys  
- Story point tracking
- Epic name in table
- Assignee field
- Multi-field sorting
- Point-based completion metrics

---

## 🎯 Comparative Matrix

| Aspect | Feature Roadmap | Epic Roadmap | Story Dashboard |
|--------|----------------|--------------|-----------------|
| **Layout** | Cards (vertical) | Gantt (horizontal) | Tables (grouped) |
| **Density** | Low (spacious) | Medium | High (compact) |
| **Key Metric** | Timeline position | Completion % | Fix version % |
| **Primary View** | Timeline | Gantt bars | Data grid |
| **Icon Size** | Large (24px) | Medium (14px) | Small (16px) |
| **Spacing** | 32px | 20px | Minimal |
| **Border** | 4px accent | 2px colored | 2px grouped |
| **Typography** | Bold, large | Balanced | Compact |
| **Search** | Theme filter | Multi-filter bar | Global search |
| **Details** | In card | Hover card | Inline table |
| **Sorting** | Manual | Timeline order | Multi-column |

---

## 🔐 Role-Based Access (Future Implementation)

### Access Levels
```typescript
enum Role {
  EXECUTIVE    // Feature Roadmap only
  PM           // Feature + Epic Roadmaps
  TEAM_LEAD    // Epic + Story Dashboards  
  DEVELOPER    // Story Dashboard only
  ADMIN        // All dashboards
}
```

### Permission Matrix
| Dashboard | Executive | PM | Team Lead | Developer | Admin |
|-----------|-----------|-----|-----------|-----------|-------|
| Feature Roadmap | ✓ | ✓ | ✗ | ✗ | ✓ |
| Epic Roadmap | ✗ | ✓ | ✓ | ✗ | ✓ |
| Story Dashboard | ✗ | ✗ | ✓ | ✓ | ✓ |

---

## 🎨 Aesthetic Differentiators Summary

### Feature Roadmap (Strategic)
✨ **Adjectives**: Expansive, Executive, High-level
- Large cards with generous whitespace
- Bold typography and large icons
- Timeline-centric visualization
- Strategic context (descriptions, owners)
- Month-level granularity

### Epic Roadmap (Program)
🎯 **Adjectives**: Balanced, Professional, Structured  
- Gantt chart with hierarchy
- Medium density with clear grouping
- Date-range focus
- Filterable and searchable
- Week/day-level granularity

### Story Completion (Tactical)
⚡ **Adjectives**: Dense, Functional, Detailed
- Tabular data presentation
- High information density
- Fix version grouping
- Sortable by multiple dimensions
- Task-level granularity

---

## 🚀 Implementation Notes

1. **Consistency**: All three share the same color tokens from design_guidelines.md
2. **Responsiveness**: Each adapts differently:
   - Features: Stack cards on mobile
   - Epics: Horizontal scroll on tablet
   - Stories: Collapse to cards on mobile
3. **Accessibility**: All maintain WCAG AA contrast ratios
4. **Performance**: Story dashboard ready for virtualization at 100+ items
5. **Icons**: All use lucide-react for consistency

---

## 📐 Design Tokens Used

```typescript
// Spacing Scale (consistent across all)
spacing: {
  feature: 'space-y-8',  // 32px
  epic: 'space-y-6',     // 24px  
  story: 'space-y-6'     // 24px
}

// Typography Scale
typography: {
  feature: { title: 'text-xl', body: 'text-sm', metric: 'text-2xl' },
  epic: { title: 'text-sm', body: 'text-xs', metric: 'text-sm' },
  story: { title: 'text-lg', body: 'text-sm', metric: 'text-2xl' }
}

// Icon Sizes
iconSize: {
  feature: 'w-6 h-6',   // 24px
  epic: 'w-3.5 h-3.5',  // 14px
  story: 'w-4 h-4'      // 16px
}
```

---

This specification ensures each dashboard has a distinct visual identity while maintaining overall design system cohesion.
