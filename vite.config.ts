/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { chapter7Plugin } from './scripts/chapter7Plugin.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), chapter7Plugin()],
  test: { environment: 'node' },
})
