/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        bg1: "#131720",
        bg2: "#212B39",
        bg3: "#171F2A",
        text1: "#FFFFFF",
        theme: "#3EBF81",
        primary: "#FFFFFF",
        background: "#131720",
      },

      animation: {
        "spin-fast": "spin 0.4s linear infinite",
      },
    },
  },
  plugins: [],
};
