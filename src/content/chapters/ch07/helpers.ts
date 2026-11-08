import type { ConceptCard, PracticeItem } from '../../types'

export const card = (id: string, title: string, short: string, detail: string): ConceptCard => ({
  id,
  title,
  short,
  detail,
})

export const item = (id: string, bucket: string, text: string, why: string): PracticeItem => ({
  id,
  bucket,
  text,
  why,
})

export const SECTION_A = 'IT in the Business Environment'
export const SECTION_B = 'Role of Financial Information'
export const SECTION_C = 'Information Systems'
