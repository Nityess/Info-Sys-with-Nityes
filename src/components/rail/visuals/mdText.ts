// Test helper: does a phrase appear in content/chapter7.md? Quotes, dashes and markdown marks are ignored.

import md from '../../../../content/chapter7.md?raw'

const norm = (s: string): string =>
  s
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/[*`_]/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase()

const text = norm(md)

export const mdHas = (phrase: string): boolean => text.includes(norm(phrase))

/** The phrases that are missing from the md, for a readable test failure. */
export const missingFromMd = (phrases: readonly string[]): string[] => phrases.filter((p) => !mdHas(p))
