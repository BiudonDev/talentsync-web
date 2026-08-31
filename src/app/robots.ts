import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// Same force-static requirement as sitemap.ts — a metadata route is a Route
// Handler underneath and the build hard-fails without it under output: 'export'.
export const dynamic = 'force-static'

/**
 * Blocks nothing, deliberately. This business is discovered through ChatGPT, so
 * every AI crawler — GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
 * Claude-User, Claude-SearchBot, PerplexityBot — is allowed, and so is
 * Google-Extended (blocking it costs Gemini grounding and protects nothing: AI
 * Overviews run off Googlebot, not Google-Extended).
 *
 * NO per-bot `Allow` groups. robots.txt group matching means a crawler obeys
 * only the MOST SPECIFIC matching group, so a `User-agent: GPTBot / Allow: /`
 * block would make GPTBot ignore the `*` group entirely — including any rule
 * added there later. A single permissive `*` group allows every one of them and
 * cannot silently diverge.
 *
 * Never block /_next/ (Google needs the JS and CSS to render) and never add
 * nosnippet or max-snippet (they are the only real controls over AI Overview
 * inclusion, and TalentSync wants inclusion).
 *
 * Do NOT also create public/robots.txt — the two collide at /robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
