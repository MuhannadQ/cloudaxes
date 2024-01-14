import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function AuthRoutesGuard() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />
}
