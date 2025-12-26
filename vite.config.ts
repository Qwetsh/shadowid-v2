import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/shadowid-v2/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'ShadowID v2',
        short_name: 'ShadowID',
        description: 'Shadowrun Identity Card Generator - Create fictional ID cards for roleplay and props',
        theme_color: '#0a0e27',
        background_color: '#0a0e27',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/shadowid-v2/',
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%230a0e27" width="192" height="192"/><text x="50%" y="50%" font-size="80" font-weight="bold" fill="%2300f0ff" text-anchor="middle" dominant-baseline="middle" font-family="monospace">SID</text></svg>',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="%230a0e27" width="512" height="512"/><text x="50%" y="50%" font-size="220" font-weight="bold" fill="%2300f0ff" text-anchor="middle" dominant-baseline="middle" font-family="monospace">SID</text></svg>',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
        screenshots: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 720"><rect fill="%230a0e27" width="540" height="720"/><rect fill="%2300f0ff" opacity="0.1" x="20" y="100" width="500" height="400" rx="10"/><text x="270" y="300" font-size="40" font-weight="bold" fill="%2300f0ff" text-anchor="middle" dominant-baseline="middle" font-family="monospace">ShadowID</text><text x="270" y="360" font-size="16" fill="%2300f0ff" opacity="0.7" text-anchor="middle">Identity Generator</text></svg>',
            sizes: '540x720',
            type: 'image/svg+xml',
            form_factor: 'narrow',
          },
        ],
        categories: ['productivity', 'utilities'],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        maximumFileSizeToCacheInBytes: 5000000,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
})
