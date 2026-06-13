import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
// @ts-check
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  base: "/",
  integrations: [react()],
  site: "https://www.xeeno.app",
  trailingSlash: "ignore",
  vite: {
    plugins: [tailwindcss()],
  },
})
