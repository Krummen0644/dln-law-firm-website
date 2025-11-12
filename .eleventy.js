module.exports = function(eleventyConfig) {

  // ============================================================================
  // PASSTHROUGH COPIES
  // Copy static assets directly to output without processing
  // ============================================================================

  // CSS files
  eleventyConfig.addPassthroughCopy("docs/css");

  // JavaScript files
  eleventyConfig.addPassthroughCopy("docs/js");

  // Images
  eleventyConfig.addPassthroughCopy("docs/images");

  // Static files
  eleventyConfig.addPassthroughCopy("docs/robots.txt");
  eleventyConfig.addPassthroughCopy("docs/sitemap.xml");

  // ============================================================================
  // CONFIGURATION
  // ============================================================================

  return {
    // Input directory (where source files live)
    dir: {
      input: "docs",          // Source files in docs/
      output: "_site",        // Build output to _site/
      includes: "_includes",  // Partials/components in docs/_includes/
      layouts: "_layouts",    // Page layouts in docs/_layouts/
      data: "_data"          // Global data in docs/_data/
    },

    // Template formats to process
    templateFormats: ["html", "njk", "md"],

    // Use Nunjucks for HTML files
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",

    // Transforms and other settings
    pathPrefix: "/",
  };
};
