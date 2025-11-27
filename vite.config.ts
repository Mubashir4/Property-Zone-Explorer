import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt', // Changed from 'autoUpdate' to 'prompt' to avoid auto-registration issues
      includeAssets: ['favicon.svg', 'favicon-light.svg', 'robots.txt'],
      manifest: {
        name: 'Banner17 Property Search',
        short_name: 'Banner17',
        description: 'Next-generation property search for Australian real estate',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/favicon-light.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.banner17\.com\.au\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60,
              },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.tile\.openstreetmap\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles-cache',
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      // Disable auto-injection of service worker script
      injectRegister: null,
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    // Keep a single copy of React and the external-store helpers in both dev and build
    include: [
      'react',
      'react-dom',
      'react-redux',
      'use-sync-external-store',
      'use-sync-external-store/shim',
      'use-sync-external-store/with-selector',
    ],
    dedupe: [
      'react',
      'react-dom',
      'react-redux',
      'use-sync-external-store',
      'use-sync-external-store/shim',
      'use-sync-external-store/with-selector',
    ],
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
  },
});
