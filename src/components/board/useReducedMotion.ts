import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/** True when the phone asks for reduced motion or the app's Reduce motion switch is on (it puts a class on the page). */
export function useReducedMotion(): boolean {
  const read = () => (typeof window !== 'undefined' && window.matchMedia?.(QUERY).matches) || document.documentElement.classList.contains('reduce-motion')
  const [reduced, setReduced] = useState(read)
  useEffect(() => {
    const mq = window.matchMedia?.(QUERY)
    const update = () => setReduced(read())
    mq?.addEventListener('change', update)
    const mo = new MutationObserver(update)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    update()
    return () => {
      mq?.removeEventListener('change', update)
      mo.disconnect()
    }
  }, [])
  return reduced
}
