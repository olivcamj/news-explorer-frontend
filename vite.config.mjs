import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/news-explorer-frontend/',
  plugins: [react()],
});
