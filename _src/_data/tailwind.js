let thePostCSS = require("../_config/postcss.js");

module.exports = async function () {
  return await thePostCSS("assets/styles/my.css", (input) => input);
};
