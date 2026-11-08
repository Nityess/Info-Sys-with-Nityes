import type { Chapter } from '../types'
import { ch07 } from './ch07'
import { ch07Topics } from './ch07/topicsChapter'
import { ch10 } from './ch10'

// What students see. Add chapters here as they are built (see CLAUDE.md working method).
export const chapters: Chapter[] = [ch07, ch10]

// Teacher preview: the same site with the rebuilt 18-topic Chapter 7 in place of the current one.
export const previewChapters: Chapter[] = [ch07Topics, ch10]
