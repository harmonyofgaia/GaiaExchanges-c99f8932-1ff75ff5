
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Ensure environment variables are properly replaced at build time
    __DEV__: mode === 'development',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'ui';
            }
            if (id.includes('recharts')) {
              return 'charts';
            }
            if (id.includes('lucide-react')) {
              return 'lucide';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('@supabase/supabase-js')) {
              return 'supabase';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'query';
            }
            if (id.includes('clsx') || id.includes('class-variance-authority') || id.includes('tailwind-merge')) {
              return 'utils';
            }
            return 'vendor-misc';
          }
          if (id.includes('src/pages/Forest') || id.includes('src/pages/Wildfire') || id.includes('src/pages/Community') || id.includes('src/pages/Partnership') || id.includes('src/pages/Impact')) {
            return 'forest-shield';
          }
          if (id.includes('src/components/admin/') || id.includes('src/pages/Admin')) {
            return 'admin';
          }
          if (id.includes('TetrisGame') || id.includes('SnakeWormsIntegration') || id.includes('MinecraftLandscapeBuilder')) {
            return 'games';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1400,
    target: 'esnext',
    minify: 'esbuild',
  },
}));
