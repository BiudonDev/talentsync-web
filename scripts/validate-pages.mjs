#!/usr/bin/env node
/* Zero-dep validator for the static export.  node scripts/validate-pages.mjs [outDir]
   Set BASE_URL=http://localhost:4321 to also HEAD-check every internal link on the served instance.
   Regex-parses build output on purpose: no deps, and generated HTML is well-formed. */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const OUT = process.argv[2] || 'out'
const BASE = process.env.BASE_URL
const fails = []
const fail = (f, sel, msg) => fails.push(`${f}\n    [${sel}] ${msg}`)

const pages = []
;(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name)
    if (e.isDirectory()) { if (!['_next','_not-found','404'].includes(e.name)) walk(p) }
    else if (e.name.endsWith('.html') && e.name !== '404.html') pages.push(p)
  }
})(OUT)
if (!pages.length) { console.error(`FATAL: no .html under ${OUT}/ — run \`npm run build\` first`); process.exit(1) }

const attr = (tag, n) => (tag.match(new RegExp(`\\s${n}\\s*=\\s*"([^"]*)"`, 'i')) || [])[1]
const metaOf = (raw, k) => {
  const t = raw.match(new RegExp(`<meta[^>]+(?:name|property)="${k}"[^>]*>`, 'i'))
  return t && attr(t[0], 'content')?.trim()
}
const routeOf = f => ('/' + relative(OUT, f)).replace(/index\.html$/, '').replace(/\.html$/, '/')
const text = html => html.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;|&#\d+;/gi, ' ').replace(/\s+/g, ' ').trim()
const ORIGIN = 'https://talentsync.eu'
const seen = { title: new Map(), desc: new Map(), summary: new Map() }
const routes = new Set(pages.map(routeOf))
const sentences = {}   // route -> Set of 12+-word sentences, for the D1.2 cannibalisation guard

