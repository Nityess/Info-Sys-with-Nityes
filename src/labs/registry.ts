import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

export interface LabEntry {
  Visualizer: LazyExoticComponent<ComponentType>
  Lab: LazyExoticComponent<ComponentType>
}

// One entry per built lab, keyed by Unit.labId. Lazy so each lab loads only when opened.
export const labs: Record<string, LabEntry> = {
  lo7a: {
    Visualizer: lazy(() => import('./Lo7aImportance').then((m) => ({ default: m.Lo7aVisualizer }))),
    Lab: lazy(() => import('./Lo7aSorter').then((m) => ({ default: m.Lo7aSorter }))),
  },
  lo7b: {
    Visualizer: lazy(() => import('./Lo7bImpact').then((m) => ({ default: m.Lo7bVisualizer }))),
    Lab: lazy(() => import('./Lo7bSorter').then((m) => ({ default: m.Lo7bSorter }))),
  },
  lo7c: {
    Visualizer: lazy(() => import('./Lo7cControls').then((m) => ({ default: m.Lo7cVisualizer }))),
    Lab: lazy(() => import('./Lo7cPassword').then((m) => ({ default: m.Lo7cPassword }))),
  },
}
