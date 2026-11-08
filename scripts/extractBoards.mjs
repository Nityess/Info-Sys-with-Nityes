// Builds app/src/content/boards/*.json and the icon set from the designer's handoff files, copying their data verbatim.
//   node scripts/extractBoards.mjs            (run inside app/; reads ../landing-handoff)
// The design files keep their data inline in a script block. This evaluates only that block (helpers C, S, I, R, N, D)
// in a sandbox, so nothing is retyped by hand. MCQ items stay as { mcq: n } references into the question banks.
// Animation step data comes from design/source/dm7.js and dm8.js (the files hold stale copies of it).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const hand = join(root, '..', 'landing-handoff')
const out = join(root, 'src', 'content', 'boards')
mkdirSync(out, { recursive: true })

const BOARDS = [
  { id: 'c7s1', file: 'Section1', chapter: 7, section: 1, dm: null },
  { id: 'c7s2', file: 'Section2', chapter: 7, section: 2, dm: null },
  { id: 'c7s3', file: 'Section3', chapter: 7, section: 3, dm: 'dm7.js' },
  { id: 'c8s1', file: 'Ch8Section1', chapter: 8, section: 1, dm: 'dm8.js' },
  { id: 'c8s2', file: 'Ch8Section2', chapter: 8, section: 2, dm: null },
  { id: 'c8s3', file: 'Ch8Section3', chapter: 8, section: 3, dm: null },
]

const HELPERS = `
var C = function (ic, tag, mean, ex) { return { ic: ic, tag: tag, mean: mean, ex: ex }; };
var S = function (name, sub, ic) { return { name: name, sub: sub, ic: ic }; };
var I = function (q, cat, why) { return { q: q, cat: cat, why: why }; };
var R = function (x, y, w, h, label, k) { return { x: x, y: y, w: w, h: h, label: label, k: k }; };
var N = function (x, y, w, h, ic, t, s, k, bar) { return { x: x, y: y, w: w, h: h, ic: ic, t: t, s: s, k: k, bar: bar }; };
var D = function (x, y, w, h, t, o) { return { x: x, y: y, w: w, h: h, t: t, o: o || {} }; };
var fmt = function (n) { return String(n); };
`

const run = (code) => vm.runInNewContext(code, {}, { timeout: 5000 })
const read = (p) => readFileSync(p, 'utf8')
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')

const iconUnion = new Map()

for (const b of BOARDS) {
  const html = read(join(hand, 'design', `${b.file}.dc.html`))
  const start = html.indexOf('    var C = function')
  const end = html.indexOf('    var t = s.t')
  if (start < 0 || end < 0) throw new Error(`${b.file}: data block not found`)
  let block = html.slice(start, end)
  // MCQ items become references; the text comes from the question bank at run time.
  block = block.replace(/var Q = function \(n\) \{[^\n]*\};/, 'var Q = function (n) { return { mcq: n }; };')
  const data = run(`${HELPERS}\n${block.replace(/^\s*var (C|S|I|R|N|D|fmt) = function[^\n]*\n/gm, '')}\n({ SC: SC, T: T, DM: typeof DM === 'undefined' ? {} : DM, MQ: MQ })`)

  let DM = {}
  if (b.dm) {
    DM = run(`${HELPERS}\n(${read(join(hand, 'design', 'source', b.dm)).trim().replace(/;\s*$/, '')})`)
    if (b.dm === 'dm8.js' && JSON.stringify(DM) !== JSON.stringify(data.DM)) console.warn(`${b.file}: dm8.js differs from the copy inside the html (using dm8.js)`)
  }

  const topics = data.T.map((t) => {
    const demo = DM[t.id] ?? null
    const scene = demo ? null : (data.SC[t.id] ?? null)
    const topic = { ...t }
    if (demo) topic.demo = demo
    if (scene) topic.scene = scene
    return topic
  })

  const h1 = decode(/<h1[^>]*>([^<]+)<\/h1>/.exec(html)[1])
  const blurb = decode(/<p style="margin:0;color:var\(--muted\)">([^<]+)<\/p>/.exec(html)[1])
  const mcqUsed = [...new Set(topics.flatMap((t) => (t.game?.items ?? []).filter((i) => i.mcq != null).map((i) => i.mcq)))].sort((a, c) => a - c)
  const board = { id: b.id, chapter: b.chapter, section: b.section, title: h1, blurb, topics, mcqUsed }
  writeFileSync(join(out, `${b.id}.json`), JSON.stringify(board))
  console.log(b.id, 'topics', topics.length, 'demos', topics.filter((t) => t.demo).length, 'scenes', topics.filter((t) => t.scene).length, 'mcq', mcqUsed.join(','))

  for (const m of html.matchAll(/<symbol id="i-([\w-]+)" viewBox="0 0 24 24">([\s\S]*?)<\/symbol>/g)) {
    const els = [...m[2].matchAll(/<(\w+)([^>]*?)\/?>(?:<\/\1>)?/g)].map((e) => [e[1], Object.fromEntries([...e[2].matchAll(/([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]))])
    if (!iconUnion.has(m[1]) || els.length > iconUnion.get(m[1]).length) iconUnion.set(m[1], els)
  }
}

// Question banks, as the teacher wrote them. Em dashes are not allowed in the app's copy, so " — " becomes ", " exactly as the design files do.
for (const [file, id] of [['chapter7-mcq-bank.json', 'mcq7'], ['chapter8-mcq-bank.json', 'mcq8']]) {
  const bank = JSON.parse(read(join(hand, 'data', file)))
  const fix = (s) => s.replace(/\s+—\s+/g, ', ').replace(/—/g, ', ')
  const slim = bank.map((x) => ({ n: x.n, q: fix(x.q), opts: x.opts.map(fix), ans: x.ans, why: fix(x.why) }))
  writeFileSync(join(out, `${id}.json`), JSON.stringify(slim))
  console.log(id, slim.length, 'questions')
}

const names = [...iconUnion.keys()].sort()
const fmtEl = ([t, a]) => `['${t}', { ${Object.entries(a).map(([k, v]) => `${k}: '${v}'`).join(', ')} }]`
const iconSrc = `// Generated by scripts/extractBoards.mjs from the design sprite (24 by 24 grid, 1.8 stroke). Do not edit by hand.\n\nexport type IconShape = readonly [tag: string, attrs: Readonly<Record<string, string>>]\n\nexport const ICONS: Readonly<Record<string, readonly IconShape[]>> = {\n${names.map((n) => `  ${/^[a-z]+$/.test(n) ? n : `'${n}'`}: [${iconUnion.get(n).map(fmtEl).join(', ')}],`).join('\n')}\n}\n`
writeFileSync(join(out, 'iconData.ts'), iconSrc)
console.log('icons', names.length, names.join(' '))
