const { minify } = require("terser");
require("dotenv").config();
module.exports = async (code, callback) => {
  try {
    // minify for production
    if (process.env.NODE_ENV === "production") {
      const minified = await minify(code);
      callback(null, minified.code);
    } else {
      callback(null, code);
    }
  } catch (err) {
    console.error("Terser error: ", err);
    // Fail gracefully.
    callback(null, code);
  }
}
