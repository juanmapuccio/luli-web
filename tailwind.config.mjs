/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "coastal-white": "#ffffff",
        "coastal-sand": "#f5f5f4",
        "coastal-sand-dark": "#e7e5e4",
        "coastal-blue-pale": "#e0f2fe",
        "coastal-teal-faded": "#ccfbf1",
        "coastal-blue-deep": "#0c4a6e",
        "coastal-stone-deep": "#44403c",
        // Keeping legacy for compatibility until refactor is complete
        "ocean-foam": "#f0f9ff",
        "sand-light": "#fafaf9",
        "sand": "#e7e5e4",
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
