import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/") ||
            id.includes("/zustand/")
          ) {
            return "vendor-react";
          }

          if (id.includes("/three/")) {
            return "vendor-three";
          }

          if (
            id.includes("/react-globe.gl/") ||
            id.includes("/globe.gl/") ||
            id.includes("/three-globe/") ||
            id.includes("/kapsule/") ||
            id.includes("/d3-") ||
            id.includes("/topojson-") ||
            id.includes("/accessor-fn/")
          ) {
            return "vendor-globe";
          }

          return undefined;
        }
      }
    }
  },
  server: {
    host: "127.0.0.1",
    port: 5173
  }
});
