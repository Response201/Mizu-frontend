import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['@stripe/react-stripe-js'], 
    
     
    },
  },
  base: '/',  // Den här inställningen ser till att dina rutter hanteras korrekt
  optimizeDeps: {
    // För att se till att de specifika FontAwesome-modulerna optimeras under utveckling
    include: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons', '@fortawesome/free-regular-svg-icons'],
  },
});
