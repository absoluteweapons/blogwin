const path = require('path')
// eleventy-img
const Image = require("@11ty/eleventy-img");
// JSDOM for DOM manipulation
const { JSDOM } = require("jsdom");
require("dotenv").config();
// eleventy settings
const {inputDir, outputDir} = require("./settings.json");

module.exports = async (content, outputPath) => {
  // responsive images
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
      src = path.resolve(__dirname, "..") + src;
    }

    // 900 for development, all sizes for production
    const sizes = [];
    if (process.env.NODE_ENV === "production") sizes.push(320, 568, 768);
    sizes.push(900);
    const widths = sizes;

    // jpeg for development, avif and webp for production
    let formats = [];
    if (process.env.NODE_ENV === "production") formats.push("avif", "webp");
    formats.push("png", "jpeg");

    // run image through elevnty-img
    let metadata = await Image(src, {
      widths,
      formats,
      outputDir: "_dist/assets/images",
      urlPath: "/assets/images/",
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
      class:
        "rounded my-2 sm:my-4 max-w-full w-auto m-auto max-h-screen",
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
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
      await Promise.all(
        Object.keys(imageElems).map(async (i) => {
          imageElems[i].outerHTML = await eleventyImg(imageElems[i]);
        })
      );

      return `<!DOCTYPE html> ${document.documentElement.outerHTML}`;
    };

    return await processImages();
  } else {
    return content;
  }
};
