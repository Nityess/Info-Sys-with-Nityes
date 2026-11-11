// A chapter page (public/chapter7/index.html or chapter8/index.html) opens one topic from its address, for example "#t13".
// Old links used section ids (s1 to s3) and topic codes ("1.3", "2.7.1"); both still work.

const SECTION_START: Record<string, string> = { s1: 't11', s2: 't21', s3: 't31' }

/** The page's topic id for a route: a topic code wins, then the start of the section, else the first topic. */
export function pageTopicId(sectionId?: string, topic?: string): string | undefined {
  if (topic && /^\d(\.\d){1,2}$/.test(topic)) return `t${topic.replace(/\./g, '')}`
  return sectionId ? SECTION_START[sectionId] : undefined
}

/** File to load inside the frame, with the topic after the hash when there is one. */
export function chapterPage(folder: 'chapter7' | 'chapter8', sectionId?: string, topic?: string): string {
  const id = pageTopicId(sectionId, topic)
  return `${folder}/index.html${id ? `#${id}` : ''}`
}
