import Link from 'next/link'
import { cn } from '@/lib/utils'
import Card from './Card'
import Pill from './Pill'

export interface ArticleCardImage {
  src: string
  width: number
  height: number
  /** Hand-built, e.g. `"/img/a-480.jpg 480w, /img/a-960.jpg 960w"`. */
  srcSet?: string
  sizes?: string
}

export interface ArticleCardProps {
  href: string
  title: string
  excerpt: string
  image?: ArticleCardImage
  tag?: string
  /** ISO date. */
  date?: string
  className?: string
}

/**
 * The `<Link>` wraps `<Card>` rather than `Card` growing an `href` — that keeps
 * one anchor per card and avoids nested-anchor problems.
 *
 * `alt=""` is deliberate: the title follows immediately and the whole card is a
 * single link, so a described image would only add a duplicate accessible name.
 *
 * `images.unoptimized: true` means `next/image` emits a bare `<img>` anyway, so
 * this uses one directly and takes the hand-built `srcSet` from the caller
 * (Rule 9). No `line-clamp` on the excerpt — author a short one in the data file.
 */
export default function ArticleCard({
  href,
  title,
  excerpt,
  image,
  tag,
  date,
  className,
}: ArticleCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <Card className={cn('flex h-full flex-col overflow-hidden p-4 sm:p-6', className)}>
        {image && (
          <div className="mb-4 aspect-video overflow-hidden rounded-xl">
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes={image.sizes ?? '(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw'}
              width={image.width}
              height={image.height}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
            />
          </div>
        )}
        {(tag || date) && (
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {tag && <Pill>{tag}</Pill>}
            {date && (
              <time dateTime={date} className="text-sm text-text-secondary">
                {new Date(date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  timeZone: 'UTC',
                })}
              </time>
            )}
          </div>
        )}
        <h3 className="mb-2 text-xl font-bold text-text-primary sm:text-2xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary text-pretty">{excerpt}</p>
      </Card>
    </Link>
  )
}
