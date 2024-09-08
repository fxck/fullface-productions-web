/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import angular from '@analogjs/vite-plugin-angular';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  return {
    build: {
      target: ['es2020'],
    },
    resolve: {
      mainFields: ['module'],
    },
    plugins: [
      analog({
        ssr: mode === 'development' ? false : true,
        static: true,
        prerender: {
          routes: async () => [
            '/',
          ],
        },
      }),
      angular({
        inlineStylesExtension: 'scss',
      }),
    ],
  };
});
