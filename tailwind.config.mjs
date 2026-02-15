/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "ocean-foam": "#f0f9ff",
        "sand-light": "#fafaf9",
        sand: "#e7e5e4",
        "sea-blue": "#0c4a6e",
        "deep-navy": "#082f49",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Inter"', "sans-serif"],
        cursive: ['"Allura"', "cursive"],
      },
    },
  },
  plugins: [],
};
