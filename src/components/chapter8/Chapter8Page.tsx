import type { ReactNode } from 'react'
import { LabPage } from '../labpage/LabPage'
import { chapterPage } from '../labpage/topicAddress'

interface Props {
  sectionId?: string
  topic?: string
  dark: boolean
  onToggleDark: () => void
  /** The settings gear */
  settingsSlot: ReactNode
}

/** Chapter 8 Types and control of MIS: the finished MIS Control Lab (public/chapter8/index.html) inside the site frame. */
export function Chapter8Page({ sectionId, topic, ...rest }: Props) {
  return <LabPage heading="Chapter 8 · Types and control of MIS" frameTitle="Chapter 8 MIS Control Lab" page={chapterPage('chapter8', sectionId, topic)} {...rest} />
}
