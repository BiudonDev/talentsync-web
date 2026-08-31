#!/usr/bin/env node
/**
 * Legal-document fidelity guard.
 *
 * The markdown drafts in docs/plans/spec/ are the source of truth for what the
 * contract SAYS. src/data/legal/ is a hand conversion of them. A conversion can
 * lose a clause silently — nothing typechecks the absence of a paragraph — and
 * these are the two documents where a silently dropped sentence is a legal
 * problem, not a cosmetic one. So: five checks, each one a thing that has
 * actually gone wrong in a markdown-to-data conversion before.
 *
 *   1  clause parity   every `A1.1`-style clause number in the draft has a
 *                      matching `id` in the data, and vice versa. Deliberate
 *                      deletions live in DELTA below, each with its reason.
 *   2  text coverage   every draft sentence is checked against the converted
 *                      corpus by 5-word shingle overlap. Whole sentences that
 *                      vanish show up as near-zero coverage.
 *   3  anchors         every `[…](#id)` cross-reference resolves inside its own
 *                      document. A contract that cross-refers to a clause that
 *                      is not there is worse than one that does not cross-refer.
 *   4  tokens          every surviving `{{TOKEN}}` is named in BLOCKERS.md.
 *                      A token nobody was asked about never gets answered.
 *   5  D2              no surviving "we set no cookies" / Plausible claim.
 *
 * Run: node scripts/check-legal-fidelity.mjs [--verbose]
 * Exits non-zero on any failure. Type-stripping needs Node >= 22.18.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const VERBOSE = process.argv.includes('--verbose')
const SHINGLE = 5
const COVERAGE_FLOOR = 0.34

/**
 * Clause numbers present in the draft but deliberately absent from the data.
 * Every entry is a deletion the terms critic ordered in 08-critique-terms.md;
 * anything not on this list that goes missing is a lost clause.
 */
const DELTA = {
  'B5.3': 'spec B5.2 deleted per critique [HIGH] B5.1(b)/B5.2; B5.3 renumbered to B5.2',
  'B6.5': 'spec B6.4 folded into B6.2 per critique [HIGH] B6.2; B6.5 renumbered to B6.4',
  'C15.5': 'spec C15.4 deleted per critique [CRITICAL] AÜG; C15.5 renumbered to C15.4',
}

const fail = []
const note = (m) => VERBOSE && console.log('   ' + m)

/* ------------------------------------------------------------------ loading */

const load = async (file, name) => (await import(`${ROOT}/src/data/legal/${file}`))[name]
const docs = {
  privacy: await load('privacy.ts', 'privacy'),
  'candidate-privacy': await load('candidate-privacy.ts', 'candidatePrivacy'),
  terms: await load('terms.ts', 'terms'),
  cookies: await load('cookies.ts', 'cookies'),
  imprint: await load('imprint.ts', 'imprint'),
}

/** Every inline string in a document, in document order. */
const strings = (blocks, out = []) => {
  for (const b of blocks) {
    if (b.t) out.push(b.t)
    if (b.k === 'ul' || b.k === 'ol')
      for (const it of b.items) {
        out.push(typeof it === 'string' ? it : it.t)
        if (it && it.children) strings(it.children, out)
      }
    if (b.k === 'dl') for (const it of b.items) out.push(it.t, it.d)
    if (b.k === 'note') out.push(...b.body)
    if (b.k === 'table') {
      out.push(...b.head, ...b.rows.flat())
      if (b.caption) out.push(b.caption)
    }
    if (b.children) strings(b.children, out)
  }
  return out
}

const walk = (blocks, fn) => {
  for (const b of blocks) {
    fn(b)
    if (b.children) walk(b.children, fn)
    if (b.items) for (const it of b.items) if (it && it.children) walk(it.children, fn)
  }
}

