import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    devMiddleware: {
      index: true,
      mimeTypes: { 'text/html': ['phtml'] },
      publicPath: '/',
      writeToDisk: true,
    },

    client: {
      webSocketURL: {
        hostname: 'localhost',
        pathname: '',
        port: 5678,
      },
      logging: 'info',
      overlay: false,
    },

    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    },
    port: 5678,
  },
});
