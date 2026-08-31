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
const routeOf = f => ('/' + relative(OUT, f)).replace(/index\.html$/, '').replace(/\.html$/, '/')
const seen = { title: new Map(), desc: new Map() }
const routes = new Set(pages.map(routeOf))

/* 1. structural no-overflow guard --------------------------------------- */
const cssDir = join(OUT, '_next/static/chunks')
const css = readdirSync(cssDir).filter(f => f.endsWith('.css'))
  .map(f => readFileSync(join(cssDir, f), 'utf8')).join('')
if (!/(?:^|[},])\s*(?:html|body)[^{]*\{[^}]*overflow-x:\s*clip/.test(css))
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

  const canon = raw.match(/<link[^>]+rel="canonical"[^>]*>/i)
  if (!canon) fail(f, 'link[rel=canonical]', 'missing')

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
  for (const r of routes) if (!locs.has(r)) fail('out/sitemap.xml', 'sitemap', `route ${r} is not listed`)
}

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
