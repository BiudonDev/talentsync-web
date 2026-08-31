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
// The 404 shell is emitted three times, byte-identical (404.html, 404/index.html,
// _not-found/index.html). It is exempt from the per-route checks below — it has no
// canonical, no sitemap entry and no route — but nginx serves it for every typo and
// every dead backlink, so it is NOT exempt from check 2f (one <title>, one robots).
const isShell = r => /^(404|_not-found)(\/|\.html$)/.test(r)
const allPages = []
;(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name)
    if (e.isDirectory()) { if (e.name !== '_next') walk(p) }
    else if (e.name.endsWith('.html')) {
      allPages.push(p)
      if (!isShell(relative(OUT, p))) pages.push(p)
    }
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
// Length budgets are about what a human reads, so measure the DECODED string:
// `&amp;` is one character on screen and five in the file.
const decode = s => s
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
// Read the canonical host from src/lib/seo.ts rather than repeating it. A guard
// that hardcodes the origin stops checking the site and starts checking itself:
// when the host moved to `www` (the apex serves only `/`, so every apex canonical
// was a 404) this line was the only thing that disagreed.
const ORIGIN = (() => {
  const src = readFileSync('src/lib/seo.ts', 'utf8')
  const m = src.match(/export const SITE_URL = '([^']+)'/)
  if (!m) { console.error('FATAL: could not read SITE_URL from src/lib/seo.ts'); process.exit(1) }
  return m[1]
})()
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

  const rawTitle = (raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]?.trim()
  const title = rawTitle && decode(rawTitle)
  // 02-page-content.md §1 / BLOCKERS.md §2 row 13: the homepage title is
  // client-fixed at `IT Recruitment & Engineering Talent in Eastern Europe |
  // TalentSync` (66 chars). An explicit client instruction outranks a guard
  // default, so the homepage ceiling is 70 — NOT laxity, and not headroom for
  // anyone else: 66 exactly was a knife-edge that failed the build on a
  // one-character edit to a title the client had already signed off. The
  // recommendation to trim it to 55 stands and is still on the blocker list.
  // Every other route keeps the 15-60 discipline of 00-design-contract.md:964.
  const titleMax = f === 'index.html' ? 70 : 60
  if (!title) fail(f, '<title>', 'missing or empty')
  else if (title.length < 15 || title.length > titleMax) fail(f, '<title>', `${title.length} chars, need 15-${titleMax} — "${title}"`)
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

  let hasFaq = false
  for (const [, json] of raw.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    let parsed
    try { parsed = JSON.parse(json) } catch (e) { fail(f, 'script[ld+json]', `invalid JSON: ${e.message}`); continue }
    const flat = JSON.stringify(parsed)
    if (/"@type":"Review"|"aggregateRating":/.test(flat)) fail(f, 'script[ld+json]', 'emits Review/aggregateRating — banned by D6')
    if (/"@type":"FAQPage"/.test(flat)) hasFaq = true
    // A token in prose is a hole a reader can see. A token inside an entity is
    // ingested as the VALUE — `"author":{"name":"{{VICTOR_FULL_NAME}}"}` is a
    // person Google believes is called that, and it is far harder to walk back
    // than the same string in body copy. Structured data is a stricter gate.
    for (const [, t] of flat.matchAll(/\{\{([A-Z0-9_]+)\}\}/g))
      fail(f, 'script[ld+json]', `{{${t}}} is unresolved INSIDE structured data — a placeholder ingested as an entity value`)
  }
  // D6: FAQPage on / only. Two FAQPage entities on one domain is the pattern that
  // draws rich-result suppression; the visible <details> blocks stay everywhere.
  if (hasFaq !== (route === '/'))
    fail(f, 'script[ld+json]', hasFaq ? 'emits FAQPage — D6 allows it on / only' : 'missing FAQPage — D6 requires it on /')

  // Scoped OUTSIDE <nav>: a <summary> in a nav landmark is the collapsed table
  // of contents, whose label ("On this page", "Contents") is identical on every
  // route by design. Only FAQ answers are duplicate content.
  const faqScope = body.replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ')
  for (const [, inner] of faqScope.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/gi)) {
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

/* 2f. one <title>, one robots meta — INCLUDING the 404 shell -------------- */
// The 404 shipped two of each: not-found.tsx's own `Page not found` + `noindex`,
// joined by the root layout's homepage title + `index, follow`. Google takes the
// first title and the most restrictive robots so the damage is bounded, but nginx
// serves that file for every typo and every dead backlink, and it presented itself
// as a second copy of the homepage. Deduped on content: the shell is emitted three
// times, byte-identical, and one finding is enough to fix all three.
const seenBody = new Set()
for (const file of allPages) {
  const raw = readFileSync(file, 'utf8')
  if (seenBody.has(raw)) continue
  seenBody.add(raw)
  const f = relative(OUT, file)
  const titles = raw.match(/<title[\s>]/gi) || []
  if (titles.length !== 1)
    fail(f, '<title>', `${titles.length} <title> tags, need exactly 1 — ${(raw.match(/<title[^>]*>([\s\S]*?)<\/title>/gi) || []).map(t => JSON.stringify(text(t))).join(' + ') || '(none)'}`)
  const robots = (raw.match(/<meta[^>]+name="robots"[^>]*>/gi) || []).map(t => attr(t, 'content'))
  if (robots.length > 1)
    fail(f, 'meta[robots]', `${robots.length} robots metas, need at most 1 — "${robots.join('" + "')}". A layout default and a page override both emitted; move the page-specific value out of the layout.`)
}

/* 2g. the Organization node must name the REGISTERED entity -------------- */
// TalentSync is a trading name. The state register lists S.R.L. “UNQENERGY”,
// IDNO 1020600034949, and no company called TalentSync — /imprint/ says exactly
// that in prose. The Organization node emitted on all 33 pages carried only
// `name: "TalentSync"`, so the one identity a procurement reviewer's crawler
// actually reads asserted the opposite of the page it sat on. That was reported,
// left open, and reported again a wave later, which is why it is a guard now.
//
// Asserted against /imprint/'s own rendered text, not a hardcoded string: if the
// registered name or number ever changes, the prose and the schema move together
// or this fails. That is the same D5 rule the footer NAP already lives under.
const ldOrg = html => {
  for (const [, json] of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    let p
    try { p = JSON.parse(json) } catch { continue }
    const org = (p['@graph'] ?? [p]).find(n => n && n['@type'] === 'Organization')
    if (org) return org
  }
  return null
}
const homePath = join(OUT, 'index.html')
const imprintPath = join(OUT, 'imprint', 'index.html')
if (!existsSync(homePath) || !existsSync(imprintPath)) {
  fail('out/', 'organization', 'index.html or imprint/index.html is missing — the entity-identity check cannot run. Re-point it, do not drop it.')
} else {
  const org = ldOrg(readFileSync(homePath, 'utf8'))
  const imprint = text(readFileSync(imprintPath, 'utf8'))
  // PropertyValue is the shape organizationLd() emits; a bare string is also legal
  // schema.org, so read both rather than failing on a valid alternative.
  const ids = [org && org.identifier].flat().filter(Boolean)
    .map(i => (typeof i === 'string' ? i : i.value)).filter(Boolean).map(String)
  if (!org) fail('out/index.html', 'script[ld+json]', 'no Organization node in the JSON-LD graph — it is emitted from the root layout and every page needs it')
  else if (!org.legalName)
    fail('src/lib/schema.ts', 'organizationLd().legalName', `absent, while /imprint/ states in the built HTML that TalentSync is only a trading name. A machine reader is told TalentSync IS the registered person; the page beside it says no such company is registered. Add the registered name exactly as /imprint/ renders it.`)
  else if (!imprint.includes(org.legalName))
    fail('src/lib/schema.ts', 'organizationLd().legalName', `is ${JSON.stringify(org.legalName)}, which does not appear anywhere in the rendered text of /imprint/. Schema and prose must carry one spelling of the registered entity (D5) — fix whichever is wrong, do not relax this check.`)
  if (org && org.legalName && org.legalName === org.name)
    fail('src/lib/schema.ts', 'organizationLd()', `legalName equals name (${JSON.stringify(org.name)}). The registered person and the trading name are different strings here; if they ever genuinely converge, delete this assertion deliberately.`)
  if (org && !ids.length)
    fail('src/lib/schema.ts', 'organizationLd().identifier', 'no identifier — the IDNO is published on /imprint/, /terms/ and /about/ but not in the structured data, so the registry number cannot be cross-checked by machine')
  else for (const v of ids)
    if (!imprint.includes(v))
      fail('src/lib/schema.ts', 'organizationLd().identifier', `value ${JSON.stringify(v)} does not appear in the rendered text of /imprint/ — the number the site publishes to crawlers is not the number it shows a reader`)
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
// Two jobs, and the second is the one that was missing. (1) Fail the deploy on any
// surviving token — D8. (2) Prove every token IS ON THE ASK LIST. A token nobody
// knows about never gets answered: {{VICTOR_FULL_NAME}} shipped into four Article
// author bylines without a single line in BLOCKERS.md, so the one person who could
// resolve it was never going to be asked. The ledger is printed in full — every
// distinct token with every page it renders on, not a truncated sample — because
// the list is what gets pasted into the email that unblocks the launch.
const routeLabel = p => {
  const r = relative(OUT, p)
  if (r.startsWith('_next/')) return '(js bundle)'
  const i = r.lastIndexOf('/')
  const dir = i < 0 ? '/' : '/' + r.slice(0, i) + '/'
  // index.html, index.txt and the __next.*.txt RSC payloads are all one route.
  return /^(index|__next)\./.test(r.slice(i + 1)) ? dir : dir + r.slice(i + 1)
}
const tokens = new Map()
;(function scan(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name)
    if (e.isDirectory()) { scan(p); continue }
    if (!/\.(html|xml|txt|json|js|css)$/i.test(e.name)) continue
    for (const [, t] of readFileSync(p, 'utf8').matchAll(/\{\{([A-Z0-9_]+)\}\}/g)) {
      if (!tokens.has(t)) tokens.set(t, new Set())
      tokens.get(t).add(routeLabel(p))
    }
  }
})(OUT)

