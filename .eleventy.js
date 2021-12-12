// TODO improve reloading, e.g. when css changes
// html-minifier
const jsmin = require("./_src/_config/jsmin.js");
// html-minifier
const htmlmin = require("./_src/_config/htmlmin.js");
// markdown-it including markdown-it-class to add classes
const markdownIt = require("@gerhobbelt/markdown-it");
const markdownItClass = require("@toycode/markdown-it-class");
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

// console log environment
console.log(`Building for: ${process.env.NODE_ENV}`);

module.exports = (config) => {
  // create a posts collection from all markdown files in posts directory
  config.addCollection("posts", (collection) => {
    const posts = [
      ...collection.getFilteredByGlob("./_src/posts/*.md"),
    ].reverse();
    return prod ? posts.filter((post) => !post.data.draft) : posts;

    /* TODO WHY DOES THIS NOT WORK EVEN WITH ASYNC AWAIT?
    const posts = [...collection.getFilteredByGlob("./_src/posts/*.md")];
    posts.reverse();
    posts.filter((post) => !post.data.draft);
    return posts;
    */
  });

  // additional watched files
  config.addWatchTarget("./_dist/assets/styles/my.css");
  config.addWatchTarget("./_src/assets/");

  // markdown-it, classnames and responsive images
  config.setLibrary("md", md);

  // responsive images here
  config.addTransform("responsiveImg", responsiveImg);

  // minify js
  config.addNunjucksAsyncFilter("jsmin", jsmin);

  // minify html and uglify classnames if prod
  if (prod) config.addTransform("htmlmin", htmlmin);

  // CWFA_TOKEN token in templates
  config.addShortcode("CFWA", CFWA);

  // favicons
  config.addPassthroughCopy("./_src/favicons");

  // set output dir
  return {
    dir: {
      input: inputDir,
      output: outputDir,
    },
  };
};
