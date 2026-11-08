import type { Chapter } from '../types'
import { lo7a } from './ch10/lo7a'
import { lo7b } from './ch10/lo7b'
import { lo7c } from './ch10/lo7c'

// Titles come from docs/syllabus.md (LO7). Each built unit lives in ./ch10/<lo>.ts.
export const ch10: Chapter = {
  id: 'ch10',
  number: 10,
  title: 'Data security',
  lo: 'LO7',
  weight: 10,
  units: [
    lo7a,
    lo7b,
    lo7c,
    { id: 'ch10-lo7d', lo: 'LO7d', title: 'Cyber risks, computer fraud and improving cyber security' },
    { id: 'ch10-lo7e', lo: 'LO7e', title: 'Social media risks to data security' },
  ],
}
