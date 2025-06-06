import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/report.php',
  plugins: [react(), tailwindcss()],
  css: {
    devSourcemap: false,
  },
  server: {
    proxy: {
      
    },
  },
  build: {
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'main.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
    cssCodeSplit: false,
    minify: true,
  },
});
