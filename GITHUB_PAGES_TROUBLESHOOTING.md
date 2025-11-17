# GitHub Pages Troubleshooting Guide

## Current Status

✅ **Local development works correctly** - Verified with `./test-local.sh`
✅ **Production build generates correct paths** - CSS at `/dln-law-firm-website/css/styles.css`
✅ **All tests passing** - Build, links, and assets verified

## If GitHub Pages Shows Broken Styling

### Most Common Issues:

### 1. Browser Cache
**Solution:** Hard refresh the page
- **Chrome/Firefox**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- **Safari**: Cmd+Option+R
- Or open in incognito/private mode

### 2. GitHub Actions Build Failed
**Check:**
1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Look for the latest workflow run
4. If it shows ❌ (failed), click it to see the error
5. Common issue: `ELEVENTY_ENV` not set correctly

**Fix:** The workflow should have this in the build step:
```yaml
- name: Build with Eleventy
  run: npm run build
  env:
    ELEVENTY_ENV: production
```

### 3. GitHub Pages Source Not Set to GitHub Actions
**Check:**
1. Go to repository **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**, it should say **GitHub Actions** (NOT "Deploy from a branch")

**Fix:** Select "GitHub Actions" from the Source dropdown

### 4. Old Deployment Still Cached
**Solution:** Wait 2-3 minutes after Actions finishes, then hard refresh

### 5. Deployment URL Mismatch
Your site should be at: `https://krummen0644.github.io/dln-law-firm-website/`

If the repository name changed, update `.eleventy.js`:
```javascript
pathPrefix: process.env.ELEVENTY_ENV === 'production'
  ? '/NEW-REPO-NAME/'  // Change this
  : '/',
```

## Verification Steps

### 1. Test Locally (Development Mode)
```bash
npm run dev
```
Visit: http://localhost:8080
CSS should load from: `/css/styles.css`

### 2. Test Production Build
```bash
./test-local.sh
```
All tests should pass ✅

### 3. Check GitHub Actions
```bash
git push origin main
```
Then visit GitHub Actions tab and wait for ✅ green checkmark

### 4. Verify Deployed Site
Visit: https://krummen0644.github.io/dln-law-firm-website/

**Check in browser console (F12):**
- Should see NO 404 errors
- CSS should load from: `/dln-law-firm-website/css/styles.css`
- JS should load from: `/dln-law-firm-website/js/main.js`

## How the PathPrefix Works

**Development (`npm run dev`):**
- pathPrefix = `/`
- Links: `/about/`, `/css/styles.css`
- Works at: `http://localhost:8080/`

**Production (GitHub Pages):**
- pathPrefix = `/dln-law-firm-website/`
- Links: `/dln-law-firm-website/about/`, `/dln-law-firm-website/css/styles.css`
- Works at: `https://krummen0644.github.io/dln-law-firm-website/`

The `{{ '/path/' | url }}` filter automatically adds the correct prefix based on the `ELEVENTY_ENV` environment variable.

## Still Not Working?

If all else fails, check the actual deployed HTML:
1. Visit https://krummen0644.github.io/dln-law-firm-website/
2. View page source (Ctrl+U or Cmd+U)
3. Look for the `<link rel="stylesheet">` tag
4. It should be: `href="/dln-law-firm-website/css/styles.css"`
5. Click that link directly in your browser
6. You should see the CSS file content

If the CSS file itself is missing (404), that means the build didn't copy assets correctly.

## Contact

If you're still having issues after trying all of the above, the problem might be:
- GitHub Pages service outage (rare)
- Repository permissions issue
- Custom domain configuration conflict

Check GitHub status: https://www.githubstatus.com/
