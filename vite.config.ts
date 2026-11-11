/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { chapter7Plugin } from './scripts/chapter7Plugin.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), chapter7Plugin()],
  test: {
    environment: 'node',
    // The retired Chapter 7 boards and lessons: still in the repo, no longer built or tested (the app opens the new Chapter 7 page)
    exclude: ['**/node_modules/**', 'src/components/{board,topic,rail,lesson}/**', 'src/content/{chapter7,chapters,boards}/**'],
  },
})
