import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  root: resolve(__dirname, "tencent"),
  base: "./",
  publicDir: resolve(__dirname, "public"),
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "dist-tencent"),
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: false,
    target: ["es2018", "chrome87", "safari13"],
    rollupOptions: {
      output: {
        entryFileNames: "assets/app-[hash].js",
        chunkFileNames: "assets/chunk-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
