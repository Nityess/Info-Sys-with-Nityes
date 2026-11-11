import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { SettingsMenu } from './components/SettingsMenu'
import { useProgress } from './state/progress'
import { Chapter10Page } from './components/chapter10/Chapter10Page'
import { Chapter7Page } from './components/chapter7/Chapter7Page'
import { Chapter8Page } from './components/chapter8/Chapter8Page'
import { Chapter9Hub } from './components/chapter9/Chapter9Hub'
import { SimPage } from './components/chapter9/SimPage'
import { findSim, simProgressId } from './content/chapter9/topics'
import { TEXT_PX } from './state/settings'
import { useRoute } from './state/useRoute'
import { useSettings } from './state/useSettings'

// Lazy so the animation library only downloads when the landing page is opened
const Landing = lazy(() => import('./components/home/Landing').then((m) => ({ default: m.Landing })))

const THEME_KEY = 'ican-is-lab:theme'
const SITE = 'Info System with ca.nityes'

function initialDark(): boolean {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved) return saved === 'dark'
  } catch {
    // ignore
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

export default function App() {
  const { started, markStarted } = useProgress()
  const { raw, settings, set } = useSettings()
  const route = useRoute()
  const [dark, setDark] = useState(initialDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
    } catch {
      // ignore
    }
  }, [dark])

  useEffect(() => {
    document.documentElement.style.fontSize = `${TEXT_PX[settings.textSize]}px`
  }, [settings.textSize])

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', settings.reduceMotion)
  }, [settings.reduceMotion])

  const sim = route.view === 'sim' ? findSim(route.slug) : undefined
  const simReady = sim?.ready ? sim : undefined
  const openSim = useCallback((slug: string) => markStarted(simProgressId(slug)), [markStarted])

  useEffect(() => {
    const what = simReady
      ? `${simReady.number} ${simReady.title}`
      : route.view === 'chapter7'
        ? 'Chapter 7 Information in business'
        : route.view === 'chapter8'
          ? 'Chapter 8 Types and control of MIS'
          : route.view === 'chapter9'
            ? 'Chapter 9 Financial technology'
            : route.view === 'chapter10'
              ? 'Chapter 10 Data security'
              : null
    document.title = what ? `${what} | ${SITE}` : `${SITE} | ICAN Foundation Information Systems`
  }, [simReady, route.view])

  const toggleDark = () => setDark((d) => !d)
  const settingsMenu = <SettingsMenu raw={raw} onChange={set} dark={dark} onToggleDark={toggleDark} />

  if (route.view === 'chapter7') {
    return <Chapter7Page sectionId={route.id} topic={route.topic} dark={dark} onToggleDark={toggleDark} settingsSlot={settingsMenu} />
  }

  if (route.view === 'chapter8') {
    return <Chapter8Page sectionId={route.id} topic={route.topic} dark={dark} onToggleDark={toggleDark} settingsSlot={settingsMenu} />
  }

  if (route.view === 'chapter9') {
    return <Chapter9Hub started={started} dark={dark} onToggleDark={toggleDark} settingsSlot={settingsMenu} />
  }

  if (simReady) {
    return <SimPage topic={simReady} dark={dark} onToggleDark={toggleDark} settingsSlot={settingsMenu} onOpen={openSim} />
  }

  if (route.view === 'chapter10') {
    return <Chapter10Page dark={dark} onToggleDark={toggleDark} settingsSlot={settingsMenu} />
  }

  return (
    <Suspense fallback={<div className="h-full bg-mist dark:bg-slate-950" />}>
      <Landing
        started={started}
        dark={dark}
        onToggleDark={toggleDark}
        settingsSlot={<SettingsMenu raw={raw} onChange={set} dark={dark} onToggleDark={toggleDark} onDark />}
      />
    </Suspense>
  )
}
