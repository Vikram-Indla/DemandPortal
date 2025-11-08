# 🎯 Complete Lovable Setup Guide

Step-by-step guide to import your Digital Services Roadmap Dashboard into Lovable.

---

## 📋 Prerequisites

- ✅ GitHub account
- ✅ Lovable account (lovable.dev)
- ✅ All files from this package uploaded to GitHub repository

---

## 🚀 PHASE 1: GitHub Setup (5 minutes)

### Step 1.1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `roadmap-dashboard` (or your choice)
3. Visibility: **Public** or **Private** (both work)
4. **DO NOT** check "Initialize with README"
5. Click **"Create repository"**

### Step 1.2: Upload Files to GitHub

**Method A: Web Upload (Easiest)**
1. Click "uploading an existing file" link in your new repo
2. Drag ALL files/folders from `github-upload/` directory
3. Commit message: "Initial dashboard import"
4. Click "Commit changes"

**Method B: Git CLI**
```bash
cd github-upload
git init
git add .
git commit -m "Initial dashboard import"
git remote add origin https://github.com/YOUR_USERNAME/roadmap-dashboard.git
git branch -M main
git push -u origin main
```

✅ **Checkpoint:** Verify all files are visible in your GitHub repo

---

## 🎨 PHASE 2: Lovable Project Setup (10 minutes)

### Step 2.1: Create Lovable Project

1. Go to https://lovable.dev
2. Click **"New Project"**
3. Name: **"Digital Services Roadmap Dashboard"**
4. Click **"Create"**

### Step 2.2: Connect GitHub to Lovable

1. In Lovable editor, click **GitHub icon** (left sidebar)
2. Click **"Connect to GitHub"**
3. Authorize Lovable to access your GitHub account
4. Lovable creates a new repository automatically

✅ **Checkpoint:** You should see "Connected to GitHub ✅"

### Step 2.3: Get Your Lovable Repo URL

