import type { Chapter } from '../types'
import { accurate, infoRequirements, typesOfInformation, valueOfInformation } from './ch07/sectionA1'
import { cativa, costAndValue, itDeliverySupport } from './ch07/sectionA2'
import { assumptions, limitations, otherSources, qualitative, statements, users } from './ch07/sectionB'
import { networks, software } from './ch07/sectionC'

// Structure follows the owner's Ch7 mind map: 3 sections, one unit per branch.
export const ch07: Chapter = {
  id: 'ch07',
  number: 7,
  title: 'Management information systems',
  lo: 'LO4',
  weight: 10,
  units: [
    infoRequirements,
    typesOfInformation,
    accurate,
    valueOfInformation,
    costAndValue,
    itDeliverySupport,
    cativa,
    users,
    assumptions,
    statements,
    qualitative,
    limitations,
    otherSources,
    software,
    networks,
  ],
}
