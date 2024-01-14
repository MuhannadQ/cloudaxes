import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import HomeLayout from '@/components/_home/layout'

export default function HomeRoutesGuard() {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) throw new Promise((resolve) => setTimeout(resolve, 1000))
  return isAuthenticated ? (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  ) : (
    <Navigate to="/login" />
  )
}