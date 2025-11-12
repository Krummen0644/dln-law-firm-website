# Donald L. Nageleisen Attorney at Law - Website

A modern, mobile-first, SEO-optimized website for a Kentucky law firm specializing in Criminal Defense, Personal Injury, Medical Malpractice, Family Law, and Civil Rights.

Built with **Eleventy** static site generator for easy maintenance and zero code duplication.

## 🚀 Features

- **Mobile-First Responsive Design** - Optimized for all devices
- **Strong Local SEO** - Schema markup, meta tags, sitemap
- **Accessibility (WCAG 2.1 AA)** - ARIA labels, keyboard navigation, skip links
- **Fast Loading** - Static site generation with CDN-hosted resources
- **Contact Form** - Client-side validation with user-friendly error messages
- **Practice Area Pages** - Comprehensive coverage of all legal services
- **Case Results & Testimonials** - Social proof and credibility
- **Template System** - Header/footer in one location, site-wide updates in seconds

## 🏗️ For Developers

This site uses **Eleventy (11ty)** to eliminate HTML duplication. Header and footer are managed in a single location.

### Quick Start

```bash
# Install dependencies
npm install

# Start development server with live reload
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:8080` during development.

**For detailed developer documentation, see [DEVELOPMENT.md](DEVELOPMENT.md)**

## 📁 Project Structure

```
/DLN Legal Website/
├── docs/                        # Source files
│   ├── _includes/               # Reusable components
│   │   ├── header.njk          # Header/navigation (single source)
│   │   └── footer.njk          # Footer (single source)
│   ├── _layouts/                # Page templates
│   │   └── base.njk            # Base layout with head/body
│   ├── index.html               # Homepage
│   ├── about.html               # About page
│   ├── contact.html             # Contact form
│   ├── results.html             # Case results
│   ├── criminal-defense.html    # Practice area pages
│   ├── personal-injury.html
│   ├── medical-malpractice.html
│   ├── family-law.html
│   ├── civil-rights.html
│   ├── legal/                   # Legal pages
│   │   ├── privacy-policy.html
│   │   ├── disclaimer.html
│   │   └── payment-disclaimer.html
│   ├── payments/
│   │   └── index.html           # Payment portal
│   ├── css/                     # Stylesheets
│   ├── js/                      # JavaScript
│   └── images/                  # Images
├── _site/                       # Built site (generated, git-ignored)
├── .eleventy.js                 # Eleventy configuration
├── package.json                 # Dependencies and scripts
├── README.md                    # This file
└── DEVELOPMENT.md               # Detailed developer guide
```

## 🛠️ Technologies Used

- **Eleventy 2.0.1** - Static site generator
- **Nunjucks** - Template engine
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript** - No dependencies
- **Google Fonts** - Inter & Playfair Display

## 📦 Deployment

### Option 1: Netlify (Recommended)

