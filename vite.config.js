import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Remove `@stripe/react-stripe-js` from `external` to bundle it correctly
      // external: ['@stripe/react-stripe-js'],
    },
  },
  base: '/',  // Ensure your routes are handled correctly
  optimizeDeps: {
    // Make sure specific FontAwesome modules are optimized during development
    include: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons', '@fortawesome/free-regular-svg-icons'],
  },
});
