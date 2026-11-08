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
}
