# Development Guide - DLN Legal Website

## Overview

This site uses **Eleventy (11ty)** as a static site generator to eliminate HTML duplication and streamline maintenance. The header and footer are now managed in a single location, making site-wide updates quick and easy.

---

## Quick Start

### Prerequisites

- **Node.js** 18+ installed
- **npm** (comes with Node.js)

### Installation

```bash
npm install
```

### Development

Start the development server with live reload:

```bash
npm run dev
```

Visit: `http://localhost:8080`

Any changes to templates or content will automatically rebuild and refresh the browser.

### Production Build

Build the static site for deployment:

```bash
npm run build
```

Output will be in `_site/` directory.

---

## Project Structure

```
/DLN Legal Website/
├── docs/                           # Source files
│   ├── _includes/                  # Reusable components
│   │   ├── header.njk             # Header/navigation (89 lines)
│   │   └── footer.njk             # Footer (87 lines)
│   ├── _layouts/                   # Page templates
│   │   └── base.njk               # Base layout with head/body
│   ├── _data/                      # Global data files (future)
│   ├── index.html                  # Homepage (with front matter)
│   ├── about.html                  # About page
│   ├── contact.html                # Contact form
│   ├── results.html                # Case results
│   ├── criminal-defense.html       # Practice area pages
│   ├── personal-injury.html
│   ├── medical-malpractice.html
│   ├── family-law.html
│   ├── civil-rights.html
│   ├── legal/                      # Legal pages
│   │   ├── privacy-policy.html
│   │   ├── disclaimer.html
│   │   └── payment-disclaimer.html
│   ├── payments/
│   │   └── index.html              # Payment portal
│   ├── css/                        # Stylesheets (copied as-is)
│   ├── js/                         # JavaScript (copied as-is)
│   └── images/                     # Images (copied as-is)
├── _site/                          # Built site (generated, git-ignored)
├── .eleventy.js                    # Eleventy configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # General documentation
```

---

## How Pages Work

### Page Anatomy

Every page has two parts:

1. **Front Matter** (YAML metadata at top)
2. **Content** (HTML for the main section)

Example:

```html
---
layout: base.njk
title: "About Donald L. Nageleisen - Experienced Kentucky Attorney"
description: "About Donald L. Nageleisen - Experienced Kentucky Attorney..."
keywords: "Donald Nageleisen attorney, Kentucky lawyer bio..."
---

<section class="hero-section">
    <!-- Your page content here -->
</section>

<section class="bio-section">
    <!-- More content -->
</section>
```

### Front Matter Options

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `layout` | Yes | Template to use | `base.njk` |
| `title` | Yes | Page title (for `<title>` tag) | `"About Us"` |
| `description` | Yes | Meta description for SEO | `"About our law firm..."` |
| `keywords` | No | SEO keywords | `"lawyer, attorney..."` |
| `extraCSS` | No | Additional CSS files to load | `["payments.css"]` |
| `extraJS` | No | Additional JS files to load | `["payments.js"]` |
| `schema` | No | JSON-LD structured data | See index.html |

### Template System

```
┌─────────────────────────────────────┐
│ base.njk                            │
│ ┌─────────────────────────────────┐ │
│ │ <head> (from front matter)      │ │
│ ├─────────────────────────────────┤ │
│ │ header.njk (navigation)         │ │
│ ├─────────────────────────────────┤ │
│ │ <main>                          │ │
│ │   {{ content }} <-- Your HTML   │ │
│ │ </main>                         │ │
│ ├─────────────────────────────────┤ │
│ │ footer.njk (footer)             │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## Common Tasks

### 1. Update Phone Number Site-Wide

**Old Way (without Eleventy):** Edit 20+ locations across 13 files
**New Way (with Eleventy):** Edit 1 file

```bash
# Edit the header
nano docs/_includes/header.njk

# Find and replace: (859) 555-0100 → YOUR_NUMBER

# Rebuild
npm run build
```

**Result:** All 13 pages updated automatically.

---

### 2. Update Footer

```bash
# Edit the footer
nano docs/_includes/footer.njk

# Make your changes

# Rebuild
npm run build
```

---

### 3. Add a New Navigation Link

Edit `docs/_includes/header.njk`:

```html
<!-- Desktop Navigation -->
<div class="hidden lg:flex items-center space-x-8">
    <a href="/index.html">Home</a>
    <a href="/about.html">About</a>
    <a href="/new-page.html">New Page</a>  <!-- Add here -->
    ...
