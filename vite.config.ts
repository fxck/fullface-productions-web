/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import analog from '@analogjs/platform';
import angular from '@analogjs/vite-plugin-angular';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isScraper = env['MODE'] === 'scraper';

  // For scraper mode, create a special configuration that only builds server parts
  if (isScraper) {
    return {
      build: {
        target: ['es2020'],
        // Don't generate client-side code for scraper mode
        client: false,
      },
      resolve: {
        mainFields: ['module']
      },
      plugins: [
        analog({
          ssr: true,
          // Don't generate static files for scraper
          static: false,
          // Don't run prerendering
          prerender: false,
          // Configure server routes
          nitro: {
            // Focus only on API routes, block everything else
            routeRules: {
              '/api/instagram': {
                cors: true,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                  'Access-Control-Allow-Headers': '*'
                }
              },
              '/api/**': {},
              '/**': { handler: 'none' }
            }
          }
        }),
        angular()
      ]
    };
  }

  // For normal mode (not scraper)
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
        static: true,
        prerender: {
          routes: async () => [
            '/'
          ]
        },
        // Skip Instagram API route in client mode
        nitro: {
          routeRules: {
            '/api/instagram': { 
              handler: 'none',
              cors: true,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': '*'
              }
            }
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
