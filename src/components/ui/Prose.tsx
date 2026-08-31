import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ProseProps {
  children: ReactNode
  /** Element to render. Legal pages and articles usually want `article`. */
  as?: 'div' | 'article' | 'section'
  className?: string
}

/**
 * Long-form wrapper for legal pages and articles.
 *
 * Self-contained on purpose — the styling lives here as arbitrary variants
 * rather than as a `.prose` class in globals.css, which this package does not
 * own. Nothing here emits the class name `prose`, so if a `.prose` block is
 * ever added to globals.css the two cannot fight; pick one and delete the other.
 *
 * Measure is the LITERAL `65ch`. Tailwind hardcodes `.max-w-prose{max-width:65ch}`
 * and never emits a `--max-width-prose` custom property, so `var()` would resolve
 * to nothing, `max-width` would compute to `none`, and a 40-clause terms document
 * would render at a ~110-character measure.
 *
 * Body copy is `text-secondary` (7.49:1), not `text-primary` (17.3:1) — per the
 * contract's colour table, 17.3:1 is too hot for 40 clauses of continuous reading.
 */
const PROSE = [
  // measure + base rhythm
  'max-w-[65ch] text-base leading-[1.75] text-pretty text-text-secondary sm:text-lg',
  '[&>*+*]:mt-[1.25em] [&>:first-child]:mt-0',

  // headings — em-based margins so they scale with their own size
  '[&_h2]:mt-[2.5em] [&_h2]:mb-[0.75em] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-[1.25] [&_h2]:tracking-[-0.01em] [&_h2]:text-balance [&_h2]:text-text-primary sm:[&_h2]:text-3xl',
  '[&_h3]:mt-[2em] [&_h3]:mb-[0.5em] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-balance [&_h3]:text-text-primary',
  '[&_h4]:mt-[1.75em] [&_h4]:mb-[0.5em] [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-text-primary sm:[&_h4]:text-lg',

  // inline
  '[&_strong]:font-semibold [&_strong]:text-text-primary',
  '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-[0.2em]',
  '[&_a:hover]:text-primary-light',
  '[&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-primary',
  '[&_code]:rounded-lg [&_code]:bg-surface [&_code]:px-[0.4em] [&_code]:py-[0.15em] [&_code]:text-[0.875em] [&_code]:text-primary-light',

  // lists — three levels deep, each with its own marker glyph
  'marker:text-primary',
  '[&_ul]:list-disc [&_ul]:pl-6',
  '[&_ol]:list-decimal [&_ol]:pl-6',
  '[&_li]:mt-2',
  '[&_ul_ul]:list-[circle] [&_ul_ul_ul]:list-[square]',
  '[&_ol_ol]:list-[lower-alpha] [&_ol_ol_ol]:list-[lower-roman]',
  '[&_li>ul]:mt-2 [&_li>ol]:mt-2',
  '[&_dt]:mt-[1.25em] [&_dt]:font-semibold [&_dt]:text-text-primary',
  '[&_dd]:mt-1 [&_dd]:pl-6',

  // tables — the table is its own horizontal scroller (Rule 4). `block` +
  // `w-max` + `max-w-full` is the only way to get that without wrapping every
  // authored <table> in a container this component cannot reach into.
  '[&_table]:block [&_table]:w-max [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:text-sm sm:[&_table]:text-base',
  '[&_th]:border [&_th]:border-border [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-text-primary',
  '[&_td]:border [&_td]:border-border [&_td]:p-3 [&_td]:align-top',

  // blocks
  '[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-text-primary',
  '[&_hr]:my-12 [&_hr]:border-border',
  '[&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-2xl',
].join(' ')

export default function Prose({ children, as: Tag = 'div', className }: ProseProps) {
  return <Tag className={cn(PROSE, className)}>{children}</Tag>
}
