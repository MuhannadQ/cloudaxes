import { TRPCError } from '@trpc/server'

import { t } from 'src/trpc'

export const isAuthorized = t.middleware(({ next, ctx }) => {
  const { session } = ctx

  if (session?.user.authorized) {
    return next({ ctx: { session } })
  }

  throw new TRPCError({ code: 'UNAUTHORIZED' })
})
