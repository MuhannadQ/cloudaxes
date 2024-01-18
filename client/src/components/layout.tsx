import { Suspense } from 'react'
import { AuthProvider } from '@/context/AuthProvider.tsx'
import { ThemeProvider } from '@/context/ThemeProvider.tsx'
import LoadingScreen from '@/components/LoadingScreen'

type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
        {/* Global Stuff <Analytics /> <Toaster /> */}
      </ThemeProvider>
    </AuthProvider>
  )
}
