import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: '**/*.{js,jsx}',
    }),
  ],
  base: '',
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
  },
  server: {
    port: 8080,
  },
  preview: {
    port: 8080,
  },
})
