module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias('main', 'layouts/main.njk');
  eleventyConfig.setTemplateFormats(['njk', 'css', 'svg', 'jpg', 'png', 'webp', 'woff2']);

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