/* 0. src/data/routes.ts is the frozen route list (D1) — parse it for drift + draft flags */
const ROUTES_TS = 'src/data/routes.ts'
let declared = []
let slugs = new Set()
if (!existsSync(ROUTES_TS)) fail(ROUTES_TS, 'routes', 'missing — the frozen route list (D1) has no source of truth, drift is unverifiable')
else {
  const src = readFileSync(ROUTES_TS, 'utf8')
  // ponytail: flags are read from the text between a path literal and whichever comes first,
  // the next path literal or the end of its object literal. Fine for a table of object
  // literals; if routes.ts ever stops being one, parse it properly.
  const hits = [...src.matchAll(/(['"`])(\/(?:[a-z0-9\-[\]]+\/)*)\1/g)]
  const byPath = new Map()
  hits.forEach((m, i) => {
    const block = src.slice(m.index, hits[i + 1]?.index ?? src.length).split('}')[0]
    const hidden = /draft:\s*true|noindex:\s*true|index:\s*false/.test(block)
    byPath.set(m[2], (byPath.get(m[2]) || false) || hidden)
  })
  declared = [...byPath].map(([path, hidden]) => ({
    path, hidden,
    re: new RegExp('^' + path.replace(/[.*+?^${}()|\\]/g, '\\$&').replace(/\[[^\]]+]/g, '[^/]+') + '$')
  }))
  // Dynamic children are built with a template literal, so accept `<declared parent>/<slug>/`
  // for any bare slug quoted anywhere in the file (the caseSlugs/insightSlugs/careerSlugs arrays).
  slugs = new Set([...src.matchAll(/'([a-z0-9]+(?:-[a-z0-9]+)*)'/g)].map(m => m[1]))
  if (!declared.length) fail(ROUTES_TS, 'routes', 'no route path literals found — check the export shape')
}
const declares = r => {
  if (declared.some(d => d.re.test(r))) return true
  const m = r.match(/^(\/.*\/)([a-z0-9-]+)\/$/)
  return !!m && slugs.has(m[2]) && declared.some(d => d.re.test(m[1]))
}
const isHidden = r => declared.some(d => d.hidden && d.re.test(r))

/* 1. structural no-overflow guard --------------------------------------- */
// Walk all of _next: Next has moved the stylesheet between static/chunks and
// static/css across versions, and a hardcoded dir throws ENOENT (a stack trace
// instead of a readable FAIL) the day it moves again.
let css = ''
;(function findCss(d) {
  if (!existsSync(d)) return
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name)
    if (e.isDirectory()) findCss(p)
    else if (e.name.endsWith('.css')) css += readFileSync(p, 'utf8')
  }
})(join(OUT, '_next'))
if (!css) fail('out/_next', 'stylesheet', 'no .css emitted — the overflow-x guard cannot be checked')
// `{` is in the class on purpose: Tailwind may emit `@layer base{body{…}}`.
else if (!/(?:^|[{},])\s*(?:html|body)[^{]*\{[^}]*overflow-x:\s*clip/.test(css))
  fail('src/app/globals.css', 'html,body', 'no `overflow-x: clip` guard: 320px overflow cannot be ruled out')

/* 2. per page ------------------------------------------------------------ */
for (const file of pages) {
  const raw = readFileSync(file, 'utf8')
  const f = relative(OUT, file)
  const body = raw.replace(/<script[\s\S]*?<\/script>/gi, '')      // drop RSC flight payload

  const title = (raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]?.trim()
  if (!title) fail(f, '<title>', 'missing or empty')
  else if (title.length < 15 || title.length > 60) fail(f, '<title>', `${title.length} chars, need 15-60 — "${title}"`)
  else if (seen.title.has(title)) fail(f, '<title>', `duplicate of ${seen.title.get(title)}`)
  if (title) seen.title.set(title, f)

  const dTag = raw.match(/<meta[^>]+name="description"[^>]*>/i)
  const desc = dTag && attr(dTag[0], 'content')?.trim()
  if (!desc) fail(f, 'meta[name=description]', 'missing or empty')
  else if (desc.length < 70 || desc.length > 160) fail(f, 'meta[name=description]', `${desc.length} chars, need 70-160`)
  else if (seen.desc.has(desc)) fail(f, 'meta[name=description]', `duplicate of ${seen.desc.get(desc)}`)
  if (desc) seen.desc.set(desc, f)

  const route = routeOf(file)
  const canon = raw.match(/<link[^>]+rel="canonical"[^>]*>/i)
  const canonHref = canon && attr(canon[0], 'href')
  if (!canonHref) fail(f, 'link[rel=canonical]', 'missing')
  else if (canonHref !== ORIGIN + route) fail(f, 'link[rel=canonical]', `is ${canonHref}, want ${ORIGIN + route} (inherited layout canonical?)`)

  for (const k of ['og:title', 'og:url', 'og:image', 'og:site_name', 'twitter:card'])
    if (!metaOf(raw, k)) fail(f, `meta[${k}]`, 'missing or empty')
  const ogUrl = metaOf(raw, 'og:url')
  if (ogUrl && ogUrl !== ORIGIN + route) fail(f, 'meta[og:url]', `is ${ogUrl}, want ${ORIGIN + route}`)

  if (isHidden(route) && !/<meta[^>]+name="robots"[^>]*content="[^"]*noindex/i.test(raw))
    fail(f, 'meta[robots]', 'draft/noindex route must emit content="noindex"')

  for (const [, json] of raw.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    let parsed
    try { parsed = JSON.parse(json) } catch (e) { fail(f, 'script[ld+json]', `invalid JSON: ${e.message}`); continue }
    const flat = JSON.stringify(parsed)
    if (/"@type":"Review"|"aggregateRating":/.test(flat)) fail(f, 'script[ld+json]', 'emits Review/aggregateRating — banned by D6')
  }

  for (const [, inner] of body.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/gi)) {
    const t = text(inner)
    if (!t) continue
    if (seen.summary.has(t) && seen.summary.get(t) !== f) fail(f, '<summary>', `duplicate FAQ question, also on ${seen.summary.get(t)} — "${t.slice(0, 60)}"`)
    else seen.summary.set(t, f)
  }

  // <main>, not <body>: the navbar and footer render identically on every route,
  // so comparing whole documents flags the shared chrome on every build and the
  // guard becomes noise. D1.2 is about body copy.
  if (route === '/tech-recruitment-eastern-europe/' || route === '/hire-software-developers-eastern-europe/')
    sentences[route] = new Set(text((body.match(/<main[^>]*>([\s\S]*)<\/main>/i)
      || body.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [, body])[1])
      .split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.split(/\s+/).length >= 12))

  const levels = [...body.matchAll(/<h([1-6])\b/gi)].map(m => +m[1])
  const h1s = levels.filter(l => l === 1).length
  if (h1s !== 1) fail(f, 'h1', `found ${h1s}, need exactly 1`)
  levels.reduce((prev, lvl, i) => {
    if (prev && lvl > prev + 1) fail(f, `h${lvl} #${i + 1}`, `heading jumps h${prev} -> h${lvl}`)
    return lvl
  }, 0)

  for (const [tag] of body.matchAll(/<img\b[^>]*>/gi)) {
    const src = attr(tag, 'src') || '(no src)'
    if (attr(tag, 'alt') === undefined) fail(f, `img[src="${src}"]`, 'no alt attribute')
    if (!attr(tag, 'width') || !attr(tag, 'height')) fail(f, `img[src="${src}"]`, 'no width/height attributes (CLS + srcset risk)')
  }

  for (const [tag] of body.matchAll(/<a\b[^>]*>/gi)) {
    const href = attr(tag, 'href')
    if (!href || /^(#|https?:|mailto:|tel:)/.test(href)) continue
    const p = href.split(/[?#]/)[0]
    const hit = existsSync(join(OUT, p, 'index.html')) || existsSync(join(OUT, p.replace(/\/$/, '') + '.html')) || existsSync(join(OUT, p))
    if (!hit) fail(f, `a[href="${href}"]`, 'internal link 404s against the export')
    if (!/\/$/.test(p) && !/\.[a-z0-9]+$/i.test(p)) fail(f, `a[href="${href}"]`, 'missing trailing slash (trailingSlash: true will 308-redirect)')
  }
}

/* 3. sitemap ------------------------------------------------------------- */
const smPath = join(OUT, 'sitemap.xml')
if (!existsSync(smPath)) fail('out/sitemap.xml', 'sitemap', `missing — ${routes.size} routes are unlisted`)
else {
  const locs = new Set([...readFileSync(smPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(m => new URL(m[1]).pathname))
  for (const r of routes) {
    if (isHidden(r)) { if (locs.has(r)) fail('out/sitemap.xml', 'sitemap', `draft/noindex route ${r} must NOT be listed`) }
    else if (!locs.has(r)) fail('out/sitemap.xml', 'sitemap', `route ${r} is not listed`)
  }
}

/* 3b. route drift, both directions (D1) --------------------------------- */
for (const d of declared)
  if (![...routes].some(r => d.re.test(r))) fail(ROUTES_TS, `route "${d.path}"`, 'declared but no matching page in the export')
for (const r of routes)
  if (declared.length && !declares(r)) fail(`out${r}`, 'route', `exists in the export but is not declared in ${ROUTES_TS}`)

/* 3c. unresolved {{TOKEN}} placeholders anywhere in out/ (D8) ------------ */
const tokens = new Map()
;(function scan(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name)
    if (e.isDirectory()) { scan(p); continue }
    if (!/\.(html|xml|txt|json|js|css)$/i.test(e.name)) continue
    for (const [, t] of readFileSync(p, 'utf8').matchAll(/\{\{([A-Z0-9_]+)\}\}/g)) {
      if (!tokens.has(t)) tokens.set(t, new Set())
      tokens.get(t).add(relative(OUT, p))
    }
  }
})(OUT)
for (const [t, where] of tokens)
  fail('out/', `{{${t}}}`, `unresolved placeholder on ${[...where].slice(0, 6).join(', ')}${where.size > 6 ? ` (+${where.size - 6} more)` : ''} — see docs/plans/BLOCKERS.md`)

/* 3d. routes 2 and 3 must not share prose (D1.2) ------------------------- */
const [a, b] = ['/tech-recruitment-eastern-europe/', '/hire-software-developers-eastern-europe/']
if (sentences[a] && sentences[b])
  for (const s of sentences[a]) if (sentences[b].has(s))
    fail(b, 'body text', `12+-word sentence also appears on ${a} — "${s.slice(0, 80)}…"`)

/* 3e. framer-motion belongs to / only (rule 10) -------------------------- */
;(function motion(d) {
  if (!existsSync(d)) return
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name)
    if (e.isDirectory()) { motion(p); continue }
    if (!/\.(tsx?|jsx?)$/.test(e.name) || p === join('src/app', 'page.tsx')) continue
    if (readFileSync(p, 'utf8').includes('framer-motion')) fail(p, 'import', 'imports framer-motion — only / may (rule 10)')
  }
})('src/app')

/* 4. optional live check ------------------------------------------------- */
if (BASE) {
  for (const r of routes) {
    const res = await fetch(new URL(r, BASE), { redirect: 'manual' }).catch(e => ({ status: `ERR ${e.message}` }))
    if (res.status !== 200) fail(`${BASE}${r}`, 'HTTP', `served instance returned ${res.status}`)
  }
}

/* ------------------------------------------------------------------------ */
console.log(`${pages.length} page(s) checked in ${OUT}/${BASE ? ` + ${BASE}` : ''}`)
if (!fails.length) { console.log('PASS'); process.exit(0) }
console.error(`\nFAIL — ${fails.length} problem(s):\n`)
for (const f of fails) console.error('  ' + f)
process.exit(1)