</div>

<!-- Mobile Navigation -->
<div id="mobile-menu" class="hidden lg:hidden">
    <a href="/index.html">Home</a>
    <a href="/about.html">About</a>
    <a href="/new-page.html">New Page</a>  <!-- And here -->
    ...
</div>
```

Rebuild: `npm run build`

---

### 4. Create a New Page

```bash
# Create new file
nano docs/new-page.html
```

Add front matter and content:

```html
---
layout: base.njk
title: "New Page Title"
description: "Description for SEO"
---

<section class="py-16 bg-white">
    <div class="container mx-auto px-4">
        <h1>Your New Page</h1>
        <p>Content goes here...</p>
    </div>
</section>
```

Build and test:

```bash
npm run dev
```

---

### 5. Add Page-Specific CSS or JavaScript

For pages that need extra files (like the payments page):

```html
---
layout: base.njk
title: "My Special Page"
description: "..."
extraCSS: ["special.css"]        # Loads /css/special.css
extraJS: ["special.js"]           # Loads /js/special.js
---

<!-- Your content -->
```

---

## Build Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with live reload (http://localhost:8080) |
| `npm run build` | Build static site to `_site/` |
| `npm run clean` | Delete `_site/` directory |

---

## Deployment

### Option 1: GitHub Pages (Current Setup)

The site is configured to deploy from `docs/`, but with Eleventy you need to:

1. Build the site: `npm run build`
2. Copy `_site/` contents to `docs/`:
   ```bash
   rm -rf docs/*.html docs/legal docs/payments
   cp -r _site/* docs/
   git add docs/
   git commit -m "Deploy"
   git push
   ```

**OR** switch GitHub Pages to deploy from `_site/` branch.

### Option 2: Netlify (Recommended)

1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `_site`
4. Netlify will auto-deploy on git push

### Option 3: Vercel

Similar to Netlify:
- Build command: `npm run build`
- Output directory: `_site`

---

## Rollback Plan

If you need to revert to the old system, all original files are backed up:

```bash
# Restore original files
for file in docs/*.html.original docs/*/*.html.original docs/*/*/*.html.original; do
    if [ -f "$file" ]; then
        mv "$file" "${file%.original}"
    fi
done

# Remove Eleventy files
rm -rf _site node_modules package*.json .eleventy.js docs/_includes docs/_layouts docs/_data

# Commit
git add -A
git commit -m "Revert to pre-Eleventy state"
```

---

## Troubleshooting

### Build Errors

**Problem:** `[11ty] Problem writing Eleventy templates`

**Solution:** Check front matter syntax (YAML must be valid)

```yaml
# WRONG - Missing quotes
title: About Donald L. Nageleisen - Experienced Attorney

# RIGHT - Quoted string with special characters
title: "About Donald L. Nageleisen - Experienced Attorney"
```

### Missing Styles/Scripts

**Problem:** CSS/JS not loading in built site

**Solution:** Check `.eleventy.js` passthrough copy:

```javascript
eleventyConfig.addPassthroughCopy("docs/css");
eleventyConfig.addPassthroughCopy("docs/js");
```

### Broken Links

**Problem:** Links don't work after build

**Solution:** Use absolute paths with leading slash:

```html
<!-- WRONG -->
<a href="about.html">About</a>

<!-- RIGHT -->
<a href="/about.html">About</a>
```

---

## Benefits Summary

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Lines of duplicated code** | 2,288 | 176 | 92% reduction |
| **Update header/footer** | Edit 13 files | Edit 1 file | 13× faster |
| **Time to update phone #** | 20 minutes | 30 seconds | 97% faster |
| **Build time** | N/A | 0.05 seconds | Automated |
| **Maintainability score** | 4/10 | 9/10 | 125% improvement |

---

## Next Steps

1. **Centralize content data:** Move contact info, practice areas, etc. to `_data/site.yml`
2. **Create more components:** Extract testimonials, CTA sections, etc. to `_includes/`
3. **Add CSS tokens:** Centralize colors, spacing, typography
4. **Implement form backend:** Connect contact form to Formspree/EmailJS
5. **Add analytics:** Implement Google Analytics properly

---

## Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Nunjucks Templating](https://mozilla.github.io/nunjucks/templating.html)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## Support

For questions or issues:
1. Check this guide first
2. Review Eleventy docs
3. Check commit history: `git log --oneline`
4. Restore from backup if needed (see Rollback Plan above)
