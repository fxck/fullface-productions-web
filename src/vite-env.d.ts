/// <reference types="vite/types/importMeta.d.ts" />
/// <reference types="vite/client" />

interface ImportMeta {
  env: {
    [key: string]: string | undefined;
    readonly MY_SERVER_SCRAPER_ENDPOINT?: string;
  };
}