const BLOCKERS = 'docs/plans/BLOCKERS.md'
const blockers = existsSync(BLOCKERS) ? readFileSync(BLOCKERS, 'utf8') : null
if (blockers === null) fail(BLOCKERS, 'blockers', 'missing — no token in the build can be traced to an owner')
const byName = [...tokens].sort(([a], [b]) => (a < b ? -1 : 1))
if (byName.length) {
  console.log(`\n{{TOKEN}} ledger — ${byName.length} distinct placeholder(s) still in ${OUT}/:`)
  for (const [t, where] of byName)
    console.log(`  {{${t}}}${blockers && !blockers.includes(t) ? '  [NOT IN BLOCKERS.md]' : ''}\n      ${[...where].sort().join(' ')}`)
  console.log('')
}
for (const [t, where] of byName) {
  fail('out/', `{{${t}}}`, `unresolved placeholder on ${where.size} page(s): ${[...where].sort().join(' ')} — see ${BLOCKERS}`)
  if (blockers && !blockers.includes(t))
    fail(BLOCKERS, `{{${t}}}`, 'in the build but not on the ask list — nobody will ever be asked for this value. Add a row before it ships.')
}

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
    // The quoted specifier, not the bare word: every server route carries a
    // header comment saying it uses no framer-motion, and matching prose made
    // the guard fail on the files that were obeying it.
    if (/['"`]framer-motion['"`]/.test(readFileSync(p, 'utf8'))) fail(p, 'import', 'imports framer-motion — only / may (rule 10)')
  }
})('src/app')

