import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import AuthButton from './AuthButton'

interface NewPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function NewPasswordForm({ className, ...props }: NewPasswordFormProps) {
  const [newPassword, setNewPassword] = useState('')
  const { isLoading, error, changePassword } = useAuth()

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    await changePassword(newPassword)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label className="sr-only" htmlFor="newPassword">
            New Password
          </Label>
          <Input
            id="newPassword"
            placeholder="new password"
            type="password"
            autoCapitalize="none"
            autoComplete="current-password"
            autoCorrect="off"
            disabled={isLoading}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <p className="my-0.5 min-h-4 px-1 text-xs text-red-600">{error}</p>
        <AuthButton label="Change Password" isLoading={isLoading} />
      </form>
    </div>
  )
}
