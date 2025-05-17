/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import analog from '@analogjs/platform';
import angular from '@analogjs/vite-plugin-angular';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  // const env = loadEnv(mode, process.cwd(), '')

  // const analogConfig = env['MODE'] === 'scraper'
  //   ? {
  //     static: false
  //   }
  //   : {
  //     static: true,
  //     prerender: {
  //       routes: async () => [
  //         '/'
  //       ]
  //     }
  //   };

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
          // Configure Sass with modern API
          sassOptions: {
            outputStyle: 'compressed'
          },
          // Force the use of the embedded Sass compiler
          implementation: 'sass-embedded'
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
        }
      }),
      angular({
        inlineStylesExtension: 'scss'
      })
    ]
  };

});
