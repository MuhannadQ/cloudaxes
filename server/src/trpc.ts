import { initTRPC } from '@trpc/server'
import type { Context } from 'src/context'

export const t = initTRPC.context<Context>().create()

export const createTRPCRouter = t.router
// Create a server-side caller
export const createCallerFactory = t.createCallerFactory
