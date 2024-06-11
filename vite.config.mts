import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";
import Pages from "vite-plugin-pages";
import path from "path";
import 'dotenv/config';

const backend_url = `http://localhost:${process.env.VITE_BACKEND_PORT}/`

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  envDir: "../",
  plugins: [
    react(),
    eslint(),
    Pages({
      pagesDir: [{ dir: "pages", baseRoute: "" }],
      extensions: ["tsx"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api/v1": {
        target: backend_url,
        changeOrigin: true,
      },
      "/socket.io": {
        target: backend_url,
        ws: true,
      }
    },
    port: 5100,
  },
  build: {
    outDir: "../.local/vite/dist",
    assetsDir: "assets",
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
