import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    // Only include test files from your project, not dependencies
    include: [
      "src/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "GAIA ENGINE V1/test/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "test/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "lovable/src/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "lovable/test/**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
    // Exclude all node_modules and build output
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.output/**",
      "**/.next/**",
      "**/.vercel/**",
      "**/.netlify/**",
      "**/test/integration/supabase.integration.test.ts",
      "**/test/e2e/smoke.spec.ts",
      "lovable/**/test/integration/supabase.integration.test.ts",
      "lovable/**/test/e2e/smoke.spec.ts",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
