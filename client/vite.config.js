import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  root: '.', // This tells Vite that the root is the current directory (client)
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory will be 'client/dist'
    rollupOptions: {
      input: resolve(__dirname, 'index.html'), // Entry point to your app
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Optional: alias for easier imports
    },
  },
})
