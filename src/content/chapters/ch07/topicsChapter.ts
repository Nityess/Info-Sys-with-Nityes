import type { Chapter, Unit } from '../../types'
import { TOPICS, displayTitle, sectionById, topicId } from './topics'

/**
 * Chapter 7: 18 topics from content/chapter7.md, shown to everyone since the cutover.
 * Topics whose lesson is not built yet (see BUILT_TOPICS) show as "Soon". Topic 1.1 has no teaching text yet.
 */
export const ch07Topics: Chapter = {
  id: 'ch07',
  number: 7,
  title: 'Management information systems',
  lo: 'LO4',
  weight: 10,
  units: TOPICS.map((t): Unit => {
    const section = sectionById(t.section)!
    return {
      id: topicId(t.code),
      lo: t.code,
      title: displayTitle(t),
      section: section.title,
      sectionId: section.id,
      topic: { code: t.code, teachingAid: t.teachingAid, playground: t.playground, fromStudyText: t.fromStudyText },
    }
  }),
}
