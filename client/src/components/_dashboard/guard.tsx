import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import DashboardLayout from './layout'

export default function DashboardRoutesGuard() {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) {
    console.log('Still loading...🕳')
    throw new Promise((resolve) => setTimeout(resolve, 500))
  }
  return isAuthenticated ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" />
  )
}
