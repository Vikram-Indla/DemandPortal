# ⚡ Quick Start - 5 Steps to Import

Get your dashboards running in Lovable in under 30 minutes!

---

## 📋 What You'll Do

1. Upload to GitHub (5 min)
2. Create Lovable project (3 min)
3. Import files via Git (10 min)
4. Setup database (10 min)
5. Test dashboards (5 min)

---

## 🚀 Step 1: Upload to GitHub

### Option A: Web Upload (No Git Required)

1. Go to https://github.com/new
2. Name: `roadmap-dashboard`
3. Click "Create repository"
4. Click "uploading an existing file"
5. **Drag ALL files** from `github-upload/` folder
6. Click "Commit changes"

### Option B: Git Command Line

```bash
cd github-upload
git init
git add .
git commit -m "Initial dashboard import"
git remote add origin https://github.com/YOUR_USERNAME/roadmap-dashboard.git
git push -u origin main
```

✅ **Done:** Your dashboard code is on GitHub!

---

## 🎨 Step 2: Create Lovable Project

1. Go to https://lovable.dev
2. Click "New Project"
3. Name: "Roadmap Dashboard"
4. Click GitHub icon → "Connect to GitHub"
5. Authorize Lovable

✅ **Done:** Lovable connected to GitHub!

---

## 🔄 Step 3: Import Your Code

### Get Lovable's Repo URL
1. In Lovable, click GitHub icon
2. Click "View Repository"
3. Copy the URL (e.g., `https://github.com/YOU/lovable-xxx.git`)

### Clone and Import

```bash
# Clone Lovable's repo
git clone https://github.com/YOU/lovable-xxx.git
cd lovable-xxx

# Copy your dashboard files
cp -r /path/to/roadmap-dashboard/* .

# Push to Lovable
git add .
git commit -m "Import dashboards"
git push origin main
```

✅ **Done:** Files sync to Lovable in 5-10 seconds!

---

## 🗄️ Step 4: Setup Database

### Connect Supabase
1. In Lovable, click **Supabase icon**
2. Click "Setup Supabase"
3. Wait for "Connected ✅"

### Run Migrations

1. Click "Open Supabase Dashboard"
2. Click "SQL Editor"
3. Click "+ New query"

**Migration 1: Schema**
- Open: `supabase/migrations/20251108000001_initial_schema.sql`
- Copy ALL contents
- Paste in SQL Editor
- Click "Run"

**Migration 2: Seed Data**
- Click "+ New query" again
- Open: `supabase/migrations/20251108000002_seed_data.sql`
- Copy ALL contents
- Paste in SQL Editor
- Click "Run"

✅ **Done:** Database ready with mock data!

---

## 🧪 Step 5: Test Dashboards

### View in Browser
1. In Lovable, click "Preview"
2. Navigate to your dashboard route

### Test All 6 Views

Navigate to the main dashboard and test each tab:

1. **Portfolio** - Initiative cards + Theme Spotlight
2. **Business Roadmap** - Gantt timeline
3. **Feature Roadmap** - 8-week view
4. **Epic Roadmap** - 8-week view
5. **Release Dashboard** - Stories by version
6. **Roadmap Guide** - Hierarchy + PDF export

✅ **Success!** All dashboards working!

---

## 🎯 Integration into Your Portal

If you have an existing Lovable portal, add routes:

```tsx
// In your App.tsx or router file
import Dashboard from './pages/Dashboard';
import RoadmapGuide from './pages/RoadmapGuide';

// Add routes
<Route path="/portfolio" component={Dashboard} />
<Route path="/roadmap-guide" component={RoadmapGuide} />
```

Add navigation:

```tsx
// In your sidebar/nav
<Link href="/portfolio">Portfolio Dashboard</Link>
<Link href="/roadmap-guide">Roadmap Guide</Link>
```

---

## 🐛 Troubleshooting

**Issue: Files not syncing to Lovable**
- Wait 10 seconds, then refresh
- Check GitHub repo has all files
- Verify git push succeeded

**Issue: Database errors**
- Re-run migrations in Supabase SQL Editor
- Check Supabase connection in Lovable
- Verify both migration files ran

**Issue: Components not found**
- Run `npm install` in Lovable terminal
- Check all files copied correctly
- Verify import paths

**Issue: No data showing**
- Verify seed data migration ran
- Check Supabase Table Editor for data
- Check browser console for errors

---

## 📚 Full Documentation

For detailed instructions, see:
- **SETUP_GUIDE.md** - Complete step-by-step walkthrough
- **README.md** - Package overview and features

---

## ✅ Checklist

- [ ] Uploaded to GitHub
- [ ] Created Lovable project
- [ ] Connected GitHub to Lovable
- [ ] Cloned Lovable repo locally
- [ ] Copied dashboard files
- [ ] Pushed to trigger sync
- [ ] Setup Supabase in Lovable
- [ ] Ran schema migration
- [ ] Ran seed data migration
- [ ] Tested all 6 dashboards
- [ ] Integrated into portal (if needed)

---

**Total Time:** ~30 minutes

**Next:** See SETUP_GUIDE.md for detailed configuration options!
