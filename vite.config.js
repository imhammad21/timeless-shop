import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/timeless-shop/",
  build: {
    outDir: 'dist',
    // Add these options to ensure proper chunking and asset handling
    rollupOptions: {
      input: './index.html'
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Add this server configuration for development
  server: {
    port: 3000,
    open: true
  }
})