/* 3f. one client, one number (06-claims row 15) -------------------------- */
// Two self-contradictions shipped in wave C, and neither was catchable by grepping
// the rendered HTML for a phrase:
//   · Innovatec was "2 engineers" on two pages and "1" on three others, while the
//     headline "nine engineers across five clients" only balances at 2. A buyer
//     reading the evidence pages sees the site itemise its own proof two ways.
//   · the Qualiwise testimonial said "in two days" against a ledger row and an H1
//     that both say one week — and it lives in a JS chunk, because the carousel
//     server-renders only the active slide. An HTML-only check passes it. So the
//     corpus here is HTML *plus* the chunks.
// Both assertions bind the STRUCTURED shapes the site renders numbers in. A general
// "number near a client name" scan was tried first and is pure noise: the hourly
// page says "one or two days a week" eleven times about cadence, not about speed.
const claimCorpus = []
;(function claims(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name)
    if (e.isDirectory()) { claims(p); continue }
    if (!/\.(html|js)$/.test(e.name)) continue
    const raw = readFileSync(p, 'utf8')
    claimCorpus.push([routeLabel(p), e.name.endsWith('.html') ? text(raw.replace(/<script[\s\S]*?<\/script>/gi, ' ')) : raw])
  }
})(OUT)

// "2 engineers Innovatec" / "1 engineer Qualiwise" — the evidence block's own shape,
// which also gives us the client roster for free rather than hardcoding a list that drifts.
const HEADCOUNT = /\b(\d+)\s+engineers?\s+([A-Z][\p{L}\d]*)/gu
const clientNames = new Set()
for (const [, t] of claimCorpus) for (const m of t.matchAll(HEADCOUNT)) clientNames.add(m[2])
const nearestClient = (t, i) => {
  let best = null
  for (const c of clientNames) for (const j of [t.lastIndexOf(c, i), t.indexOf(c, i)]) {
    const d = j < 0 ? Infinity : Math.abs(j - i)
    if (d < 140 && (!best || d < best[1])) best = [c, d]
  }
  return best && best[0]
}
const WORDNUM = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 }
const num = w => WORDNUM[String(w).toLowerCase()] ?? +w
const toDays = (n, u) => num(n) * { day: 1, week: 7, month: 30 }[u.toLowerCase()]

