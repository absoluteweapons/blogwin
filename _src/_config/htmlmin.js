// posthtml including minify classnames
const posthtml = require("posthtml");
const uglify = require("posthtml-minify-classnames");
// html-minifier
const htmlmin = require("html-minifier");

module.exports = async (content, outputPath) => {
  if (outputPath.endsWith(".html")) {
    const { html } = await posthtml().use(uglify()).process(content);

    let minified = htmlmin.minify(html, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    });

    return minified;
  }

  return content;
};
