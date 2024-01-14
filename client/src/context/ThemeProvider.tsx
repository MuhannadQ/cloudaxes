import { createContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextProps {
  currentTheme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light')

  const setTheme = (theme: Theme) => {
    // setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    setCurrentTheme(theme)
  }

  useEffect(() => {
    document.documentElement.classList.remove('dark')
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [currentTheme])

  const contextValue: ThemeContextProps = {
    currentTheme,
    setTheme,
  }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
