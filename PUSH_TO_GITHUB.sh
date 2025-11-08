#!/bin/bash
# Script to push github-upload folder to your GitHub repository
# 
# USAGE:
# 1. Create a GitHub repo first (without initializing with README)
# 2. Replace YOUR_USERNAME and YOUR_REPO below with your actual values
# 3. Run: bash PUSH_TO_GITHUB.sh

echo "=========================================="
echo "Push Roadmap Dashboard to GitHub"
echo "=========================================="
echo ""

# STEP 1: Configure your GitHub repository URL
# Replace these values:
GITHUB_USERNAME="YOUR_USERNAME"        # Replace with your GitHub username
GITHUB_REPO="roadmap-dashboard"        # Your repo name (can change)

echo "⚠️  BEFORE RUNNING:"
echo "   1. Create GitHub repo: https://github.com/new"
echo "   2. Edit this script and replace YOUR_USERNAME with your actual GitHub username"
echo "   3. Optional: Change GITHUB_REPO if you used a different name"
echo ""
read -p "Have you done the above steps? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please complete the steps above first, then run this script again."
    exit 1
fi

if [[ "$GITHUB_USERNAME" == "YOUR_USERNAME" ]]; then
    echo "❌ Error: You need to edit this script and replace YOUR_USERNAME"
    exit 1
fi

# STEP 2: Navigate to the upload folder
echo "📁 Navigating to github-upload folder..."
cd github-upload || exit 1

# STEP 3: Check if git is initialized
if [ ! -d .git ]; then
    echo "🔧 Initializing git..."
    git init
    git add .
fi

# STEP 4: Commit files
echo "💾 Creating initial commit..."
git commit -m "Initial dashboard import - 6 specialized views with Supabase backend" 2>/dev/null || echo "Files already committed"

# STEP 5: Set main branch
echo "🌿 Setting main branch..."
git branch -M main

# STEP 6: Add remote (GitHub URL)
GITHUB_URL="https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"
echo "🔗 Adding remote: $GITHUB_URL"
git remote remove origin 2>/dev/null  # Remove if exists
git remote add origin "$GITHUB_URL"

# STEP 7: Push to GitHub
echo "🚀 Pushing to GitHub..."
echo ""
echo "⚠️  You may be prompted for GitHub credentials:"
echo "   Username: Your GitHub username"
echo "   Password: Use a Personal Access Token (NOT your password)"
echo ""
echo "   To create a token:"
echo "   1. Go to: https://github.com/settings/tokens"
echo "   2. Click 'Generate new token (classic)'"
echo "   3. Select 'repo' scope"
echo "   4. Copy the token and paste it when prompted for password"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Your dashboards are on GitHub!"
    echo ""
    echo "📍 Repository URL: https://github.com/$GITHUB_USERNAME/$GITHUB_REPO"
    echo ""
    echo "🎯 NEXT STEPS:"
    echo "   1. Visit your repository on GitHub to verify files"
    echo "   2. Follow QUICK_START.md to import into Lovable"
    echo "   3. Setup Supabase and run database migrations"
    echo ""
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "   • Wrong username/repo name"
    echo "   • Invalid credentials (use Personal Access Token for password)"
    echo "   • Repository doesn't exist on GitHub"
    echo ""
    echo "Fix the issue and run this script again."
fi
