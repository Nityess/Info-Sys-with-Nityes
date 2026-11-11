import { useSettings } from '../../state/useSettings'

/** True when motion should be off: the Reduce motion setting or the phone's own preference. */
export function useCalm(): boolean {
  const { settings } = useSettings()
  return settings.reduceMotion || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
}

/** Smooth scroll to a section, or an instant jump when motion is reduced. */
export function scrollToId(id: string, calm: boolean) {
  document.getElementById(id)?.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' })
}
