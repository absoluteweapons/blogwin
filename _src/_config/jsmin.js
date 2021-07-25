const { minify } = require("terser");
require("dotenv").config();
module.exports = async (code, callback) => {
  try {
    // minify for production
    const minified = (process.env.NODE_ENV !== "production") ? await minify(code) : code;
    callback(null, minified.code);
  } catch (err) {
    console.error("Terser error: ", err);
    // Fail gracefully.
    callback(null, code);
  }
}
