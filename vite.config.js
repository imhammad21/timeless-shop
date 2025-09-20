import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/timeless-shop/",
  build: {
    outDir: 'dist',
    // Add rollup options to ensure correct entry point
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})