const claimed = new Map()   // "<client> <fact>" -> value -> Set(route)
const claim = (c, fact, v, p) => {
  const k = `${c} ${fact}`
  if (!claimed.has(k)) claimed.set(k, new Map())
  if (!claimed.get(k).has(v)) claimed.get(k).set(v, new Set())
  claimed.get(k).get(v).add(p)
}
const itemised = new Map()  // the /case-studies/ ledger: client -> engineers placed
for (const [p, t] of claimCorpus) {
  for (const m of t.matchAll(HEADCOUNT)) claim(m[2], 'engineers placed', +m[1], p)
  // The ledger card: "<client> <sector> Role placed N × <role> … Time to signature <dur>".
  // Time-to-signature is read from the SAME match as the count, never by proximity —
  // /case-studies/ renders every record twice (table + cards) and the nearest client
  // name to a lone "Time to signature" cell is frequently the wrong one.
  for (const m of t.matchAll(/Role placed\s+(\d+)\s*×(?:[^.!?]{0,120}?Time to signature\s+([A-Za-z\d]+)\s+(day|week|month)s?\b)?/g)) {
    const c = nearestClient(t, m.index)
    if (!c) continue
    claim(c, 'engineers placed', +m[1], p)
    if (m[2]) claim(c, 'time to signature (days)', toDays(m[2], m[3]), p)
    if (p === '/case-studies/') itemised.set(c, +m[1])
  }
}
for (const [k, vals] of [...claimed].sort(([a], [b]) => (a < b ? -1 : 1)))
  if (vals.size > 1)
    fail('out/', `claim: ${k}`, 'stated two different ways in one build — ' +
      [...vals].sort(([a], [b]) => a - b).map(([v, w]) => `${v} on ${[...w].sort().join(', ')}`).join('  vs  ') +
      '. One client, one number: pick the true value and propagate it (06-claims row 15).')

// The headline "nine engineers across five clients" must equal the itemised record
// it summarises. It rendered on five pages directly above a table that summed to eight.
const total = [...itemised.values()].reduce((a, b) => a + b, 0)
const conflicted = [...claimed].some(([k, v]) => k.endsWith('engineers placed') && v.size > 1)
if (clientNames.size && !itemised.size)
  fail('out/case-studies/', 'ledger', 'named clients exist but /case-studies/ yielded no itemised "Role placed N ×" counts — the headline total cannot be checked against anything. The ledger markup changed: re-point this guard, do not drop it.')
