import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { readFileSync } from "node:fs";
import path from "path";
import { componentTagger } from "lovable-tagger";

const serveSitemap = (): Plugin => ({
  name: "serve-sitemap",
  configureServer(server) {
    server.middlewares.use("/sitemap.xml", (_req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.end(readFileSync(path.resolve(__dirname, "public/sitemap.xml")));
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use("/sitemap.xml", (_req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.end(readFileSync(path.resolve(__dirname, "public/sitemap.xml")));
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [serveSitemap(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Handle SPA routing - redirect all routes to index.html
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
}));
