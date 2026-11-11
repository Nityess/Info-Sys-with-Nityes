import type { ReactNode } from 'react'
import { scrollToId, useCalm } from './useLandingMotion'

interface Props {
  /** Id of the section on this page */
  to: string
  className?: string
  children: ReactNode
  'aria-label'?: string
}

/** An in-page link. The app uses hash routes, so it scrolls instead of changing the address. */
export function Jump({ to, className, children, 'aria-label': label }: Props) {
  const calm = useCalm()
  return (
    <a
      href={`#${to}`}
      className={className}
      aria-label={label}
      onClick={(e) => {
        e.preventDefault()
        scrollToId(to, calm)
      }}
    >
      {children}
    </a>
  )
}
