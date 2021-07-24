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
      backgroundImage: {
        "bg-moon": "url('/assets/images/icons/dark.svg')",
        "bg-sun": "url('/assets/images/icons/light.svg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
