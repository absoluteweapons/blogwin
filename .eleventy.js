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
// environment variables
require("dotenv").config();

// environment variables
// nunjucks
//   .configure("views", {})
//   .addGlobal("CFWA_TOKEN", process.env.CFWA_TOKEN)
//   .addGlobal("JAMIE", "true");
const CFWA_TOKEN = process.env.CFWA_TOKEN;
const prod = process.env.ENVIRONMENT === "production";

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

  // markdown-it, classnames and responsive images
  config.setLibrary("md", md);

  // responsive images here
  config.addTransform("responsiveImg", responsiveImg);

  // minify html and uglify classnames if prod
  prod && config.addTransform("htmlmin", htmlmin);

  // set output dir
  return {
    dir: {
      input: inputDir,
      output: outputDir,
    },
  };
};
