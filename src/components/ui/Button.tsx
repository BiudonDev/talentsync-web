import Link from 'next/link'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const SIZES = { sm: 'px-5 py-2 text-sm', md: 'px-6 py-3 text-base' } as const

export interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: keyof typeof SIZES
  href?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  onClick,
  type = 'button',
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const cls = cn(
    variant === 'primary' ? 'btn-primary' : 'btn-secondary',
    SIZES[size],
    disabled && 'pointer-events-none opacity-50',
    className,
  )
  // pointer-events-none does not stop keyboard activation, so a disabled link
  // has to leave the tab order explicitly.
  const linkDisabled: { 'aria-disabled'?: boolean; tabIndex?: number } = disabled
    ? { 'aria-disabled': true, tabIndex: -1 }
    : {}

  if (href && (external || /^(https?:|mailto:|tel:)/.test(href))) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cls}
        {...linkDisabled}
        {...rest}
      >
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} prefetch={false} className={cls} {...linkDisabled} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>
      {children}
    </button>
  )
}
