import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import AuthButton from './AuthButton'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useAuth()

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    await login(username, password)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label className="sr-only" htmlFor="username">
            Username
          </Label>
          <Input
            id="username"
            placeholder="username"
            type="text"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Label className="sr-only" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            placeholder="password"
            type="password"
            autoCapitalize="none"
            autoComplete="current-password"
            autoCorrect="off"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="my-0.5 h-4 px-1 text-xs text-red-600">{error}</p>
        <AuthButton label="Log In" isLoading={isLoading} />
      </form>
    </div>
  )
}
