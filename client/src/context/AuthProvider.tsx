import { createContext, useState, useEffect } from 'react'

interface User {
  id: string
  username: string
  email?: string
}

interface AuthContextProps {
  isLoading: boolean
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    const authenticatedUser: User = { id: '1', username }
    setUser(authenticatedUser)
  }

  const logout = () => {
    // clear session or token
    setUser(null)
  }

  useEffect(() => {
    // check token is valid
    const authenticate = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const authenticated = true /* TODO: perform authentication check */
      if (authenticated) {
        setUser({ id: '1', username: 'stored_user', email: 'stored_user@example.com' })
      }
      setIsLoading(false)
    }
    authenticate()
  }, [])

  const contextValue: AuthContextProps = {
    isLoading,
    user,
    isAuthenticated: user !== null,
    login,
    logout,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
