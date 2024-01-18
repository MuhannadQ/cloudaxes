import { createContext, useState, useEffect } from 'react'
import { cognito, CognitoLoginRes, CognitoErr, getErrorMessage } from '@/lib/cognito'

interface User {
  id?: string
  username: string
  accessToken: string
  email?: string
}

interface AuthContextProps {
  isLoading: boolean
  user: User | null
  error: string | undefined
  newPasswordRequired: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  changePassword: (newPassword: string) => Promise<void>
  logout: () => void
}

const AuthDataKey = 'auth-data'

type AuthData = NonNullable<NonNullable<CognitoLoginRes>['AuthenticationResult']>

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [newPasswordRequired, setNewPasswordRequired] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const updateState = (res: CognitoLoginRes, err: CognitoErr, username: string) => {
    const errorMessage = getErrorMessage(err)
    setError(errorMessage)

    if (res) {
      sessionStorage.setItem(AuthDataKey, JSON.stringify(res.AuthenticationResult))
      setUser({ username, accessToken: res.AuthenticationResult?.AccessToken as string })
    } else {
      setUser(null)
    }

    setIsLoading(false)
  }

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    const { challenge, res, err } = await cognito.authenticate(username, password)
    console.log({ res, err })
    setNewPasswordRequired(Boolean(challenge))
    updateState(res, err, username)
  }

  const changePassword = async (newPassword: string) => {
    setIsLoading(true)
    const { res, err, username } =
      await cognito.respondToNewPasswordChallenge(newPassword)
    console.log({ res, err })
    updateState(res, err, username)
  }

  const logout = async () => {
    if (!user) throw new Error('Unexpected behavior. User must be set.')
    sessionStorage.removeItem(AuthDataKey)
    await cognito.signOut(user.accessToken)
    setUser(null)
  }

  useEffect(() => {
    // check token is valid
    const authenticate = async () => {
      setIsLoading(true)
      const storedAuthData = sessionStorage.getItem(AuthDataKey)

      if (storedAuthData) {
        const accessToken = (JSON.parse(storedAuthData) as AuthData).AccessToken as string
        const { user } = await cognito.getUser(accessToken)
        // when token expires getUser returns "NotAuthorizedException" error
        // setTimeout(() => setUser(user ? { ...user, accessToken } : null), 3000)
        setUser(user ? { ...user, accessToken } : null)
      }
      setIsLoading(false)
    }
    authenticate()
  }, [])

  const contextValue: AuthContextProps = {
    isLoading,
    user,
    isAuthenticated: user !== null,
    error,
    newPasswordRequired,
    login,
    changePassword,
    logout,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
