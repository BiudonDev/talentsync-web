import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ComparisonRow {
  /** Row header — the thing being compared. Rendered as `<th scope="row">`. */
  label: string
  /** One cell per `columns` entry after the first. */
  cells: ReactNode[]
}

export interface ComparisonTableProps {
  /** Column headers. `columns[0]` labels the row-header column. */
  columns: string[]
  rows: ComparisonRow[]
  /** Accessible table name. Visually hidden unless `showCaption`. */
  caption?: string
  showCaption?: boolean
  className?: string
}

/**
 * One `<table>`, one DOM tree, restacked on mobile — not a mobile block plus a
 * desktop table, which would ship the same content twice for Google to parse.
 *
 * Restack rather than scroll: a 3+ column comparison at 360px gives ~90px
 * columns, unreadable at every scroll position, and a horizontal scroller nested
 * in a vertical one is the most-reported mobile table frustration. The mobile
 * column label is a real `<span>` generated from `columns`, not a `data-label`
 * + `::before` — the value cannot be authored without its header, because the
 * component writes both. The `overflow-x-auto` wrapper stays regardless: it is
 * the guarantee that an unbreakable cell can never widen the page (Rule 4).
 */
export default function ComparisonTable({
  columns,
  rows,
  caption,
  showCaption = false,
  className,
}: ComparisonTableProps) {
  // Fails the static export, loudly, rather than shipping a mobile cell whose
  // header span renders empty — an unlabelled value is worse than a scroll.
  for (const row of rows) {
    if (row.cells.length !== columns.length - 1) {
      throw new Error(
        `ComparisonTable: row "${row.label}" has ${row.cells.length} cells, expected ${columns.length - 1}`,
      )
    }
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse text-left text-sm max-sm:block sm:text-base">
        {caption && (
          <caption
            className={cn(
              'text-left',
              showCaption ? 'mb-4 text-sm text-text-secondary' : 'sr-only',
            )}
          >
            {caption}
          </caption>
        )}
        <thead className="max-sm:hidden">
          <tr className="border-b border-border">
            {columns.map((c) => (
              <th key={c} scope="col" className="p-3 font-semibold text-text-primary">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-sm:block">
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-border max-sm:mb-4 max-sm:block max-sm:rounded-2xl max-sm:border max-sm:bg-surface max-sm:p-2 sm:border-b"
            >
              <th
                scope="row"
                className="p-3 text-left align-top font-semibold text-text-primary max-sm:block max-sm:text-lg"
              >
                {row.label}
              </th>
              {row.cells.map((cell, i) => (
                <td
                  key={i}
                  className="p-3 align-top text-text-secondary max-sm:block max-sm:border-t max-sm:border-border"
                >
                  <span className="mb-1 block font-semibold text-text-primary sm:hidden">
                    {columns[i + 1]}
                  </span>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
