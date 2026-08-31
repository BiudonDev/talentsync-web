import type { IconType } from 'react-icons'
import { cn } from '@/lib/utils'
import Card from './Card'

export interface StatTileProps {
  value: string
  label: string
  icon?: IconType
  className?: string
}

/**
 * A `Card` with an overridden radius and padding, not a parallel container.
 *
 * `p-5 sm:p-8` and `size-12 sm:size-16` rather than Card's flat `p-6 sm:p-8` with
 * a 64px icon: on a 375px screen the flat version leaves ~230px for a value like
 * "1-2 weeks" plus its label. This recovers 48px of it. `rounded-3xl` matches the
 * stat row already shipping in `sections/About.tsx`.
 */
export default function StatTile({ value, label, icon: Icon, className }: StatTileProps) {
  return (
    <Card
      hover={false}
      className={cn('flex items-center gap-4 rounded-3xl p-5 sm:gap-5 sm:p-8', className)}
    >
      {Icon && (
        <div className="gradient-primary flex size-12 shrink-0 items-center justify-center rounded-2xl sm:size-16">
          <Icon className="size-6 text-secondary-dark sm:size-8" aria-hidden />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-2xl font-bold text-text-primary sm:text-3xl">{value}</p>
        <p className="text-sm text-text-secondary sm:text-lg">{label}</p>
      </div>
    </Card>
  )
}
