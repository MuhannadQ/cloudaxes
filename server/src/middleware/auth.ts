import { TRPCError } from '@trpc/server'
import { t } from 'src/trpc'

export const isAuthorized = t.middleware(({ next, ctx }) => {
  const { session } = ctx
  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx: { session } })
})
