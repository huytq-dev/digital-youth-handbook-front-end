import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('@reduxjs') || id.includes('react-redux')) {
              return 'redux-vendor';
            }
            if (id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
              return 'form-vendor';
            }
            // Các vendor khác
            return 'vendor';
          }
          
          // Feature chunks - tách theo features
          if (id.includes('/features/auth') || id.includes('/pages/auth')) {
            return 'auth';
          }
          if (id.includes('/features/quiz') || id.includes('/pages/quiz')) {
            return 'quiz';
          }
          if (id.includes('/features/profile') || id.includes('/pages/profile')) {
            return 'profile';
          }
          if (id.includes('/features/learning-topics') || id.includes('/pages/learning-topics')) {
            return 'learning';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
