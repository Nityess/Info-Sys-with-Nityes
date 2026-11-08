import type { Chapter } from '../types'
import { ch07Topics } from './ch07/topicsChapter'
import { ch10 } from './ch10'

// What everyone sees. Chapter 7 is the rebuilt 18-topic version (cutover done 2026-11-08).
// Add chapters here as they are built (see CLAUDE.md working method).
export const chapters: Chapter[] = [ch07Topics, ch10]
