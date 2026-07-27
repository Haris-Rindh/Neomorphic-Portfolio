import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      ViteImageOptimizer({
        png: {
          quality: 75,
        },
        jpeg: {
          quality: 75,
        },
        webp: {
          quality: 78,
          lossless: false,
        },
      }),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      // Target modern browsers for smaller output
      target: 'es2020',
      // Don't inline large assets as base64
      assetsInlineLimit: 4096,
      // Split CSS per async chunk
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-motion': ['motion'],
            'vendor-icons': ['react-icons', 'lucide-react'],
            'vendor-ui': [
              'typewriter-effect',
              '@studio-freight/lenis',
              'clsx',
              'tailwind-merge',
            ],
          },
        },
      },
    },
  };
});
