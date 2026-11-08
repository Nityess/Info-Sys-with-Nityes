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

export interface Unit {
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
