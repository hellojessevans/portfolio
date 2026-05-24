import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jesstaylor.com.au",
  server: { port: 4321 },
  devToolbar: { enabled: false },
});
