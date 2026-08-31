#!/usr/bin/env node
/* Zero-dep design-contract conformance suite.  node scripts/check-design-contract.mjs [srcDir] [outDir]
   Asserts 00-design-contract.md §2.2/§2.3 + the Ten Rules against BOTH the source and the built CSS.
   The load-bearing check is #1b: a Tailwind class the engine does not recognise emits NOTHING and
   fails silently — it looks styled in the editor and is invisible at runtime. Only the built CSS
   can prove a class survived. Regex-based on purpose: no deps, no parser, Node >= 18. */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const argv = process.argv.slice(2).filter(a => !a.startsWith('--'))
const SRC = argv[0] || 'src'
const OUT = argv[1] || 'out'
const fails = []
const fail = (file, line, check, msg) => fails.push({ file, line, check, msg })

/* ---- file inventory ------------------------------------------------------ */
const files = []
;(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name)
    if (e.isDirectory()) walk(p)
    else if (/\.(tsx|ts|css)$/.test(e.name)) files.push(p)
  }
})(SRC)
if (!files.length) { console.error(`FATAL: no .tsx/.ts/.css under ${SRC}/`); process.exit(1) }

const GLOBALS = files.find(f => f.endsWith('globals.css'))
const code = files.filter(f => /\.(tsx|ts)$/.test(f))          // authored components
const appFiles = files.filter(f => f.startsWith(join(SRC, 'app')))

/* Comments are prose: they contain words like `text-overflow` that are not classes.
   Blank them out but keep every newline so line numbers stay true. */
const blank = m => m.replace(/[^\n]/g, ' ')
const strip = s => s
  .replace(/\/\*[\s\S]*?\*\//g, blank)
  .replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + blank(m.slice(p.length)))
const read = f => strip(readFileSync(f, 'utf8'))
const lines = f => read(f).split('\n')
const scan = (list, re, cb) => {
  for (const f of list) lines(f).forEach((ln, i) => { for (const m of ln.matchAll(re)) cb(f, i + 1, m, ln) })
}

/* A Tailwind class = zero or more variants, then a utility.
   Variants: `sm:`, `motion-safe:`, `has-[summary:focus-visible]:`, `[&_code]:`.
   Utilities: `bg-primary`, `text-4xl`, `bg-primary/10`, `text-[0.875em]`.
   ponytail: one level of [] only — `[&[open]_svg]:` nests and is not matched. No utility
   in this codebase hides behind a nested arbitrary variant; widen the regex if one appears. */
const V = '(?:[a-z][a-z0-9-]*(?:\\[[^\\[\\]]*\\])?|\\[[^\\[\\]]*\\]):'
const val = '(?:\\[[^\\[\\]]*\\]|[a-z0-9][a-z0-9.-]*)(?:\\/[0-9]+)?'
const clsRe = pre => new RegExp(`(?<![-\\w])((?:${V})*)((?:${pre})-${val})`, 'g')
const COLOUR = clsRe('bg|text|border|shadow|outline')

/* ---- 1a. orphaned -dark tokens (§2.4) ------------------------------------ */
/* globals.css is excluded: it DEFINES --color-*-dark, and §2.5 mandates the
   `to-primary-dark` gradient stop. The two-survivor rule binds component code. */
const SURVIVORS = new Set(['text-secondary-dark', 'bg-primary-dark'])
scan(code, clsRe('[a-z][a-z0-9-]*'), (f, n, m) => {
  if (!m[2].endsWith('-dark') || SURVIVORS.has(m[2])) return
  fail(f, n, '1a orphan-token', `\`${m[1]}${m[2]}\` — only ${[...SURVIVORS].join(' / ')} survive §2.4`)
})

