import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

type Scene = LazyExoticComponent<ComponentType>

/** One lazy scene per topic, so a scene downloads only when its topic is opened. Topic 1.1 has none (locked, coming soon). */
export const SCENES: Readonly<Record<string, Scene>> = {
  '1.2': lazy(() => import('./Scene12').then((m) => ({ default: m.Scene12 }))),
  '1.3': lazy(() => import('./Scene13').then((m) => ({ default: m.Scene13 }))),
  '1.4': lazy(() => import('./Scene14').then((m) => ({ default: m.Scene14 }))),
  '1.5': lazy(() => import('./Scene15').then((m) => ({ default: m.Scene15 }))),
  '1.6': lazy(() => import('./Scene16').then((m) => ({ default: m.Scene16 }))),
  '1.7': lazy(() => import('./Scene17').then((m) => ({ default: m.Scene17 }))),
  '1.8': lazy(() => import('./Scene18').then((m) => ({ default: m.Scene18 }))),
  '1.9': lazy(() => import('./Scene19').then((m) => ({ default: m.Scene19 }))),
  '2.1': lazy(() => import('./Scene21').then((m) => ({ default: m.Scene21 }))),
  '2.2': lazy(() => import('./Scene22').then((m) => ({ default: m.Scene22 }))),
  '2.3': lazy(() => import('./Scene23').then((m) => ({ default: m.Scene23 }))),
  '2.4': lazy(() => import('./Scene24').then((m) => ({ default: m.Scene24 }))),
  '2.5': lazy(() => import('./Scene25').then((m) => ({ default: m.Scene25 }))),
  start: lazy(() => import('./Scene30').then((m) => ({ default: m.Scene30 }))),
  '3.1': lazy(() => import('./Scene31').then((m) => ({ default: m.Scene31 }))),
  '3.2': lazy(() => import('./Scene32').then((m) => ({ default: m.Scene32 }))),
  '3.3': lazy(() => import('./Scene33').then((m) => ({ default: m.Scene33 }))),
  '3.4': lazy(() => import('./Scene34').then((m) => ({ default: m.Scene34 }))),
}

export const sceneFor = (code: string): Scene | undefined => SCENES[code]
