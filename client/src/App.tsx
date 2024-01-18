import { lazy, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'

import { trpc, TRPC_API_URL } from '@/lib/trpc'

import DashboardPage from '@/components/_dashboard/page'
import EC2Page from '@/components/_dashboard/ec2/page'
import LoginPage from '@/components/_auth/login/page'
import AuthRoutesGuard from '@/components/_auth/guard'

import Page404 from '@/components/Page404'
import { useAuth } from '@/hooks/useAuth'

const LazyDashboardRoutesGuard = lazy(() => import('@/components/_dashboard/guard'))

export default function App() {
  const { user } = useAuth()
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient, setTRPCClient] = useState(() => createTRPCClient(user?.accessToken))

  useEffect(() => {
    setTRPCClient(createTRPCClient(user?.accessToken))
  }, [user?.accessToken])

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<LazyDashboardRoutesGuard />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/ec2" element={<EC2Page />} />
          </Route>
          {/* Don't need Suspense for Login. If we visit the login page and user is logged in it will flash the login page and that's ok */}
          <Route element={<AuthRoutesGuard />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

const createTRPCClient = (accessToken: string | undefined) =>
  trpc.createClient({
    links: [
      httpBatchLink({
        url: TRPC_API_URL,

        // You can pass any HTTP headers you wish here
        async headers() {
          return {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          }
        },
      }),
    ],
  })
