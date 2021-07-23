module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./_src/**/*.njk",
      "./.eleventy.js",
      "./_src/_config/*.json",
      "./_src/_config/*.js",
    ],
  },
  darkMode: "class", // 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
