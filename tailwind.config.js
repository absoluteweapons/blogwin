// environment setup
require("dotenv").config();
const prod = process.env.NODE_ENV === "production";

module.exports = {
  content: [
    "./_dist/**/*.html",
    "./_src/**/*.{njk,json,js}",
    "./_src/**/*.{njk,json,js}",
    "./.eleventy.js",
  ],
  darkMode: "class", // 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
