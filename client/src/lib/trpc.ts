import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../../server/src'

export const TRPC_API_URL = import.meta.env.VITE_TRPC_API_URL as string

export const trpc = createTRPCReact<AppRouter>()
