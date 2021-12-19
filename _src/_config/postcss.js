const path = require("path");
const fs = require("fs").promises;
const postCss = require("postcss");
require("dotenv").config();

const postCssPlugins = [
  require(`tailwindcss`)(`tailwind.config.js`),
  require(`autoprefixer`),
];

// minify for production
if (process.env.NODE_ENV === "production")
  postCssPlugins.push(
    require("cssnano")({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    })
  );

module.exports = async function (cssInputFilePathParam) {
  const cssInputFilePath = path.resolve("_src", cssInputFilePathParam);
  const rawCss = await fs.readFile(cssInputFilePath);
  const outCss = await postCss(...postCssPlugins).process(rawCss, {
    from: cssInputFilePath,
  });
  return outCss;
};
