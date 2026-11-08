import { useSyncExternalStore } from 'react'
import { parseHash } from './route'
import type { Route } from './route'

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

const read = () => window.location.hash

export function useRoute(): Route {
  return parseHash(useSyncExternalStore(subscribe, read, () => ''))
}

export function navigate(hash: string) {
  window.location.hash = hash
}
