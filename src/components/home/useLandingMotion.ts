import { useEffect } from 'react'
import type { RefObject } from 'react'
import { useSettings } from '../../state/useSettings'

/** True when motion should be off: the Reduce motion setting or the phone's own preference. */
export function useCalm(): boolean {
  const { settings } = useSettings()
  return settings.reduceMotion || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
}

/**
 * Sections fade up and the mark bars draw in the first time they scroll into view.
 * Elements are armed here, not in the markup, so nothing is hidden if this never runs.
 */
export function useReveal(root: RefObject<HTMLElement | null>) {
  const calm = useCalm()
  useEffect(() => {
    const el = root.current
    if (!el || calm || !('IntersectionObserver' in window)) return
    const targets = [...el.querySelectorAll<HTMLElement>('.lp-reveal, .lp-bars')]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      },
      { threshold: 0.15 },
    )
    for (const t of targets) {
      t.classList.add('armed')
      io.observe(t)
    }
    return () => {
      io.disconnect()
      for (const t of targets) t.classList.remove('armed', 'in')
    }
  }, [root, calm])
}

/** Smooth scroll to a section, or an instant jump when motion is reduced. */
export function scrollToId(id: string, calm: boolean) {
  document.getElementById(id)?.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' })
}
