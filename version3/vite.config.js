import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 92,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 92,
    strictPort: true,
    allowedHosts: [
      'v1marige.shareprinto.com',
      'v2marige.shareprinto.com',
      'v3marige.shareprinto.com',
      'v4marige.shareprinto.com',
      '51.178.142.95',
    ],
  },
})