1. In Lovable, click **GitHub icon**
2. Click **"View Repository"** - opens in new tab
3. Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/lovable-repo-name.git`)

---

## 🔄 PHASE 3: Import Your Dashboards (15 minutes)

### Step 3.1: Clone Lovable Repository Locally

```bash
# Clone the Lovable-connected repo
git clone https://github.com/YOUR_USERNAME/lovable-repo-name.git
cd lovable-repo-name
```

### Step 3.2: Copy Dashboard Files

**Option A: If you have your GitHub repo cloned locally**
```bash
# Copy all files from your dashboard repo to Lovable repo
cp -r /path/to/roadmap-dashboard/* .
```

**Option B: Download from GitHub and copy**
1. Go to your `roadmap-dashboard` repo on GitHub
2. Click **"Code"** → **"Download ZIP"**
3. Extract the ZIP
4. Copy all files to your Lovable repo folder

### Step 3.3: Commit and Push

```bash
# In your Lovable repo folder
git add .
git commit -m "Import roadmap dashboards"
git push origin main
```

### Step 3.4: Verify Sync in Lovable

1. Go back to your Lovable project
2. Wait 5-10 seconds for auto-sync
3. You should see all files appear in the file tree

✅ **Checkpoint:** All files visible in Lovable editor

---

## 🗄️ PHASE 4: Database Setup (15 minutes)

### Step 4.1: Setup Supabase in Lovable

1. In Lovable, click **Supabase icon** (left sidebar)
2. Click **"Setup Supabase"**
3. Lovable auto-creates and connects Supabase project
4. Wait for "Supabase Connected ✅"

### Step 4.2: Run Schema Migration

1. Click **Supabase icon** → **"Open Supabase Dashboard"**
2. In Supabase dashboard, click **"SQL Editor"** (left sidebar)
3. Click **"+ New query"**
4. Open file: `supabase/migrations/20251108000001_initial_schema.sql`
5. **Copy ALL contents** of that file
6. **Paste** into Supabase SQL Editor
7. Click **"Run"** (bottom right)
8. ✅ Success message: "Success. No rows returned"

### Step 4.3: Run Seed Data Migration

1. Still in Supabase SQL Editor
2. Click **"+ New query"** (create another query)
3. Open file: `supabase/migrations/20251108000002_seed_data.sql`
4. **Copy ALL contents**
5. **Paste** into SQL Editor
6. Click **"Run"**
7. ✅ Success message showing rows inserted

✅ **Checkpoint:** Database has 7 tables with mock data

---

## 📦 PHASE 5: Install Dependencies (Auto)

Lovable should auto-install dependencies. If not:

1. In Lovable, open terminal
2. Run: `npm install`

**Required packages** (from package.json):
- @supabase/supabase-js
- @tanstack/react-query
- date-fns
- html2pdf.js
- lucide-react
- tailwindcss
- And all UI component libraries

---

## 🔌 PHASE 6: Configure Routing (10 minutes)

### Step 6.1: Update App.tsx (if needed)

Lovable projects use different routing. You may need to integrate the dashboard pages into your portal.

**Example integration:**

```tsx
// In your main App.tsx or routes file
import Dashboard from './pages/Dashboard';
import RoadmapGuide from './pages/RoadmapGuide';

// Add routes
<Route path="/portfolio" component={Dashboard} />
<Route path="/roadmap-guide" component={RoadmapGuide} />
```

### Step 6.2: Add Navigation Links

Add dashboard links to your portal navigation:

```tsx
// In your sidebar or nav component
<Link href="/portfolio">Portfolio Dashboard</Link>
<Link href="/roadmap-guide">Roadmap Guide</Link>
```

---

## 🎨 PHASE 7: Verify Environment Variables

Lovable auto-configures Supabase environment variables. Verify:

1. In Lovable, click **Settings** (gear icon)
2. Check **Environment Variables**
3. Should see:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

✅ These are auto-populated by Lovable

---

## 🧪 PHASE 8: Test Dashboards (15 minutes)

### Step 8.1: Preview Application

1. In Lovable, click **"Preview"** button (top right)
2. Navigate to `/portfolio` route

### Step 8.2: Verify Each Dashboard

Test all 6 views:

**Portfolio Dashboard** (`/portfolio`)
- ✅ Initiative progress cards visible
- ✅ Strategic Theme Spotlight shows gauges
- ✅ Business Request grid displays
- ✅ Status breakdowns correct

**Business Roadmap** (tab in Portfolio)
- ✅ Gantt chart renders
- ✅ Timeline shows correct dates
- ✅ Navigation controls work

**Feature Roadmap** (tab in Portfolio)
- ✅ 8-week timeline displays
- ✅ Features render with correct dates
- ✅ Prev/Next/Today buttons work

**Epic Roadmap** (tab in Portfolio)
- ✅ 8-week timeline displays
- ✅ Epics render correctly
- ✅ Status colors correct

**Release Dashboard** (tab in Portfolio)
- ✅ Stories grouped by fix_version
- ✅ Status counts correct
- ✅ Epic grouping works

**Roadmap Guide** (`/roadmap-guide`)
- ✅ Hierarchy tree displays
- ✅ All 7 levels visible
- ✅ PDF export button works
- ✅ Export generates PDF

---

## 🐛 Troubleshooting

### Issue: Database tables not found

**Solution:**
1. Verify Supabase connected in Lovable
2. Re-run schema migration SQL
3. Check Supabase dashboard → Table Editor

### Issue: No data showing

**Solution:**
1. Re-run seed data migration
2. Verify data in Supabase Table Editor
3. Check browser console for errors

### Issue: Supabase hooks not found

**Solution:**
1. Verify files in `src/integrations/supabase/hooks/`
2. Check import paths in components
3. Ensure Supabase client configured

### Issue: Routing doesn't work

**Solution:**
1. Update routing configuration in App.tsx
2. Use Lovable's routing system (wouter or react-router)
3. Add navigation links

### Issue: Styles look wrong

**Solution:**
1. Verify Tailwind CSS installed
2. Check tailwind.config.js exists
3. Ensure shadcn/ui components available

### Issue: PDF export fails

**Solution:**
1. Verify `html2pdf.js` installed
2. Check browser console for errors
3. Test in different browser

---

## 📊 Data Structure Reference

### Hierarchy Levels (7 total)

```
Strategic Theme (strategic_themes)
  └─ Initiative (initiatives)
      └─ Business Request (business_requests)
          ├─ Feature (features)
          │   └─ Epic (epics)
          │       └─ Story (stories)
          │           └─ Subtask (subtasks)
          └─ Epic (epics) ← Direct path
              └─ Story (stories)
                  └─ Subtask (subtasks)
```

### Status Values

- Strategic Themes: `on-track` | `in-progress` | `at-risk`
- Initiatives: `on-track` | `in-progress` | `at-risk` | `done` | `blocked` | `not-started`
- Business Requests: `done` | `in-progress` | `blocked` | `not-started`
- Features/Epics: `done` | `in-progress` | `blocked` | `not-started`
- Stories/Subtasks: `todo` | `in-progress` | `done` | `blocked`

---

## ✅ Final Checklist

Before going live:

- [ ] All 6 dashboards render correctly
- [ ] Database has mock data
- [ ] Navigation works between views
- [ ] Filtering functionality works
- [ ] PDF export works in Roadmap Guide
- [ ] Dark mode toggle works
- [ ] Timeline navigation (prev/next/today) works
- [ ] Status badges display correctly
- [ ] Circular gauges render in Theme Spotlight
- [ ] No console errors

---

## 🎉 Success!

Your Digital Services Roadmap Dashboard is now running in Lovable!

### Next Steps:

1. **Customize data:** Replace mock data with real project data
2. **Add authentication:** Implement user auth if needed
3. **Deploy:** Use Lovable's deployment features
4. **Integrate:** Connect to Jira or other systems
5. **Extend:** Add more dashboard views as needed

---

## 📞 Support

- **Lovable Docs:** https://docs.lovable.dev
- **Supabase Docs:** https://supabase.com/docs
- **TanStack Query:** https://tanstack.com/query/latest

---

**Estimated Total Setup Time:** 60-90 minutes

**Difficulty Level:** Intermediate

**Prerequisites Knowledge:** Basic React, Git, SQL
