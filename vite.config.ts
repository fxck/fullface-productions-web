/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import analog from '@analogjs/platform';
import angular from '@analogjs/vite-plugin-angular';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isScraper = env['MODE'] === 'scraper';

  return {
    build: {
      target: ['es2020']
    },
    resolve: {
      mainFields: ['module']
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Use modern API to avoid deprecation warnings
          api: "modern"
        }
      }
    },
    plugins: [
      analog({
        ssr: mode === 'development' ? false : true,
        // Only use static for client mode, not scraper mode
        static: !isScraper,
        prerender: {
          routes: async () => [
            '/'
          ]
        },
        // Configure server routes for different modes
        nitro: {
          // Skip the Instagram API route during client build
          routeRules: {
            '/api/instagram': isScraper 
              ? {} // Allow in scraper mode
              : { handler: 'none' } // Skip in client mode
          },
        }
      }),
      angular({
        inlineStylesExtension: 'scss'
      })
    ],
    // Make the scraper endpoint available in client mode
    define: {
      'import.meta.env.MY_SERVER_SCRAPER_ENDPOINT': JSON.stringify(env['MY_SERVER_SCRAPER_ENDPOINT'] || '')
    }
  };
});
