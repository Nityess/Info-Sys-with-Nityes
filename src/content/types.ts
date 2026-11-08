/** One multiple-choice item. Every item must come from the question bank, mock or pre-test files. */
export interface QuizItem {
  id: string
  question: string
  /** Optional numbered statements shown between the question and the options */
  statements?: string[]
  options: string[]
  /** Index into options of the correct answer */
  answer: number
  explanation: string
  /** Where the item comes from, e.g. "ICAN Ch10 question bank Q11 (1 mark)" */
  source: string
}

/** Text for the HintBar tabs */
export interface UnitHints {
  hint?: string
  insight?: string
  mcq?: string
}

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
  /** Stable id used for progress, e.g. "ch10-lo7a" */
  id: string
  /** Syllabus learning outcome sub-point, e.g. "LO7a" */
  lo: string
  title: string
  /** Key into the lab registry. Not built yet when undefined. */
  labId?: string
  /** Learning objective shown at the top of the lab */
  objective?: string
  hints?: UnitHints
  quiz?: QuizItem[]
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
