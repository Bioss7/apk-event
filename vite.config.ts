import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
      '@shared': '/src/shared',
      "@features": "/src/features",
      "@widgets": "/src/widgets",
      "@store": "/src/store",
      "@pages": "/src/pages",
      "@app": "/src/app",
    },
  },
})
