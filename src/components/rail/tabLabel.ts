export const plain = (h: string) => h.replace(/^\d+\.\s*/, '')

/** "Principle 1 - Information obtained but not used" becomes the short tab label "Principle 1". */
export function tabLabel(heading: string): string {
  const text = plain(heading)
  const [first] = text.split(' - ')
  return first.length <= 16 ? first : text
}
