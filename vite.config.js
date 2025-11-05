import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['tesseract.js', 'pdfjs-dist', 'mammoth']
  },
  build: {
    rollupOptions: {
      external: []
    },
    commonjsOptions: {
      include: [/tesseract.js/, /pdfjs-dist/, /mammoth/, /node_modules/]
    }
  },
  server: {
    port: 3000,
    open: true
  }
})