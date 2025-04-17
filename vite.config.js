import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Clean dist before each build
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
})