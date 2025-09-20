import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Check if this matches your actual GitHub repository name
const repoName = 'timeless-shop' // Change this if different

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${timeless-shop}/` : '/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})