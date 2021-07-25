const path = require("path");
const fs = require("fs").promises;
const postCss = require("postcss");

const postCssPlugins = [
  require(`tailwindcss`)(`tailwind.config.js`),
  require(`autoprefixer`),
];

module.exports = async function (cssInputFilePathParam) {
  const cssInputFilePath = path.resolve("_src", cssInputFilePathParam);
  const rawCss = await fs.readFile(cssInputFilePath);
  const outCss = await postCss(...postCssPlugins).process(rawCss, {
    from: cssInputFilePath,
  });
  return outCss;
};
