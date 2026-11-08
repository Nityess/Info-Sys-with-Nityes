import type { Chapter, Unit } from '../../types'
import { infoRequirements } from './sectionA1'
import { TOPICS, displayTitle, sectionById, topicId } from './topics'

/**
 * The rebuilt Chapter 7: 18 topics from content/chapter7.md. Shown to students only once it is
 * complete; until then it appears in teacher mode as a preview.
 * Topic 1.1 is empty in the teaching file, so it reuses the textbook-based lesson for now.
 */
export const ch07Topics: Chapter = {
  id: 'ch07',
  number: 7,
  title: 'Management information systems',
  lo: 'LO4',
  weight: 10,
  units: TOPICS.map((t): Unit => {
    const section = sectionById(t.section)!
    const base: Unit = {
      id: topicId(t.code),
      lo: t.code,
      title: displayTitle(t),
      section: section.title,
      sectionId: section.id,
      topic: { code: t.code, teachingAid: t.teachingAid, playground: t.playground, fromStudyText: t.fromStudyText },
    }
    if (t.code !== '1.1') return base
    return {
      ...base,
      hub: infoRequirements.hub,
      objective: infoRequirements.objective,
      cards: infoRequirements.cards,
      practice: infoRequirements.practice,
    }
  }),
}
