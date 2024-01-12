import { createCallerFactory, createTRPCRouter } from 'src/trpc'
import { publicProcedure } from 'src/methods'
import { ec2Router } from './ec2'

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => 'yay!'),

  ec2: ec2Router,
})

export const createCaller = createCallerFactory(appRouter)

export type AppRouter = typeof appRouter
