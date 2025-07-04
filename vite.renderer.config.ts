import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  css: {
    postcss: './postcss.config.js'
  }
  /*
  server: {
    proxy: {
      '/translate': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }*/
});
