# Deploy to GitHub Pages - Step by Step Guide

## ⚠️ Important Note About API Keys

This app uses the Google Gemini API which requires an API key. **GitHub Pages only serves static files**, so the API key must be configured as a GitHub Secret for the build process.

---

## Step-by-Step Instructions

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** button (top right) → **New repository**
3. Name it exactly: `hazemgen` (must match the `base` path in `vite.config.ts`)
4. Choose **Public** (required for free GitHub Pages)
5. Click **Create repository**

---

### Step 2: Push Your Code to GitHub

Open terminal in your project folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hazemgen.git
git push -u origin main
```

---

### Step 3: Add Your API Key as a GitHub Secret

1. On your GitHub repo page, click **Settings** tab
2. In the left sidebar, click **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GEMINI_API_KEY`
5. Value: Paste your Google Gemini API key
6. Click **Add secret**

---

### Step 4: Enable GitHub Pages

1. Go to **Settings** → **Pages** (in the left sidebar)
2. Under **Source**, select **GitHub Actions**
3. This will use the workflow file already created (`.github/workflows/deploy.yml`)

---

### Step 5: Trigger Deployment

The deployment happens automatically when you push to `main`. To trigger manually:

1. Go to **Actions** tab in your repo
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

---

### Step 6: Access Your Live Site

After deployment (takes ~2-3 minutes), your site will be at:

```
https://YOUR_USERNAME.github.io/hazemgen/
```

You can find the exact URL in:
- **Settings** → **Pages** → **Visit site**
- Or in the **Actions** tab when the workflow completes

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Site shows 404 | Check that repo name matches `base` in `vite.config.ts` |
| API not working | Verify `GEMINI_API_KEY` secret is set correctly |
| Build fails | Check **Actions** tab for error logs |
| Assets not loading | Make sure `base: '/hazemgen/'` is set in vite.config.ts |

---

## Custom Domain (Optional)

To use your own domain instead of `github.io`:

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Add a `CNAME` file to your repo with your domain name
4. Configure DNS with your domain provider (add CNAME pointing to `YOUR_USERNAME.github.io`)

---

## Files Modified for Deployment

- `vite.config.ts` - Added `base: '/hazemgen/'` for correct asset paths
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