1. Connect repository to [netlify.com](https://netlify.com)
2. **Build command:** `npm run build`
3. **Publish directory:** `_site`
4. Netlify will auto-deploy on git push
5. Configure custom domain and SSL

### Option 2: Vercel

1. Connect repository to [vercel.com](https://vercel.com)
2. **Build command:** `npm run build`
3. **Output directory:** `_site`
4. Auto-deploy on git push

### Option 3: GitHub Pages

1. Build the site: `npm run build`
2. Copy `_site/` contents to deployment directory
3. Commit and push to GitHub
4. Enable Pages in repository settings

**Note:** For all deployment options, you must run `npm run build` to generate the static site in `_site/` directory.

## ✅ Pre-Launch Checklist

### Required Updates

- [ ] **Update contact information**
  - Phone number: Currently set to `(859) 555-0100`
  - Email: Currently set to `don@nageleisen-law.com`
  - Address: Currently set to `123 Main Street, Suite 200, Covington, KY 41011`
  - **Edit these in 2 files only:**
    - `docs/_includes/header.njk` (navigation)
    - `docs/_includes/footer.njk` (footer)
  - Run `npm run build` to regenerate all pages

- [ ] **Update domain name**
  - Current placeholder: `www.nageleisen-law.com`
  - Update in page front matter (meta tags, schema)
  - Update in `docs/sitemap.xml`
  - Update in `docs/robots.txt`
  - Run `npm run build` to regenerate all pages

- [ ] **Add professional photos**
  - Attorney profile photo (`docs/images/attorney-profile.jpg`)
  - Office exterior/interior photos
  - Replace placeholder SVG images
  - Run `npm run build` after adding images

- [ ] **Configure contact form backend**
  - Current form is frontend-only (see `docs/js/main.js`)
  - Edit form in `docs/contact.html`
  - Options:
    - Formspree (easy, free tier available)
    - EmailJS
    - Custom backend (PHP, Node.js, etc.)
    - Netlify Forms (if using Netlify)
  - Run `npm run build` after configuration

- [ ] **Update Google Maps embed**
  - In `docs/contact.html`, update map iframe with actual office location
  - Get embed code from [Google Maps](https://www.google.com/maps)
  - Run `npm run build` after update

- [ ] **Verify bar information**
  - Update bar membership details in `docs/about.html`
  - Add bar numbers if required
  - Verify education credentials
  - Run `npm run build` after update

- [ ] **Review case results**
  - Update case results in `docs/results.html` with real data
  - Ensure compliance with ethical advertising rules
  - Add required disclaimers per Kentucky Bar rules
  - Run `npm run build` after update

## 🔍 SEO Optimization Checklist

### Technical SEO

- [x] XML sitemap created (`sitemap.xml`)
- [x] Robots.txt configured
- [x] Schema.org markup (LocalBusiness, Attorney, LegalService)
- [x] Semantic HTML structure
- [x] Mobile-responsive design
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Analytics
- [ ] Set up Google Tag Manager (optional)

### On-Page SEO

- [x] Unique title tags for each page
- [x] Meta descriptions (under 160 characters)
- [x] H1 tags on every page
- [x] Proper heading hierarchy (H1 → H2 → H3)
- [x] Alt text for images (update placeholders)
- [x] Internal linking structure
- [x] Keywords in URLs
- [x] Fast loading times (no heavy frameworks)

### Local SEO

- [ ] **Google Business Profile**
  - Claim/create listing
  - Add accurate business info
  - Upload photos
  - Encourage client reviews

- [ ] **Local Citations**
  - Avvo
  - FindLaw
  - Lawyers.com
  - Yelp
  - Better Business Bureau
  - Local chambers of commerce

- [ ] **NAP Consistency** (Name, Address, Phone)
  - Ensure consistency across all directories
  - Match exactly what's on website

### Content SEO

- [x] Location-specific keywords (Northern Kentucky, Covington, etc.)
- [x] Practice area keywords
- [x] FAQ sections
- [ ] Blog (consider adding for ongoing SEO)
- [ ] Regular content updates

## ♿ Accessibility Features

- Skip to main content link
- ARIA labels and roles
- Keyboard navigation support
- Proper focus states
- Alt text for images
- Semantic HTML
- Color contrast (WCAG AA compliant)
- Reduced motion support

## 📱 Mobile Optimization

- Mobile-first design approach
- Touch-friendly tap targets (min 44x44px)
- Responsive images
- Mobile menu navigation
- Click-to-call phone links
- Mobile-optimized forms

## 🎨 Customization

### Colors

Main brand colors can be modified in HTML files. Current palette:
- Primary Blue: `#2563eb` (Tailwind `blue-600`)
- Dark Blue: `#1e3a8a` (Tailwind `blue-900`)
- Replace throughout `class` attributes or add to `css/styles.css`

### Fonts

Fonts are loaded from Google Fonts:
- **Body**: Inter
- **Headings**: Inter
- **Accent**: Playfair Display

To change fonts, update the Google Fonts link in `<head>` and modify `css/styles.css`.

## 📊 Analytics Setup

### Google Analytics 4

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Add tracking code before `</head>` in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

3. Track specific events (form submissions, phone clicks) - already set up in `js/main.js`

## 🔒 Privacy & Legal

### Required Pages (Consider Adding)

- **Privacy Policy** - Explain data collection
- **Terms of Service** - Website usage terms
- **Cookie Policy** - If using cookies/analytics
- **Legal Disclaimer** - Already included in footer, may need expansion

### Compliance

- Ensure compliance with Kentucky Bar Association advertising rules
- Review ethical guidelines for lawyer advertising
- Include required disclaimers on results/testimonials

## 🐛 Browser Compatibility

Tested and compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## 🚀 Performance Optimization

### Current Optimizations
- CDN-hosted Tailwind CSS
- CDN-hosted Google Fonts
- Minimal JavaScript
- No heavy dependencies
- Lazy loading for images (add `loading="lazy"` attribute)

### Further Optimization (Optional)
- Image compression (TinyPNG, ImageOptim)
- Minify CSS and JS for production
- Enable Gzip/Brotli compression on server
- Implement browser caching headers
- Consider CDN for assets

## 📧 Contact Form Integration

### Formspree (Recommended - Easy Setup)

1. Sign up at [formspree.io](https://formspree.io)
2. Create new form
3. Update `contact.html` form action:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Netlify Forms

If using Netlify, add `netlify` attribute to form:

```html
<form name="contact" netlify>
```

### Custom Backend

See `js/main.js` - form validation is ready. Add AJAX submission to your backend endpoint.

## 📞 Support

For questions about customization or deployment:
- Review Tailwind CSS docs: [tailwindcss.com](https://tailwindcss.com)
- HTML/CSS/JS resources: [MDN Web Docs](https://developer.mozilla.org)

## 📝 License

This website template is proprietary. All rights reserved.

---

## 📚 Additional Resources

- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Comprehensive developer guide
- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Nunjucks Templating](https://mozilla.github.io/nunjucks/templating.html)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Last Updated:** January 2025
**Version:** 2.0.0 - Eleventy Template System
