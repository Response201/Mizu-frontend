import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['@fortawesome/free-solid-svg-icons', '@fortawesome/free-regular-svg-icons'],
    },  // This is the default, but make sure it's set
  },
  base: '/',  // This ensures routes are handled properly
});
