import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  preview: {
        allowedHosts: [
            "frontend-production-98e2.up.railway.app",
        ],
    },
})
