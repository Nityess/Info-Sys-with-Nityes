import type { ReactNode } from 'react'
import { LabPage } from '../labpage/LabPage'

interface Props {
  dark: boolean
  onToggleDark: () => void
  /** The settings gear */
  settingsSlot: ReactNode
}

/** Chapter 10 Data Security: the finished interactive page (public/chapter10/index.html) inside the site frame. */
export function Chapter10Page(props: Props) {
  return <LabPage heading="Chapter 10 · Data security" frameTitle="Chapter 10 Data Security lab" page="chapter10/index.html" {...props} />
}
