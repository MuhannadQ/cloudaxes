import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import UserAuthForm from '../AuthForm'
import NewPasswordForm from '../NewPasswordForm'

export default function LoginPage() {
  const { newPasswordRequired } = useAuth()
  const formSubtitle = newPasswordRequired
    ? 'Enter your new password'
    : 'Enter your account credentials'
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">{formSubtitle}</p>
        </div>
        {newPasswordRequired ? <NewPasswordForm /> : <UserAuthForm />}
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
