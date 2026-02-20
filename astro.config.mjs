import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), sitemap()],
  adapter: vercel(),
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "ca", "it"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  site: "https://luli-web.vercel.app",
});