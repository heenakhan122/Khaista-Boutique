// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IMPORTANT: must match repo name exactly for GitHub Pages
const BASE = "/Khaista-Boutique/";

export default defineConfig(async () => {
  const devPlugins =
    process.env.NODE_ENV !== "production" && process.env.REPL_ID
      : [];

  return {
    base: BASE,
    plugins: [react(), runtimeErrorOverlay(), ...devPlugins],
    // Your app index.html is in client/
    root: path.resolve(__dirname, "client"),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
      },
    },
    build: {
      // Keep your current output location
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      fs: { strict: true, deny: ["**/.*"] },
    },
  };
});