/* ---- 1b. every colour class in src/ is a real selector in the built CSS --- */
const cssDir = join(OUT, '_next/static/chunks')
const cssFiles = existsSync(cssDir) ? readdirSync(cssDir).filter(f => f.endsWith('.css')) : []
if (!cssFiles.length) {
  fail(`${cssDir}/*.css`, 0, '1b silent-drop', 'no built CSS — run the build; unrecognised classes cannot be detected')
} else {
  const css = cssFiles.map(f => readFileSync(join(cssDir, f), 'utf8')).join('')
  const emitted = new Set()
  for (const rule of css.matchAll(/([^{}]*)\{/g))                        // selector preludes only
    for (const c of rule[1].matchAll(/\.((?:\\.|[-\w])+)/g)) emitted.add(c[1].replace(/\\/g, ''))
  /* globals.css utilities go through @apply, which inlines them and emits no selector —
     and @apply hard-errors on an unknown utility, so it is already self-checking. */
  scan(code, COLOUR, (f, n, m) => {
    const cls = m[1] + m[2]
    if (!emitted.has(cls)) fail(f, n, '1b silent-drop', `\`${cls}\` is in no selector in the built CSS — Tailwind dropped it, the element renders unstyled`)
  })
}

/* ---- 2. banned breakpoints (Rule 1) -------------------------------------- */
/* `+` not `*`: `{ md: 'px-6 py-3' }` is an object key, not a variant — a variant is glued
   to its utility with no space. */
scan(code, /(?<![-\w:])((?:md|xl|2xl):(?:[a-z0-9[\]&_-]|:)+)/g, (f, n, m) => {
  if (/grid-cols-/.test(m[1])) return                                    // the one allowed exception
  fail(f, n, '2 banned-breakpoint', `\`${m[1]}\` — md:/xl:/2xl: are banned outside a grid-cols step; use sm: or lg:`)
})

/* ---- 3. arbitrary hex outside @theme (Rule 2) ---------------------------- */
for (const f of files) {
  const src = read(f)
  let theme = [-1, -1]
  const at = src.indexOf('@theme')
  if (f === GLOBALS && at >= 0) {
    let i = src.indexOf('{', at), depth = 0, j = i
    for (; j < src.length; j++) { if (src[j] === '{') depth++; else if (src[j] === '}' && !--depth) break }
    theme = [i, j]
  }
  for (const m of src.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
    if (m.index > theme[0] && m.index < theme[1]) continue
    const n = src.slice(0, m.index).split('\n').length
    fail(f, n, '3 arbitrary-hex', `\`${m[0]}\` outside @theme — use a §2.2 token (var(--color-…) or a bg-/text- class)`)
  }
}

/* ---- 4. heading type scale (§2.3, Rule 5) -------------------------------- */
const SCALE = {
  display: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance',
  h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance',
  h2: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance',
  h3: 'text-xl sm:text-2xl font-bold',
  h4: 'text-base sm:text-lg font-semibold',
}
const SIZE = /^(xs|sm|base|lg|xl|[2-9]xl)$/
/* Keep only the tokens the type-scale table legislates. Colour, margin and alignment
   utilities on a heading are the author's business; size/weight/tracking/balance are not. */
const typeSet = s => new Set(s.split(/\s+/).filter(Boolean).map(c => c.replace(/\[&_h[1-6]\]:/g, '')).filter(c => {
  const u = c.slice(c.lastIndexOf(':') + 1)
  return u === 'text-balance' || u.startsWith('font-') || u.startsWith('tracking-') || (u.startsWith('text-') && SIZE.test(u.slice(5)))
}))
const eq = (a, b) => a.size === b.size && [...a].every(x => b.has(x))
const ROLES = Object.entries(SCALE).map(([k, v]) => [k, typeSet(v)])
const checkHeading = (f, n, role, cls, what) => {
  const got = typeSet(cls)
  const allowed = role === 'h1' ? ['h1', 'display'] : [role]
  if (ROLES.some(([k, set]) => allowed.includes(k) && eq(got, set))) return
  const want = allowed.map(k => `${k}: "${SCALE[k]}"`).join('  |  ')
  fail(f, n, '4 type-scale', `${what} type classes {${[...got].join(' ')}} match no §2.3 row — required ${want}`)
}
for (const f of code) {
  const src = read(f)
  const at = i => src.slice(0, i).split('\n').length
  for (const m of src.matchAll(/<(?:motion\.)?h([1-6])\b[^>]*?>/gs)) {
    const cls = (m[0].match(/className\s*=\s*(?:"([^"]*)"|{?\s*'([^']*)')/) || [])[1] ?? (m[0].match(/className\s*=\s*'([^']*)'/) || [])[1]
    if (cls === undefined) { fail(f, at(m.index), '4 type-scale', `<h${m[1]}> has no static className — the §2.3 row cannot be verified`); continue }
    checkHeading(f, at(m.index), `h${m[1]}`, cls, `<h${m[1]}>`)
  }
  for (const m of src.matchAll(/(?:^|['"\s])((?:(?:sm:|lg:)?\[&_h([1-6])\]:[^\s'"]+\s*)+)/gm)) {
    if (!/text-|font-/.test(m[1])) continue
    checkHeading(f, at(m.index), `h${m[2]}`, m[1], `Prose [&_h${m[2]}]`)
  }
}

/* ---- 5. focus: instead of focus-visible: (Rule 6) ------------------------ */
scan(code.concat(GLOBALS ? [GLOBALS] : []), /(?<![-\w])(focus:[a-z0-9/[\]-]*)/g, (f, n, m) => {
  fail(f, n, '5 focus-variant', `\`${m[1]}\` fires on mouse click — use focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`)
})

/* ---- 6. globals.css structural guards (Rules 4 + 7) ---------------------- */
if (!GLOBALS) fail(join(SRC, 'app/globals.css'), 0, '6 globals', 'missing')
else {
  const g = read(GLOBALS)   // comment-stripped: §2.4's own NOTE quotes `@theme inline`
  const need = [
    [/@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/, 'prefers-reduced-motion: reduce block', 'add `@media (prefers-reduced-motion: reduce) { *,*::before,*::after { animation-duration:.01ms!important; transition-duration:.01ms!important } }`'],
    [/body\s*\{[^}]*overflow-x\s*:\s*clip/, '`body { overflow-x: clip }`', 'add `overflow-x: clip` to the body rule — Rule 4 structural guard'],
    [/--nav-h\s*:/, '`--nav-h`', 'add `:root { --nav-h: 4.75rem }` — one source of truth for navbar geometry'],
    [/scroll-padding-top\s*:/, '`scroll-padding-top`', 'add `html { scroll-padding-top: calc(var(--nav-h) + 1rem) }` so anchors clear the fixed nav'],
    [/@theme\s*\{/, '`@theme {`', 'use `@theme {`'],
  ]
  for (const [re, what, fix] of need)
    if (!re.test(g)) fail(GLOBALS, 0, '6 globals', `${what} not found — ${fix}`)

  /* 8. @theme inline keeps --color-* out of :root, which forces raw hex everywhere */
  const ti = g.indexOf('@theme inline')
  if (ti >= 0) fail(GLOBALS, g.slice(0, ti).split('\n').length, '8 theme-inline', '`@theme inline` keeps --color-* out of :root — use `@theme {`')

  /* 9. .text-gradient must not reach #574A44 (2.20:1) — §2.5 */
  const tg = g.match(/\.text-gradient\s*\{([^}]*)\}/)
  if (!tg) fail(GLOBALS, 0, '9 text-gradient', '`.text-gradient` not defined')
  else if (/\bto-secondary\b(?!-)/.test(tg[1]))
    fail(GLOBALS, g.slice(0, tg.index).split('\n').length, '9 text-gradient', '`to-secondary` (#574A44) is 2.20:1 — use `@apply bg-gradient-to-r from-primary-light to-primary-dark bg-clip-text text-transparent`')

  /* 10. a remote @import blocks first paint */
  for (const m of g.matchAll(/@import\s+url\(/g))
    fail(GLOBALS, g.slice(0, m.index).split('\n').length, '10 remote-import', 'remote `@import url(...)` blocks first paint — self-host via next/font')
}

/* ---- 7. scrollToSection is gone (single-page-app leftover) --------------- */
scan(files, /scrollToSection/g, (f, n) =>
  fail(f, n, '7 scrollToSection', 'single-page scroll helper — multipage routes navigate with next/link + #anchor'))

/* ---- 11. no client components under src/app/ (Rule 10) ------------------- */
for (const f of appFiles) {
  const first = readFileSync(f, 'utf8').split('\n').findIndex(l => /^\s*['"]use client['"]/.test(l))
  if (first >= 0) fail(f, first + 1, '11 use-client', "'use client' blocks `export const metadata` — keep routes server components, push state to the smallest leaf")
}

/* ---- 12. open:/group-open: --------------------------------------------
   The contract (and globals.css:47) claim these compile to nothing. That is FALSE for
   tailwindcss 4.1.18, which registers `i("open",["&:is([open], :popover-open, :open)"])`
   (node_modules/tailwindcss/dist/chunk-CT46QCH7.mjs). The check is kept because the
   contract mandates one accordion idiom and the codebase already uses `[&[open]_…]:`
   — but it is a consistency rule, not a silent-drop rule. Delete it if the contract is
   corrected; do NOT cite "emits nothing" as the reason. */
scan(code, /(?<![-\w[])((?:group-)?open:[a-z0-9[\]-]*)/g, (f, n, m) =>
  fail(f, n, '12 dead-variant', `\`${m[1]}\` — the contract mandates one accordion idiom: \`[&[open]_…]:\` or a plain \`details[open] > …\` rule (note: this variant DOES compile in tw 4.1.18)`))

/* ---- self-test: the two normalisers this suite's honesty rests on --------
   A broken regex here reports PASS on a broken codebase, which is the exact failure
   mode this package exists to catch.  node scripts/check-design-contract.mjs --selftest */
if (process.argv.includes('--selftest')) {
  const grab = s => [...s.matchAll(COLOUR)].map(m => m[1] + m[2])
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b) || (console.error('SELFTEST FAIL', a, '!=', b), process.exit(1))
  same(grab('className="hover:bg-primary-dark sm:text-lg"'), ['hover:bg-primary-dark', 'sm:text-lg'])
  same(grab('has-[summary:focus-visible]:outline-2'), ['has-[summary:focus-visible]:outline-2'])
  same(grab('[&_code]:text-[0.875em] sm:[&_h4]:text-lg'), ['[&_code]:text-[0.875em]', 'sm:[&_h4]:text-lg'])
  same(grab('bg-primary/10 text-white/80'), ['bg-primary/10', 'text-white/80'])
  same(grab('var(--color-text-primary)'), [])                      // custom property, not a class
  same(grab(strip('/* text-overflow never applies */')), [])       // prose in a comment
  same([...typeSet('mb-8 text-3xl font-bold text-balance sm:text-4xl lg:text-5xl tracking-tight text-text-primary')].sort(),
    [...typeSet(SCALE.h2)].sort())                                 // order + extras must not matter
  same(eq(typeSet('text-xl font-bold'), typeSet(SCALE.h3)), false) // a missing sm: step must fail
  console.log('selftest OK')
}

/* ---- report -------------------------------------------------------------- */
const counts = fails.reduce((a, x) => (a[x.check] = (a[x.check] || 0) + 1, a), {})
console.log(`design contract: ${files.length} source file(s) in ${SRC}/, ${cssFiles.length} built stylesheet(s) in ${cssDir}/`)
if (!fails.length) { console.log('PASS — all 12 assertions clean'); process.exit(0) }
console.error(`\nFAIL — ${fails.length} violation(s):\n`)
for (const v of fails.sort((a, b) => a.check.localeCompare(b.check) || a.file.localeCompare(b.file) || a.line - b.line))
  console.error(`  ${v.file}:${v.line}\n    [${v.check}] ${v.msg}`)
console.error('\nby check: ' + Object.entries(counts).sort().map(([k, n]) => `${k} ×${n}`).join(', '))
process.exit(1)
