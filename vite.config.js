import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      pages: "/src/pages",
      admin_pages: "/src/admin/pages",
      auth: "/src/admin/auth",
      services: "/src/services",
      utils: "/src/utils",
    },
  }, optimizeDeps: {
    include: ['@fortawesome/react-fontawesome', 'firebase/app', 'firebase/auth', 'swiper/react'],
  }
  
});

