// html-minifier
const htmlmin = require("./_src/_config/htmlmin.js");
// markdown-it including markdown-it-class to add classes
const markdownIt = require("@gerhobbelt/markdown-it");
const markdownItClass = require("markdown-it-class");
// nunjucks
const Nunjucks = require("nunjucks");
// tailwind
const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");
// responsive images
const responsiveImg = require("./_src/_config/responsiveImg.js")
// eleventy settings
const { inputDir, outputDir } = require("./_src/_config/settings.json");
// CFWA
const CFWA = require("./_src/_config/cfwa.js");

// environment setup
require("dotenv").config();
const prod = process.env.NODE_ENV === "production";

/**
 * markdown-it + markdown-mapping.json maps 
 * tailwind classes to DOM elements
 */
const mapping = require("./_src/_config/markdown-mapping.json");
const md = markdownIt({ linkify: true, html: true, typographer: true });
md.use(markdownItClass, mapping);

module.exports = (config) => {
  // create a posts collection from all markdown files in posts directory
  config.addCollection("posts", (collection) => {
    return [...collection.getFilteredByGlob("./_src/posts/*.md")].reverse();
  });

  // enable tailwind
  config.addPlugin(pluginTailwindCSS, {
    src: "_src/assets/styles/my.css",
  });

  // Sometimes handy for making sure your browser refreshes the CSS
  config.addShortcode("version", function () {
    return String(Date.now());
  });

  // Apparently this, on top of the PostCSS pruning options watching 11ty, helps 11ty watch Tailwind or something.
  config.addWatchTarget("./_dist/assets/styles/my.css");

  // markdown-it, classnames and responsive images
  config.setLibrary("md", md);

  // responsive images here
  config.addTransform("responsiveImg", responsiveImg);

  // passthrough for svg icons
  config.addPassthroughCopy("./_src/assets/images/icons");

  // minify html and uglify classnames if prod
  if (prod) config.addTransform("htmlmin", htmlmin);

  // CWFA_TOKEN token in templates
  config.addShortcode("CFWA", CFWA);

  // set output dir
  return {
    dir: {
      input: inputDir,
      output: outputDir,
    },
  };
};
