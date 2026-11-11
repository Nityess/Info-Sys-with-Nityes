// Shape of the board data in src/content/boards/*.json, which scripts/extractBoards.mjs copies from the designer's files.

export interface DemoOpts {
  /** box, cell, hdr, txt, chip, note, ln, tube, reg, bar, sym, ar (cap and dot are added by the engine) */
  k?: string
  row?: number
  /** Appears at this step and stays */
  from?: number
  /** Visible only from the first step to the second, inclusive */
  on?: readonly [number, number]
  /** Highlight windows: hi is the strong one, hi2 the second */
  hi?: readonly [number, number] | null
  hi2?: readonly [number, number] | null
  /** Hidden when motion is reduced (the "before" value) */
  old?: number
  /** Moving packet along the item */
  pk?: number
  al?: string
  c?: string
  /** Text size in container width units */
  f?: number
  s?: string
  ic?: string
}

export interface DemoItem {
  x: number
  y: number
  w: number
  h: number
  t: string
  o: DemoOpts
}

export interface Demo {
  h: number
  n: number
  items: DemoItem[]
  caps: string[]
}

export interface SceneNode {
  x: number
  y: number
  w: number
  h: number
  ic?: string
  t: string
  s: string
  /** in, pr, out, bad (the four type colours), env, it, def */
  k?: string
  bar?: number
}

export interface SceneRegion {
  x: number
  y: number
  w: number
  h: number
  label: string
  k: string
}

export interface Scene {
  h: number
  regions: SceneRegion[]
  nodes: SceneNode[]
  links: [number, number][]
}

export interface Card {
  ic: string
  tag: string
  mean: string
  ex: string
}

export interface Group {
  k: string
  cards: Card[]
}

export interface ClassifyItem {
  q: string
  cat: number
  why: string
}

/** A real exam question, by number in the question bank */
export interface McqRef {
  mcq: number
}

export type GameItem = ClassifyItem | McqRef

export interface Game {
  title: string
  cats: string[]
  items: GameItem[]
}

export interface Topic {
  n: string
  id: string
  name: string
  ic: string
  /** "memory aid" on mnemonics */
  aid?: string
  line: string
  remember: string
  simple: string
  frames: [string, string][]
  gls: [string, string][]
  groups?: Group[]
  game?: Game
  demo?: Demo
  scene?: Scene
}

export interface Board {
  id: string
  chapter: 7
  section: 1 | 2 | 3
  title: string
  blurb: string
  topics: Topic[]
  mcqUsed: number[]
}

export interface Mcq {
  n: number
  q: string
  opts: string[]
  ans: number
  why: string
}

export interface Question {
  q: string
  cat: number
  why: string
  /** Own four options (real questions); classification items use the game's shared categories */
  opts?: string[]
}
