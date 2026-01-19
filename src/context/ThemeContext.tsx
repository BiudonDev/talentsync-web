'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  mounted: false,
})

const emptySubscribe = () => () => {}

function getSnapshot() {
  return typeof window !== 'undefined'
}

function getServerSnapshot() {
  return false
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot)

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem('talentsync-theme') as Theme | null
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('talentsync-theme', theme)
  }, [theme, mounted])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
