import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: This must match your repository name exactly
  // If your repo is https://github.com/user/MyRepo, this should be '/MyRepo/'
  base: '/HumanLayers/', 
  define: {
    // This prevents the "process is not defined" crash in the browser
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})