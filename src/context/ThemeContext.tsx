'use client'

import { createContext, useContext, useEffect, ReactNode, useSyncExternalStore } from 'react'

interface ThemeContextType {
  theme: 'dark'
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
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

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.remove('light')
    root.classList.add('dark')
  }, [mounted])

  return (
    <ThemeContext.Provider value={{ theme: 'dark', mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
