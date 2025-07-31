// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sanity({
      projectId: "hz4n1dio",
      dataset: "production",
      useCdn: false, // See note on using the CDN
      apiVersion: "2025-07-26", // insert the current date to access the latest version of the API
      studioBasePath: "/studio", // If you want to access the Studio on a route
    }),
    react(),
  ],
});
