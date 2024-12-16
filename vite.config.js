import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Ta bort `external` för FontAwesome-ikoner eftersom de inte ska externaliseras
      external: [], // Om du inte har specifika externa beroenden att lägga till, lämna tomt
    },
  },
  base: '/',  // Den här inställningen ser till att dina rutter hanteras korrekt
  optimizeDeps: {
    // För att se till att de specifika FontAwesome-modulerna optimeras under utveckling
    include: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons', '@fortawesome/free-regular-svg-icons'],
  },
});
