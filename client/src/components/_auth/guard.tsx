import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import AuthLayout from './layout'

export default function AuthRoutesGuard() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}
