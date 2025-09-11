// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// --- Paths (ESM-safe dirname) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- IMPORTANT: GitHub Pages project-site subpath ---
// If you later deploy to a custom domain or root, change this to "/".
// For GitHub Pages *project* site, it must match the repo name exactly (case-sensitive).
const BASE = "/Khaista-Boutique/";

export default defineConfig(async () => {
  // (Optional) Dev-only Replit cartographer plugin
  const devPlugins =
    process.env.NODE_ENV !== "production" && process.env.REPL_ID
      ? [
          (await import("@replit/vite-plugin-cartographer")).cartographer(),
        ]
      : [];

  return {
    base: BASE,
    plugins: [react(), runtimeErrorOverlay(), ...devPlugins],

    // Your app source lives in client/
    root: path.resolve(__dirname, "client"),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
      },
    },

    build: {
      // Output to dist/public (what you upload/deploy)
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
      // (Keep default assetsDir = "assets" so URLs become /Khaista-Boutique/assets/...)
      // assetsDir: "assets",
    },

    server: {
      fs: { strict: true, deny: ["**/.*"] },
    },
  };
});
