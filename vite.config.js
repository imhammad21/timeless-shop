import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/timeless-shop/",   // 👈 must have leading & trailing slash
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
