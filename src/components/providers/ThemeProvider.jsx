import { useCallback, useEffect, useMemo, useState } from 'react'
import { defaultTheme, isTheme, themes } from '@/data/themes'
import { ThemeContext } from '@/hooks/useTheme'

const STORAGE_KEY = 'rajneesh-portfolio-theme'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(defaultTheme)

  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem(STORAGE_KEY)
      if (isTheme(storedTheme)) setThemeState(storedTheme)
    } catch {
      // Storage can be unavailable in private browsing; the default still works.
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) themeColor.content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Persistence is optional; the active theme still applies for this session.
    }
  }, [theme])

  const setTheme = useCallback((nextTheme) => {
    if (isTheme(nextTheme)) setThemeState(nextTheme)
  }, [])

  const value = useMemo(() => ({ theme, setTheme, themes }), [theme, setTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
