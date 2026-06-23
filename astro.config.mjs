import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://jesstaylor.com.au",
  server: { port: 4321 },
  devToolbar: { enabled: false },
  output: "hybrid",
  adapter: cloudflare()
});