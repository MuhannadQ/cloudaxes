import { trpc } from '@/lib/trpc'

export default function HomePage() {
  const hcQuery = trpc.healthcheck.useQuery()
  let errorMessage = ''
  if (hcQuery.isError) {
    if (hcQuery.error.data?.code) {
      errorMessage = hcQuery.error.message
    } else {
      errorMessage = 'No connection to server' // 'hcQuery.error.message' is "Failed to fetch"
    }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      Home
      <p>{errorMessage || (hcQuery.isLoading ? 'Loading...' : hcQuery.data)}</p>
    </div>
  )
}
