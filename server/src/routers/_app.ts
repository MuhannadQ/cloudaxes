import { createCallerFactory, createTRPCRouter } from 'src/trpc'
import { publicProcedure } from 'src/methods'

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => 'yay!'),
})

export const createCaller = createCallerFactory(appRouter)

export type AppRouter = typeof appRouter
