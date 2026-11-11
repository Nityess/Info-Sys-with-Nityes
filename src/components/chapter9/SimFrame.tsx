import { useCallback, useEffect, useRef, useState } from 'react'
import { clampFrameHeight, contentHeight } from './simFrameLogic'

interface Props {
  src: string
  title: string
  dark: boolean
}

/**
 * One simulator page in an iframe. The page is a static file on the same origin, so the app can read its height
 * (the frame grows with the content and the page has one scroll bar) and pass in the light or dark choice.
 * The simulators are not edited: nothing is injected into them.
 */
export function SimFrame({ src, title, dark }: Props) {
  const frame = useRef<HTMLIFrameElement>(null)
  const watcher = useRef<ResizeObserver | null>(null)
  const [height, setHeight] = useState(clampFrameHeight(0))

  const sync = useCallback(() => {
    const doc = frame.current?.contentDocument
    if (!doc) return
    doc.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    setHeight(clampFrameHeight(contentHeight(doc)))
  }, [dark])

  // Theme follows the site, and the height is re-measured when the choice changes (dark pages can wrap differently)
  useEffect(sync, [sync])

  const attach = useCallback(() => {
    watcher.current?.disconnect()
    const doc = frame.current?.contentDocument
    const view = frame.current?.contentWindow
    sync()
    if (!doc || !view) return
    try {
      const Observer = (view as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver
      watcher.current = new Observer(() => sync())
      watcher.current.observe(doc.documentElement)
      watcher.current.observe(doc.body)
    } catch {
      // no observer in this browser: the height stays at its last measure, the page scrolls inside the frame
    }
  }, [sync])

  // The frame's load event waits for the simulator's web fonts, which can take a while on a slow connection.
  // So attach as soon as the page body exists (and again on load), checking a few times a second.
  useEffect(() => {
    const giveUp = Date.now() + 10000
    const timer = window.setInterval(() => {
      const doc = frame.current?.contentDocument
      if (doc && doc.URL !== 'about:blank' && doc.body) {
        window.clearInterval(timer)
        attach()
      } else if (Date.now() > giveUp) {
        window.clearInterval(timer)
      }
    }, 100)
    return () => {
      window.clearInterval(timer)
      watcher.current?.disconnect()
    }
  }, [attach])

  return (
    <iframe
      ref={frame}
      src={src}
      title={title}
      allow="fullscreen"
      onLoad={attach}
      scrolling="no"
      className="block w-full border-0 bg-transparent"
      style={{ height }}
    />
  )
}
