import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda'
import { createContext } from 'src/context'
import { appRouter } from 'src/routers/_app'

export type AppRouter = typeof appRouter

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
})
