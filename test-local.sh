#!/bin/bash

echo "=== Testing DLN Legal Website Locally ==="
echo ""

# Test 1: Development Build
echo "Test 1: Building in development mode..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Development build successful"
else
    echo "❌ Development build failed"
    exit 1
fi

# Check CSS link in dev build
CSS_LINK=$(grep -o 'href="/css/styles.css"' _site/index.html)
if [ -n "$CSS_LINK" ]; then
    echo "✅ Development CSS link correct: /css/styles.css"
else
    echo "❌ Development CSS link incorrect"
fi

# Test 2: Production Build
echo ""
echo "Test 2: Building in production mode..."
ELEVENTY_ENV=production npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Production build successful"
else
    echo "❌ Production build failed"
    exit 1
fi

# Check CSS link in production build
PROD_CSS_LINK=$(grep -o 'href="/dln-law-firm-website/css/styles.css"' _site/index.html)
if [ -n "$PROD_CSS_LINK" ]; then
    echo "✅ Production CSS link correct: /dln-law-firm-website/css/styles.css"
else
    echo "❌ Production CSS link incorrect"
    ACTUAL=$(grep -o 'href="[^"]*styles.css"' _site/index.html | head -1)
    echo "   Found: $ACTUAL"
fi

# Test 3: Check all page links
echo ""
echo "Test 3: Checking navigation links..."
ABOUT_LINK=$(grep -o 'href="/dln-law-firm-website/about/"' _site/index.html | head -1)
if [ -n "$ABOUT_LINK" ]; then
    echo "✅ About link correct: /dln-law-firm-website/about/"
else
    echo "❌ About link incorrect"
    ACTUAL=$(grep -o 'href="[^"]*about[^"]*"' _site/index.html | head -1)
    echo "   Found: $ACTUAL"
fi

# Test 4: Verify files exist
echo ""
echo "Test 4: Verifying assets exist..."
if [ -f "_site/css/styles.css" ]; then
    echo "✅ CSS file exists: _site/css/styles.css"
else
    echo "❌ CSS file missing"
fi

if [ -f "_site/js/main.js" ]; then
    echo "✅ JS file exists: _site/js/main.js"
else
    echo "❌ JS file missing"
fi

echo ""
echo "=== All Tests Complete ===="
echo ""
echo "To test locally:"
echo "  npm run dev"
echo "  Open http://localhost:8080"
echo ""
echo "The production build (with /dln-law-firm-website/ prefix)"
echo "is what gets deployed to GitHub Pages."
