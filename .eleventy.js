const htmlmin = require("html-minifier");
const Image = require("@11ty/eleventy-img");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const markdownIt = require("@gerhobbelt/markdown-it");
const markdownItClass = require("markdown-it-class");
const nunjucks = require("nunjucks");
const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");
const posthtml = require("posthtml");
const uglify = require("posthtml-minify-classnames");
require("dotenv").config();

// environment variables
nunjucks.configure("views", {}).addGlobal("CFWA_TOKEN", process.env.CFWA_TOKEN);
const environment = process.env.ENVIRONMENT;

// eleventy input and output dirs
const inputDir = "_src";
const outputDir = "_dist";

// markdown-it-class mapping
const mapping = require("./_src/_config/markdown-mapping.json");

// enable markdown-it formatting
const md = markdownIt({ linkify: true, html: true, typographer: true });
// tell markdown-it to use markdown-it-class plugin
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

  // responsive images
  config.addTransform("responsiveimg", async (content, outputPath) => {
    // eleventy-image function
    async function eleventyImg(image) {
      // get the `src` and `alt` of the image element
      let src = image.getAttribute("src");
      let alt = image.getAttribute("alt");

      if (src === undefined) {
        // no src = no chance
        throw new Error(`Missing \`src\` in eleventyImg!`);
      }

      if (src.slice(0, 1) === "/") {
        // correct directory for local images
        src = `${__dirname}/${inputDir}${src}`;
      }

      // set up some widths
      let sizes = [320, 568, 768, 900];

      // run image through elevnty-img
      let metadata = await Image(src, {
        widths: sizes,
        formats: ["avif", "webp", "jpeg"],
        outputDir: "_dist/assets/images",
        urlPath: "/assets/images/"
      });
 
      let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
        class: "md:rounded shadow-sm my-2 sm:my-4 transform -translate-x-11 sm:translate-x-0 w-screen sm:w-full",
        style: "max-width: 100vw;",
      };

      // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
      return Image.generateHTML(
        metadata,
        imageAttributes
      );
    }

    // only apply transforms if the output is html (not xml or css or something)
    if (outputPath.endsWith(".html")) {
      // feed the content into jsdom
      const dom = new JSDOM(content);
      const document = dom.window.document;

      // find the image elements via `queryselectorall`, replace this selector with your own custom one
      const imageElems = document.querySelectorAll(
        "img:not([data-no-responsive])"
      );

      // no images? crack on
      if (imageElems.length === 0) {
        return content;
      }

      // loop through images, resize via and make responsive Eleventy Image
      const processImages = async () => {
        await Promise.all(Object.keys(imageElems).map(async (i) => {
          imageElems[i].outerHTML = await eleventyImg(imageElems[i]);
        }));
        
        return `<!DOCTYPE html> ${document.documentElement.outerHTML}`;
      }

      return await processImages();
    } else {
      return content;
    }
  });

  // minify html and uglify classnames
  // TODO production only
  config.addTransform("htmlmin", async (content, outputPath) => {
    if (outputPath.endsWith(".html") && environment === "production") {
      const { html } = await posthtml()
        .use(uglify())
        .process(content);

      let minified = htmlmin.minify(html, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      return minified;
    }

    return content;
  });

  // set output dir
  return {
    dir: {
      input: inputDir,
      output: outputDir,
    },
  };
};
