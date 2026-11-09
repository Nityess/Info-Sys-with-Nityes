/** One concept card (a mind-map leaf) with its textbook explanation */
export interface ConceptCard {
  id: string
  /** Emoji shown on the mind-map node */
  icon: string
  /** Leaf label, as on the owner's mind map */
  title: string
  /** Short label used on practice buttons */
  short: string
  detail: string
}

/** A practice item: which card does this example belong to? */
export interface PracticeItem {
  id: string
  text: string
  /** ConceptCard id */
  bucket: string
  why: string
}

/** Marks a unit as a topic of the rebuilt Chapter 7 (it renders the lesson rail). */
export interface TopicInfo {
  /** "1.5" */
  code: string
  teachingAid?: string
  playground?: boolean
  fromStudyText?: boolean
}

export interface Unit {
  /** Set on the rebuilt Chapter 7 topics */
  topic?: TopicInfo
  /** "s1", "s2" or "s3" on the rebuilt Chapter 7 topics, for the section page link */
  sectionId?: string
  /** Short text in the middle of the lesson's mind map */
  hub?: string
  /** Section heading shown above this unit in the sidebar */
  section?: string
  /** Data-driven lab: concept cards (visualizer) + practice sorter (lab) */
  cards?: ConceptCard[]
  practice?: PracticeItem[]
  /** Stable id used for progress, e.g. "ch07-t1-2" */
  id: string
  /** Syllabus learning outcome sub-point, e.g. "LO4a" */
  lo: string
  title: string
}

export interface Chapter {
  id: string
  number: number
  title: string
  /** Learning outcome this chapter covers, e.g. "LO7" */
  lo: string
  /** Exam weighting in percent (from the mark weightage deck) */
  weight: number
  units: Unit[]
}
