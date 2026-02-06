import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    // Use window.scrollTo for better iOS Safari compatibility
    const navbarHeight = 80 // Account for fixed navbar
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - navbarHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
