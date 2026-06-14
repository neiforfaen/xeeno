import { defineConfig } from "tsup"

export default defineConfig((options) => ({
  banner: { js: "#!/usr/bin/env node" },
  bundle: true,
  clean: true,
  dts: false,
  entry: ["src/cli.ts"],
  format: ["cjs"],
  keepNames: true,
  minify: options.watch !== true,
  platform: "node",
  shims: false,
  sourcemap: false,
  target: "node24",
  treeshake: options.watch !== true,
}))
