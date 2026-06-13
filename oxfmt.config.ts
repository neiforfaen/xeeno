import { defineConfig } from "oxfmt"
import ultracite from "ultracite/oxfmt"

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    ...(ultracite.ignorePatterns ?? ""),
    "*.*.hbs",
    "packages/ui/**",
  ],
  semi: false,
})
