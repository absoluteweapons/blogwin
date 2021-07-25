module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./_dist/**/*.html",
      "./_src/**/*.{njk,json,js}",
      "./.eleventy.js",
    ],
  },
  darkMode: "class", // 'media' or 'class'
  theme: {
    extend: {
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
