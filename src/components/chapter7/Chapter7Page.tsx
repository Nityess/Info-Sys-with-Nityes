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

/** Chapter 7 Information in business: the finished Information in Business Lab (public/chapter7/index.html) inside the site frame. */
export function Chapter7Page({ sectionId, topic, ...rest }: Props) {
  return <LabPage heading="Chapter 7 · Information in business" frameTitle="Chapter 7 Information in Business Lab" page={chapterPage('chapter7', sectionId, topic)} {...rest} />
}
