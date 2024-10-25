import { defineConfig } from "tsup";

import mangleCache from "./mangle-cache.json";

const minify = Boolean(process.env.MINIFY);

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  target: "esnext",
  clean: true,
  treeshake: true,
  dts: true,
  splitting: false,
  sourcemap: !minify,
  minify,
  esbuildOptions: options => {
    options.sourcesContent = false;
    options.mangleProps = /[^_]_$/;
    options.mangleCache = mangleCache;
  },
});
