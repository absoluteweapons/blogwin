module.exports = {
  purge: {
    enabled: true,
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
