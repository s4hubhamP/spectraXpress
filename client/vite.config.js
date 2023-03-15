import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build should be stored inside the build directory
  build: {
    outDir: './build',
  },
})
