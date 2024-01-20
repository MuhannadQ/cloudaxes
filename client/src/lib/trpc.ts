import { createTRPCReact } from '@trpc/react-query'
import { TRPCClientErrorLike } from '@trpc/client'

import type { AppRouter } from '@/types'

export const TRPC_API_URL = import.meta.env.VITE_TRPC_API_URL as string

export const trpc = createTRPCReact<AppRouter>()

export function getErrorMessage(error: TRPCClientErrorLike<AppRouter>) {
  if (error.data?.code) {
    return error.message
  }
  return 'No connection to server' // 'query.error.message' is "Failed to fetch"
}