/** Typographic noise is not a fidelity difference; markdown syntax is not either. */
const norm = (s) =>
  String(s)
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—−]/g, '-')
    .replace(/ /g, ' ')
    .replace(/[*`_#>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

/* ------------------------------------------------------- 1 · clause parity */

const draft = readFileSync(`${ROOT}/docs/plans/spec/04-terms.md`, 'utf8').split('\n## OPEN QUESTIONS')[0]

const specClauses = new Set()
for (const line of draft.split('\n')) {
  const m = line.match(/^\*{0,2}([A-E]\d{1,2}\.\d{1,2})\b/)
  if (m) specClauses.add(m[1])
}
const codeClauses = new Set()
walk(docs.terms.body, (b) => b.k === 'c' && codeClauses.add(b.id.replace('-', '.')))

const lost = [...specClauses].filter((id) => !codeClauses.has(id) && !DELTA[id])
console.log(`1 clause parity   draft ${specClauses.size} · data ${codeClauses.size} · known deltas ${Object.keys(DELTA).length}`)
if (lost.length) fail.push(`LOST CLAUSES (in 04-terms.md, absent from terms.ts): ${lost.join(', ')}`)
for (const [id, why] of Object.entries(DELTA)) if (codeClauses.has(id)) note(`stale DELTA entry ${id} — the clause is back: ${why}`)

/* ------------------------------------------------------- 2 · text coverage */

const PAIRS = [
  { md: '04-terms.md', corpus: ['terms'] },
  // Annex A lives at its own route (D1 row 21), so /privacy/ and /candidate-privacy/
  // are one corpus for coverage purposes.
  { md: '03-privacy-policy.md', corpus: ['privacy', 'candidate-privacy', 'cookies', 'imprint'] },
]

for (const { md, corpus } of PAIRS) {
  const words = norm(corpus.flatMap((k) => strings(docs[k].body)).join(' \n ')).split(' ')
  const shingles = new Set()
  for (let i = 0; i + SHINGLE <= words.length; i++) shingles.add(words.slice(i, i + SHINGLE).join(' '))

  const src = readFileSync(`${ROOT}/docs/plans/spec/${md}`, 'utf8').split('\n## OPEN QUESTIONS')[0]
  let tag = 'preamble'
  let n = 0
  let sum = 0
  const thin = []
  for (const raw of src.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    const h = line.match(/^#{1,4}\s+(.*)$/)
    if (h) {
      tag = h[1].replace(/[*`]/g, '').slice(0, 44)
      continue
    }
    const c = line.match(/^\*{0,2}([A-E]?\d{1,2}(\.\d{1,2})+)\b/)
    if (c) tag = c[1]
    for (const sentence of line.replace(/^\*{0,2}([A-E]?\d{1,2}(\.\d{1,2})+)\s*/, '').split(/(?<=[.;:])\s+(?=[A-Z(“"*])/)) {
      const w = norm(sentence).split(' ')
      if (w.length < 10) continue
      let hit = 0
      let tot = 0
      for (let i = 0; i + SHINGLE <= w.length; i++) {
        tot++
        if (shingles.has(w.slice(i, i + SHINGLE).join(' '))) hit++
      }
      if (!tot) continue
      n++
      sum += hit / tot
      if (hit / tot < COVERAGE_FLOOR) thin.push({ tag, cov: hit / tot, s: w.join(' ') })
    }
  }
  const mean = sum / n
  console.log(`2 text coverage   ${md} → ${corpus.join('+')}: ${n} sentences, mean ${mean.toFixed(3)}, ${thin.length} below ${COVERAGE_FLOOR}`)
  for (const t of thin.sort((a, b) => a.cov - b.cov)) note(`[${t.cov.toFixed(2)}] ${t.tag}: ${t.s.slice(0, 150)}`)
  // A floor, not a ceiling: individual rewrites are expected (the critiques
  // ordered them). A COLLAPSE in the mean is what a lost section looks like.
  if (mean < 0.7) fail.push(`${md}: mean sentence coverage ${mean.toFixed(3)} < 0.70 — content lost in conversion`)
}

/* ------------------------------------------------------------- 3 · anchors */

for (const [slug, doc] of Object.entries(docs)) {
  const ids = new Set()
  walk(doc.body, (b) => b.id && ids.add(b.id))
  const own = new RegExp(`^(?:#|${doc.path.replace(/\//g, '\\/')}#)(.+)$`)
  const broken = new Set()
  let refs = 0
  for (const s of strings(doc.body))
    for (const m of String(s).matchAll(/\]\(([^)]+)\)/g)) {
      const hit = m[1].match(own)
      if (!hit) continue
      refs++
      if (!ids.has(hit[1])) broken.add(hit[1])
    }
  console.log(`3 anchors         ${slug.padEnd(18)} ${ids.size} ids · ${refs} same-page refs · ${broken.size} broken`)
  if (broken.size) fail.push(`${slug}: cross-references to ids that do not exist: ${[...broken].join(', ')}`)
}

/* -------------------------------------------------------------- 4 · tokens */

const blockers = readFileSync(`${ROOT}/docs/plans/BLOCKERS.md`, 'utf8')
const unasked = new Map()
let tokenTotal = 0
for (const [slug, doc] of Object.entries(docs))
  for (const s of strings(doc.body))
    for (const m of String(s).matchAll(/\{\{([A-Z0-9_]+)\}\}/g)) {
      tokenTotal++
      if (blockers.includes(m[1])) continue
      if (!unasked.has(m[1])) unasked.set(m[1], new Set())
      unasked.get(m[1]).add(slug)
    }
console.log(`4 tokens          ${tokenTotal} {{TOKEN}}s in rendered content · ${unasked.size} not named in BLOCKERS.md`)
for (const [t, where] of unasked) fail.push(`{{${t}}} (${[...where].join(', ')}) is not in docs/plans/BLOCKERS.md — nobody will ever be asked for it`)

/* ------------------------------------------------------------------ 5 · D2 */

// D2: analytics is GA4 behind a consent banner. The drafts were written around
// Plausible and a no-cookie position; every trace of that has to be gone, and a
// legal document that contradicts what the site actually does is a liability.
const BANNED = [
  /\bplausible\b/i,
  /sets? no cookies (?:at all|whatsoever)/i,
  /no cookies of our own/i,
  /no cookies, no analytics/i,
  /(?:displays?|shows?) no (?:cookie )?banner/i,
  /there is no banner/i,
]
let d2 = 0
for (const [slug, doc] of Object.entries(docs))
  for (const s of strings(doc.body))
    for (const re of BANNED)
      if (re.test(String(s))) {
        d2++
        fail.push(`${slug}: D2 contradiction — ${re} matches: "${String(s).slice(0, 120)}"`)
      }
console.log(`5 D2 (GA4)        ${d2} surviving no-cookie / Plausible claims`)

/* -------------------------------------------------------------------- exit */

console.log()
if (fail.length) {
  for (const f of fail) console.error('FAIL  ' + f)
  process.exit(1)
}
console.log('legal fidelity OK')
