import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import RootLayout from '@/components/RootLayout'
import { HomePage } from '@/components/_home/page'
import { EC2Page } from '@/components/_home/ec2/page'
import { AuthPage } from '@/components/auth/page'
import AuthRoutes from '@/components/guards/AuthRoutes'
import LoadingScreen from '@/components/LoadingScreen'

const LazyHomeRoutes = lazy(() => import('@/components/guards/HomeRoutes'))

export default function App() {
  return (
    <RootLayout>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<LazyHomeRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/ec2" element={<EC2Page />} />
          </Route>
          {/* Don't need Suspense for Login. If we visit the login page and user is logged in it will flash the login page and that's ok */}
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<AuthPage />} />
          </Route>
        </Routes>
      </Suspense>
    </RootLayout>
  )
}
