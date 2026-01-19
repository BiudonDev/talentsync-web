import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  className?: string
  external?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className,
  external = false,
}: ButtonProps) {
  const baseStyles = variant === 'primary' ? 'btn-primary' : 'btn-secondary'

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cn(baseStyles, className)}
      >
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={cn(baseStyles, className)}>
      {children}
    </button>
  )
}
