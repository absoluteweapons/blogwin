module.exports = {
  purge: {
    enabled: true,
    content: [
      "./_src/**/*.njk",
      "./.eleventy.js",
      "./_src/_config/markdown-mapping.json"
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
