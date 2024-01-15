import { Suspense, lazy, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'

import { trpc } from '@/lib/trpc'

import RootLayout from '@/components/RootLayout'
import HomePage from '@/components/_home/page'
import EC2Page from '@/components/_home/ec2/page'
import AuthPage from '@/components/auth/page'
import AuthRoutesGuard from '@/components/auth/guard'
import LoadingScreen from '@/components/LoadingScreen'

const LazyHomeRoutesGuard = lazy(() => import('@/components/_home/guard'))

const SERVER_URL = import.meta.env.VITE_TRPC_SERVER_URL as string

export default function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: SERVER_URL,

          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              authorization: 's', // getAuthCookie(),
            }
          },
        }),
      ],
    })
  )
  return (
    <RootLayout>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </trpc.Provider>
    </RootLayout>
  )
}