if (total && !conflicted) {
  const HEADLINE = /\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+engineers?\b[^.!?]{0,120}?\b(one|two|three|four|five|\d+)\s+(?:clients?|companies)\b|\b(one|two|three|four|five|\d+)\s+(?:clients?|companies)\b[^.!?]{0,120}?\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+engineers?\b/gi
  for (const [p, t] of claimCorpus) for (const m of t.matchAll(HEADLINE)) {
    const eng = num(m[1] ?? m[4]), cli = num(m[2] ?? m[3])
    if (eng !== total || cli !== itemised.size)
      fail(p, 'headline claim', `"${m[0].trim()}" does not match the itemised ledger on /case-studies/, which totals ${total} engineer(s) across ${itemised.size} client(s) (${[...itemised].map(([c, n]) => `${c} ${n}`).join(', ')})`)
  }
}

// A count can agree with the ledger and still be a lie about SCOPE, and the check
// above cannot see it: the arithmetic is right and the falsehood is one adjective.
// /hire-software-developers-eastern-europe/ shipped "Five clients, eight engineers,
// and that is the entire record" directly under a table whose rows sum to exactly
// that — while /case-studies/ lists ten engagements, two of them non-placements, so
// eight placement clients. A buyer finds the ninth engineer at the sixth client two
// clicks away, and the sentence's own rhetoric ("anyone who checks will notice")
// makes it worse. The other ten pages scope the same number correctly as "our five
// most recent placements"; only this one asserted totality.
//
// Scoped to a SINGLE SENTENCE, and to HTML routes only. A page-wide scan fires on
// any page that happens to carry both a headcount and the words "in total"; the
// chunks are excluded because splitting minified JS on sentence punctuation is
// noise. The remedy is never to delete the transparency — scope the denominator.
const TOTALITY = /\b(the (?:entire|whole|complete) record|in total|in all|altogether|that is all there is)\b/i
const SCOPED_COUNT = /\b(?:one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(?:engineers?|clients?|companies|placements?)\b/i
for (const [p, t] of claimCorpus) {
  if (p.startsWith('(js')) continue
  for (const s of t.split(/(?<=[.!?])\s+/)) {
    const m = s.match(TOTALITY)
    // Excerpt centred on the phrase, not on the sentence start: a table flattens
    // into one very long "sentence" and the first 170 chars are column headers.
    if (m && SCOPED_COUNT.test(s))
      fail(p, 'totality claim', `"${m[0]}" says the count beside it is the COMPLETE record — "…${s.slice(Math.max(0, m.index - 110), m.index + m[0].length + 60).trim()}…". /case-studies/ lists more placement engagements than any one page itemises, so an unscoped total invites the reader to find what it left out. Scope it the way the other pages do ("our five most recent placements"), or restate the denominator to match /case-studies/. Keep the transparency sentence either way.`)
  }
}

// A testimonial is the one place a number escapes the ledger's shape entirely, and
// the carousel keeps two of the three out of the HTML altogether. Match the data
// object, not the markup: {quote:"…",author:"…",title:"CEO & Founder, <client>"}.
let quotes = 0
for (const [p, t] of claimCorpus) {
  if (!p.startsWith('(js')) continue
  for (const m of t.matchAll(/quote:"((?:[^"\\]|\\.)*)"[^}]{0,300}?title:"((?:[^"\\]|\\.)*)"/g)) {
    quotes++
    const c = [...clientNames].find(x => m[2].includes(x))
    const ledger = c && claimed.get(`${c} time to signature (days)`)
    if (!ledger) continue
    for (const d of m[1].matchAll(/\b(a|one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(day|week|month)s?\b/gi)) {
      const said = toDays(d[1].toLowerCase() === 'a' ? 1 : d[1], d[2])
      if (!ledger.has(said))
        fail(p, `testimonial: ${c}`, `quote says "${d[0]}" (${said}d) but the ${c} ledger says ${[...ledger.keys()].join('/')}d — "${m[1].slice(0, 80)}…". The quote is a client's words: reconcile it with the client, do not silently reword it.`)
    }
  }
}
if (!quotes) fail('out/_next', 'testimonials', 'no testimonial {quote,author,title} objects found in the chunks — the data shape changed and this guard is now blind. Re-point it, do not delete it.')

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
