import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use relative base so assets resolve corretamente em subpastas (deploys como GitHub Pages/Netlify subpath)
  base: './',
  plugins: [react()],
})
