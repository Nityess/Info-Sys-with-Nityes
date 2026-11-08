import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import { parseChapter } from '../src/content/chapter7/parse.ts'

const ID = 'virtual:chapter7'
const RESOLVED = '\0' + ID

/**
 * Turns content/chapter7.md into a virtual module at build time. Students get the parsed topics
 * (text, quizzes, answer keys); the App Spec blocks and builder notes are dropped by the parser.
 */
export function chapter7Plugin(): Plugin {
  const file = fileURLToPath(new URL('../content/chapter7.md', import.meta.url))
  return {
    name: 'chapter7-content',
    resolveId(id) {
      return id === ID ? RESOLVED : undefined
    },
    load(id) {
      if (id !== RESOLVED) return undefined
      this.addWatchFile(file)
      return `export const topics = ${JSON.stringify(parseChapter(readFileSync(file, 'utf-8')))}`
    },
  }
}
