import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 🔥 CHANGE THIS to your exact repository name
  base: '/OpenCodeUI/',
})