import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import RootLayout from '@/components/RootLayout'
import HomePage from '@/components/_home/page'
import EC2Page from '@/components/_home/ec2/page'
import AuthPage from '@/components/auth/page'
import AuthRoutesGuard from '@/components/auth/guard'
import LoadingScreen from '@/components/LoadingScreen'

const LazyHomeRoutesGuard = lazy(() => import('@/components/_home/guard'))

export default function App() {
  return (
    <RootLayout>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<LazyHomeRoutesGuard />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/ec2" element={<EC2Page />} />
          </Route>
          {/* Don't need Suspense for Login. If we visit the login page and user is logged in it will flash the login page and that's ok */}
          <Route element={<AuthRoutesGuard />}>
            <Route path="/login" element={<AuthPage />} />
          </Route>
        </Routes>
      </Suspense>
    </RootLayout>
  )
}
