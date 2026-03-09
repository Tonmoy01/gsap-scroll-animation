import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  splitting: false,
  target: 'es2018',
  external: ['react', 'react-dom', 'gsap'],
  // Uncomment to add "use client" banner for Next.js app-router consumers:
  // esbuildOptions(options) {
  //   options.banner = { js: '"use client";' };
  // },
});
