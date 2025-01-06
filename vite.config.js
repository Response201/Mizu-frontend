import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT') {
          console.error('Unresolved import:', warning.source);
        } else {
          warn(warning);
        }
      },}
  },
  base: '/',  // Ensure your routes are handled correctly
  optimizeDeps: {
    // Make sure specific FontAwesome modules are optimized during development
    include: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons', '@fortawesome/free-regular-svg-icons'],
  },
});
